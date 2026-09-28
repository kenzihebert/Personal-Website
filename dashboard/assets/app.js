/* ==========================================================================
   Career dashboard for mckenziehebert.com/dashboard/

   One generic renderer, one module. The page is a JSON file
   (data/kenzie.json) following the schema documented outside this repo.
   Rows render collapsed to a title and open on click; the countdown strip
   is computed from `deadlines` at view time; ticks are stored per browser
   and the Completed card shows the hand-kept record in data/kenzie-done.json.
   ========================================================================== */

(function () {
  'use strict';

  var MODULES = [
    { id: 'kenzie', label: 'Career', icon: 'target', src: 'data/kenzie.json', ledger: 'data/ledger.json',
      done: 'data/kenzie-done.json', reminders: 'data/reminders.json',
      stale: { days: 2, task: 'kenzie-research' }, reader: true, enabled: true }
  ];

  // Staleness is opt-in per module via `stale: { days, task }`. Hand-maintained tabs (Targets,
  // CAT-LIT) have no nightly writer, so a stale banner there was always a false alarm.



  var ICONS = {
    target:  '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
    chart:   '<path d="M4 19V9M10 19V5M16 19v-6M22 19H2"/>',
    news:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 9h6M7 13h10"/>',
    bolt:    '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
    users:   '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5M17 8.5a3 3 0 1 0 0 0M17.5 14.5c2.2.5 3.5 2.3 3.5 4.5"/>',
    case:    '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/>',
    cal:     '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5.5 2 2-5.5z"/>',
    trend:   '<path d="m3 16 5.5-5.5 3.5 3.5L21 5M21 5h-5M21 5v5"/>',
    spark:   '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    route:   '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a4 4 0 0 1 0 8h-4a4 4 0 0 0 0 8h5.5"/>',
    sun:     '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:    '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/>',
    chev:    '<path d="m9 6 6 6-6 6"/>',
    check:   '<path d="m4.5 12.5 4.5 4.5L19.5 6.5"/>',
    done:    '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    auto:    '<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/>',
    ext:     '<path d="M7 17 17 7M9 7h8v8"/>'
  };

  var SECTION_ICON = {
    'do-this-week': 'bolt', 'news': 'news', 'people': 'users', 'postings': 'case',
    'deadlines': 'cal', 'next-research': 'compass', 'momentum': 'trend',
    'kenzie': 'spark', 'bd-consulting': 'route', 'completed': 'done'
  };

  function svg(name, cls) {
    var p = ICONS[name] || ICONS.target;
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }

  var cache = {};
  var active = null;
  var currentMod = null;   // module being rendered; drives reader mode and the Application column

  /* ---------------- completion state ----------------
     Two layers, and the split is the whole design:

     - localStorage  - what you ticked in THIS browser. Instant, no round
                       trip, but per-device and invisible to the nightly task.
     - data/done.json - authoritative. Cross-device, in git, and READ BY THE
                       NIGHTLY AGENT, which is the half that actually stops an
                       item being nagged about forever.

     An item is struck if either says so. Ticking a box is a local note until
     it reaches done.json; that is a deliberate limit of a static site with no
     backend, not an oversight.

     Keys: the nightly task emits a stable `id` per item (a slug for the underlying
     ACTION, not its wording, so a reworded title keeps its tick). Items with
     no id fall back to a title hash, which breaks on rewording - that is the
     reason ids exist.
  ---------------------------------------------------- */

  var remoteDone = {};   // id -> record from done.json

  function hash(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return 'h' + (h >>> 0).toString(36);
  }

  function itemKey(raw) {
    if (raw && raw.id) return String(raw.id);
    var t = (typeof raw === 'string') ? raw : (raw && (raw.title || raw.text)) || '';
    return hash(t.slice(0, 120));
  }

  function localDone() {
    try { return JSON.parse(localStorage.getItem('dash-done') || '{}'); }
    catch (e) { return {}; }
  }
  function saveLocalDone(m) {
    try { localStorage.setItem('dash-done', JSON.stringify(m)); } catch (e) {}
  }

  // Returns '' | 'done' | 'waiting'. `waiting` means you did your part and the
  // ball is in someone else's court - it suppresses the nag the same way, but
  // reads differently, because "sent, no reply" is not the same as "finished".
  function doneState(key) {
    var r = remoteDone[key];
    if (r) return r.status === 'waiting' ? 'waiting' : 'done';
    return localDone()[key] ? 'done' : '';
  }



  /* ---------------- utilities ---------------- */

  function el(id) { return document.getElementById(id); }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // Restricted inline markdown. The nightly task writes this from open-web
  // sources, so escape first and re-enable only this whitelist. Do not widen.
  function inline(raw) {
    var s = escapeHtml(raw);
    s = s.replace(/`([^`]+)`/g, function (_, c) { return '<code>' + c + '</code>'; });
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, function (_, t, h) {
      return '<a href="' + h + '" target="_blank" rel="noopener noreferrer">' + t + '</a>';
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
    return s;
  }

  // Table-mode sections (a company roster, not a narrative list) need a
  // company/location split and a one-click portal link, neither of which the
  // generic narrative item has. Both are derived, not new required fields, so
  // hand-maintained files like targets.json don't need restructuring:
  // - title follows the "Company - Location" convention already used
  //   throughout targets.json; splitting on the first " - " gets both.
  // - the portal link is whatever markdown link the writeup already cites
  //   last, usually the careers page. No link, no pill - not an error.
  // Explicit `company` / `location` on the item win. The title split is only a
  // fallback for targets.json, whose titles are all "Company - Location".
  // career.json's ranked postings are titled "N. Company: Role", which has no
  // " - " to split, so every Location cell came out empty - and a title that
  // happened to contain " - " (a season suffix) split in the wrong place and
  // printed that as the location.
  function splitCompanyLocation(item) {
    var title = (typeof item === 'string') ? item : (item.title || '');
    var explicitCo = (typeof item === 'object' && item.company) ? item.company : '';
    var explicitLoc = (typeof item === 'object' && item.location) ? item.location : '';
    if (explicitCo || explicitLoc) {
      return { company: explicitCo || title, location: explicitLoc };
    }
    var i = title.indexOf(' - ');
    if (i < 0) return { company: title, location: '' };
    return { company: title.slice(0, i), location: title.slice(i + 3) };
  }

  function lastLink(md) {
    var re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, m, last = null;
    while ((m = re.exec(md || ''))) last = { label: m[1], url: m[2] };
    return last;
  }

  /* ---------------- application state ----------------
     The Application column is DERIVED from data/applied.json (the Notion
     mirror), never hand-typed into targets.json. Hand-typed application tags
     went stale the moment you applied to something - the whole point of the
     column is that one glance tells you where he stands, so it has to come
     from the file that is actually synced.

     Matched on company name, normalised. An item can override with an
     explicit `company` field when its display title differs from the Notion
     spelling.
  ---------------------------------------------------- */

  var appliedIndex = {};   // normalised company -> { ready, applied, prior, rejected }
  var appliedCycle = '';

  function normCompany(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function buildAppliedIndex(doc) {
    appliedIndex = {};
    appliedCycle = (doc && doc.current_cycle) || '';
    ((doc && doc.applications) || []).forEach(function (a) {
      var k = normCompany(a.company);
      if (!k) return;
      var e = appliedIndex[k] || (appliedIndex[k] = { ready: 0, applied: 0, prior: 0, rejected: 0 });
      var current = !appliedCycle || a.cycle === appliedCycle;
      if (a.stage === 'Ready to Apply') e.ready++;
      else if (a.stage === 'Rejected') e.rejected++;
      else if (current) e.applied++;
      else e.prior++;
    });
  }

  // Priority order is the whole design: what needs doing outranks what is
  // already done, and a prior-cycle application is context, not progress.
  function applicationCell(item, company) {
    if (item.action) {
      return { label: String(item.action), status: 'critical', title: 'Suggested: ' + item.action };
    }
    var e = appliedIndex[normCompany(item.company || company)];
    if (!e) return { label: '-', status: '', title: 'No application on file' };
    if (e.ready) {
      // Ready to Apply means "not yet applied". Since 2026-09-17 the nightly task
      // pushes every posting it finds into Notion at that stage, so this counts
      // open reqs, not built applications. Amber, because ten found reqs are a
      // to-do list, not an emergency.
      return { label: 'OPEN ' + (e.ready > 1 ? '×' + e.ready : ''), status: 'warning',
        title: e.ready + ' open req(s) in Notion, not applied yet' };
    }
    if (e.applied) {
      return { label: 'Applied' + (e.applied > 1 ? ' ×' + e.applied : ''), status: 'good',
        title: e.applied + ' application(s) this cycle' };
    }
    if (e.prior || e.rejected) {
      var n = e.prior + e.rejected;
      return { label: 'prior ×' + n, status: '',
        title: n + ' application(s) in an earlier cycle' };
    }
    return { label: '-', status: '', title: 'No application on file' };
  }

  var STATUS_ICON = { critical: '◆', serious: '▲', warning: '●', good: '✓' };

  function tag(t) {
    var st = STATUS_ICON[t.status] ? t.status : '';
    return '<span class="tag"' + (st ? ' data-status="' + st + '"' : '') + '>' +
      (st ? '<span class="tag-icon" aria-hidden="true">' + STATUS_ICON[st] + '</span>' : '') +
      '<span>' + escapeHtml(t.label) + '</span></span>';
  }

  function startOfDay(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }

  // Computed at view time, never baked into JSON, so a skipped run cannot
  // leave a stale day count on screen.
  function daysUntil(iso) {
    var t = startOfDay(new Date(iso + 'T00:00:00'));
    if (isNaN(t)) return null;
    return Math.round((t - startOfDay(new Date())) / 86400000);
  }

  function fmtDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return isNaN(d) ? iso : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  /* ---------------- renderers ---------------- */

  function renderCountdowns(deadlines) {
    var rows = (deadlines || [])
      .map(function (d) { return { d: d, days: daysUntil(d.date) }; })
      .filter(function (r) { return r.days !== null && r.days >= 0; })
      .sort(function (a, b) { return a.days - b.days; })
      .slice(0, 5);
    if (!rows.length) return '';

    return '<div class="countdowns">' + rows.map(function (r) {
      var v, u;
      if (r.days === 0) { v = 'Today'; u = ''; }
      else if (r.days === 1) { v = '1'; u = 'day'; }
      else { v = String(r.days); u = 'days'; }
      var st = r.d.status || (r.days <= 3 ? 'critical' : r.days <= 14 ? 'serious' : '');
      return '<div class="cd"' + (st ? ' data-status="' + st + '"' : '') + '>' +
        '<div class="cd-value">' + escapeHtml(v) + (u ? '<span class="cd-unit">' + u + '</span>' : '') + '</div>' +
        '<div class="cd-label">' + inline(r.d.label) + '</div>' +
        '<div class="cd-date">' + escapeHtml(fmtDate(r.d.date)) + '</div></div>';
    }).join('') + '</div>';
  }

  // Items are collapsed to a scannable title. The detail is opt-in, because a
  // grid of full paragraphs is unreadable at a glance - which was the v2 problem.
  // Back-compat: an item with only `text` gets split into title + detail here,
  // so older data files still render sensibly.
  function splitItem(item) {
    if (typeof item === 'string') item = { text: item };
    if (item.title) return item;
    var t = item.text || '';
    // Leading **bold** run is almost always the headline the nightly task intended.
    var m = t.match(/^\*\*([^*]+)\*\*\s*(?:[-:.]\s*)?([\s\S]*)$/);
    if (m && m[1].length <= 120) return { title: m[1], detail: m[2], tags: item.tags };
    // Otherwise cut at the first sentence end.
    var i = t.search(/[.?!]\s/);
    if (i > 0 && i < 130) return { title: t.slice(0, i + 1), detail: t.slice(i + 2), tags: item.tags };
    return { title: t, detail: '', tags: item.tags };
  }

  function renderItem(raw, tableMode, checkable) {
    var key = itemKey(raw);
    var state = doneState(key);
    var rec = remoteDone[key];
    var item = splitItem(raw);
    var tags = (item.tags || []).slice();

    // A remote record is authoritative, so say what it says and when.
    if (rec) {
      tags.unshift({
        label: (state === 'waiting' ? 'waiting on reply' : 'done') +
               (rec.date ? ' ' + fmtDate(rec.date) : ''),
        status: state === 'waiting' ? 'warning' : 'good'
      });
    }
    // The row's accent bar takes the most severe status on it, so urgency is
    // visible in the left margin before anything is read or expanded.
    var rank = { critical: 3, serious: 2, warning: 1, good: 1 };
    var top = tags.reduce(function (a, t) {
      return (rank[t.status] || 0) > (rank[a] || 0) ? t.status : a;
    }, '');
    var hasDetail = !!(item.detail && item.detail.trim());
    var detail = item.detail || '';
    if (rec && rec.note) {
      detail = '**' + (state === 'waiting' ? 'Waiting' : 'Done') +
        (rec.date ? ' ' + fmtDate(rec.date) : '') + ':** ' + rec.note +
        (detail ? '\n\n' + detail : '');
      hasDetail = true;
    }

    var titleHtml, appCell = null;
    if (tableMode) {
      var cl = splitCompanyLocation(item);
      var portal = lastLink(item.detail);
      var showAppCell = !!(currentMod && currentMod.applied);
      appCell = showAppCell ? applicationCell(item, cl.company) : null;
      // Real grid cells, not an inline run: every row shares one column
      // template, so the columns line up down the page and the page can be
      // read by scanning one column rather than reading every row.
      titleHtml =
        '<span class="col col-company">' + inline(cl.company) + '</span>' +
        '<span class="col col-location">' + escapeHtml(cl.location || '') + '</span>' +
        (appCell ? '<span class="col col-app"><span class="app-badge"' +
          (appCell.status ? ' data-status="' + appCell.status + '"' : '') +
          ' title="' + escapeHtml(appCell.title) + '">' + escapeHtml(appCell.label) + '</span></span>' : '') +
        '<span class="col col-note">' + tags.map(tag).join('') + '</span>' +
        '<span class="col col-link">' +
          (portal ? '<a class="item-portal" href="' + escapeHtml(portal.url) + '" target="_blank" ' +
            'rel="noopener noreferrer" title="Open link">' + svg('ext') +
            '<span>' + (/apply/i.test(portal.label) ? 'Apply' : 'Open') + '</span></a>' : '') +
        '</span>';
    } else {
      titleHtml = '<span class="item-title">' + inline(item.title) + tags.map(tag).join('') + '</span>';
    }

    // On a table row the application state outranks the tags for the left
    // accent bar: "materials built, not submitted" is the thing worth seeing
    // from across the room.
    if (appCell && (rank[appCell.status] || 0) > (rank[top] || 0)) top = appCell.status;

    return '<li class="item' + (top ? ' has-status' : '') + (tableMode ? ' item-row' : '') +
      (checkable ? ' has-check' : '') + '" data-open="false"' +
      ' data-key="' + escapeHtml(key) + '"' +
      ' data-done="' + (state ? 'true' : 'false') + '"' +
      (state ? ' data-dstate="' + state + '"' : '') +
      (rec ? ' data-locked="1"' : '') +
      (top ? ' style="--s:var(--' + top + ')"' : '') + '>' +
      '<button class="item-head" type="button" aria-expanded="false"' +
        (hasDetail ? '' : ' data-nodetail="1"') + '>' +
        (hasDetail ? svg('chev', 'item-chev') : '<span class="item-chev"></span>') +
        titleHtml +
      '</button>' +
      (checkable ? '<button class="item-check" type="button" aria-pressed="' + (state ? 'true' : 'false') +
        '" title="' + (rec ? 'Recorded in done.json - edit that file to change'
                           : (state ? 'Mark not done' : 'Mark done')) + '">' +
        svg('check') + '</button>' : '') +
      (hasDetail ? '<div class="item-body"><div><div class="item-detail">' +
        inline(detail) + '</div></div></div>' : '') +
      '</li>';
  }

  function renderSection(sec, idx) {
    var icon = sec.icon || SECTION_ICON[sec.id] || 'target';
    var reader = !!(currentMod && currentMod.reader);
    var showApp = !!(currentMod && currentMod.applied);
    var hero = sec.emphasis === 'primary';
    // A company roster reads as a table, not a stack of parallel topic cards,
    // and a table needs the room - it always goes full width regardless of
    // whatever `span` the data happens to carry.
    var table = sec.layout === 'table';
    // Checkboxes are for things you actually action, which is "Do this week"
    // and nothing else. Everywhere else they were noise on rows that are
    // reference material, not a to-do list. `checkable` can override either
    // way; the id default exists because the nightly task does not emit it.
    // Reader pages still get checkboxes on sections that ask for them;
    // `reader` only removes the Application column and the ledger chrome.
    var checkable = sec.checkable === true ||
      (sec.checkable !== false && sec.id === 'do-this-week');

    var cls = 'card';
    if (hero) cls += ' hero span-full';
    else if (table) cls += ' span-full';
    else if (sec.span === 'full') cls += ' span-full';
    else if (sec.span === 'wide') cls += ' span-2';
    if (table) cls += ' table' + (showApp ? '' : ' noapp');

    // Done rows sink to the bottom of their card so the live work stays on top.
    // Order within each group is preserved, so the nightly task's ranking survives.
    var items = (sec.items || []).slice().sort(function (a, b) {
      return (doneState(itemKey(a)) ? 1 : 0) - (doneState(itemKey(b)) ? 1 : 0);
    });
    var openCount = items.filter(function (i) { return !doneState(itemKey(i)); }).length;

    // Column headers, so the columns are legible as columns rather than as
    // four mystery strings per row.
    var header = table
      ? '<div class="table-head">' +
          '<span class="col"></span>' +
          '<span class="col">Company</span>' +
          '<span class="col">Location</span>' +
          (showApp ? '<span class="col">Application</span>' : '') +
          '<span class="col">Status</span>' +
          '<span class="col"></span>' +
        '</div>'
      : '';

    var body = items.length
      ? header + '<ul class="items' + (table ? ' items-table' : '') + '">' +
          items.map(function (it) { return renderItem(it, table, checkable); }).join('') + '</ul>'
      : '<p class="card-note" style="border:0">Nothing new.</p>';

    return '<section class="' + cls + '" data-sid="' + escapeHtml(sec.id || ('s' + idx)) +
      '" data-collapsed="false">' +
      '<div class="card-head">' +
        '<span class="card-icon">' + svg(icon) + '</span>' +
        '<h2 class="card-title">' + escapeHtml(sec.title) + '</h2>' +
        (items.length ? '<span class="card-count">' +
           (openCount < items.length ? openCount + '/' + items.length : items.length) +
           '</span>' : '') +
        '<button class="card-toggle" type="button" aria-label="Collapse section">' +
          svg('chev') + '</button>' +
      '</div>' +
      '<div class="card-body"><div>' + body +
        (sec.note ? '<p class="card-note">' + inline(sec.note) + '</p>' : '') +
      '</div></div></section>';
  }

  // Visible proof the tick actually persisted somewhere the nightly task can see.
  // Collapsed by default: it is a record, not today's work.
  function renderCompletedSection(doneDoc) {
    var list = (doneDoc && doneDoc.done) || [];
    if (!list.length) return '';
    var sorted = list.slice().sort(function (a, b) {
      return (b.date || '') < (a.date || '') ? -1 : 1;
    });
    // Reuse the real id so renderItem decorates these from the same record:
    // one source for the badge, the note and the locked checkbox.
    var items = sorted.map(function (r) {
      return { id: r.id, title: r.title, detail: '' };
    });
    return renderSection({
      id: 'completed', title: 'Completed', items: items, span: 'wide',
      note: 'The record the nightly task reads. It will not list these again.'
    }, 0);
  }

  function renderDeadlineSection(deadlines) {
    if (!deadlines || !deadlines.length) return '';
    var sorted = deadlines.slice().sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    var items = sorted.map(function (d) {
      var days = daysUntil(d.date), tags = [];
      if (days !== null && days >= 0 && days <= 14) {
        tags.push({ label: days === 0 ? 'today' : days + 'd', status: days <= 3 ? 'critical' : 'serious' });
      } else if (days !== null && days < 0) {
        tags.push({ label: 'passed' });
      }
      return { title: '**' + fmtDate(d.date) + '** - ' + d.label, tags: tags };
    });
    return renderSection({ id: 'deadlines', title: 'Deadlines', items: items, span: 'wide' }, 0);
  }

  // A failed run must be visible, or the run log is decoration.
  function healthBanner(ledger) {
    var runs = ledger && ledger.runs;
    if (!runs || !runs.length) return '';
    var last = runs[runs.length - 1];
    if (last.ok !== false && last.pushed !== false) return '';
    return '<div class="banner crit"><span class="banner-icon" aria-hidden="true">▲</span>' +
      '<span><strong>The nightly run on ' + escapeHtml(last.date) + ' ' +
      (last.ok === false ? 'reported a problem' : 'did not publish') + '.</strong> ' +
      (last.notes ? escapeHtml(last.notes) : 'No detail recorded.') + '</span></div>';
  }

  function staleBanner(updated, stale) {
    if (!updated || !stale) return '';
    var age = -daysUntil(updated);
    if (isNaN(age) || age <= stale.days) return '';
    return '<div class="banner"><span class="banner-icon" aria-hidden="true">●</span>' +
      '<span><strong>Data is ' + age + ' days old.</strong> Nothing published since ' +
      escapeHtml(updated) + '. Check the <code>' + escapeHtml(stale.task) + '</code> task.</span></div>';
  }

  function coverage(ledger) {
    if (!ledger) return '';
    if (!Object.keys(ledger.postings || {}).length && !(ledger.runs || []).length) return '';
    var s = ledger.searches || {}, k = Object.keys(s);
    var count = function (st) { return k.filter(function (x) { return s[x].status === st; }).length; };
    var chips = [
      ['<b>' + Object.keys(ledger.postings || {}).length + '</b> postings tracked', ''],
      ['<b>' + Object.keys(ledger.people || {}).length + '</b> people', ''],
      ['<b>' + count('open') + '</b> open questions', ''],
      ['<b>' + count('answered') + '</b> answered', '']
    ];
    if (count('blocked')) chips.push(['<b>' + count('blocked') + '</b> blocked on you', 'warn']);
    if (count('exhausted')) chips.push(['<b>' + count('exhausted') + '</b> dead ends', '']);

    var runs = ledger.runs || [];
    var last = runs[runs.length - 1];
    if (last && last.playbook_change) {
      chips.push(['task last revised its playbook ' + escapeHtml(last.date), '']);
    }
    return '<div class="coverage">' + chips.map(function (c) {
      return '<span class="cov-chip' + (c[1] ? ' ' + c[1] : '') + '">' + c[0] + '</span>';
    }).join('') + '</div>';
  }

  function renderModule(mod, data, ledger, doneDoc) {
    currentMod = mod;
    return '<div class="view-head"><div>' +
        '<h1 class="view-title">' + escapeHtml(data.title || mod.label) + '</h1>' +
        '<div class="view-meta">Updated ' + escapeHtml(data.updated || data.generated || 'unknown') +
        (data.generatedBy ? ' · ' + escapeHtml(data.generatedBy) : '') + '</div>' +
      '</div>' +
      '<div class="view-actions">' +
        '<button class="act-btn" type="button" data-act="expand">expand all</button>' +
        '<button class="act-btn" type="button" data-act="collapse">collapse all</button>' +
      '</div></div>' +
      healthBanner(ledger) + staleBanner(data.updated || data.generated, mod.stale) +
      renderCountdowns(data.deadlines) +
      '<div class="grid">' + (data.sections || []).map(renderSection).join('') +
        renderDeadlineSection(data.deadlines) +
        renderCompletedSection(doneDoc) + '</div>' +

      coverage(ledger);
  }

  function renderEmpty(mod) {
    return '<div class="view-head"><div><h1 class="view-title">' + escapeHtml(mod.label) + '</h1></div></div>' +
      '<div class="empty-state"><strong>No data yet</strong>Waiting on <code>' +
      escapeHtml(mod.src) + '</code>.</div>';
  }

  /* ---------------- routing ---------------- */

  function show(id) {
    var mod = MODULES.filter(function (m) { return m.id === id && m.enabled; })[0] ||
              MODULES.filter(function (m) { return m.enabled; })[0];
    if (!mod) return;

    active = mod.id;
    Array.prototype.forEach.call(document.querySelectorAll('.tab[data-id]'), function (b) {
      b.setAttribute('aria-selected', String(b.dataset.id === mod.id));
    });
    if (location.hash.slice(1) !== mod.id) history.replaceState(null, '', '#' + mod.id);

    var view = el('view');
    if (cache[mod.id]) {
      var c = cache[mod.id];
      remoteDone = c.doneMap;
      buildAppliedIndex(c.applied);
      view.innerHTML = renderModule(mod, c.data, c.ledger, c.done);
      restoreCollapsed();
      return;
    }
    view.innerHTML = '<div class="loading">Loading</div>';

    var getJson = function (u) {
      return fetch(u, { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    };

    Promise.all([
      getJson(mod.src),
      // Supplementary. A missing or malformed ledger must never blank the tab.
      mod.ledger ? getJson(mod.ledger).catch(function () { return null; }) : Promise.resolve(null),
      mod.done ? getJson(mod.done).catch(function () { return null; }) : Promise.resolve(null),
      mod.applied ? getJson(mod.applied).catch(function () { return null; }) : Promise.resolve(null),
      mod.reminders ? getJson(mod.reminders).catch(function () { return null; }) : Promise.resolve(null)
    ]).then(function (res) {
      // Hand-set reminders ride along with the nightly task's deadlines. The task rewrites
      // career.json nightly, so anything the owner pins by hand has to live elsewhere.
      if (res[4] && res[4].deadlines && res[4].deadlines.length) {
        res[0] = Object.assign({}, res[0], { deadlines: (res[0].deadlines || []).concat(res[4].deadlines) });
      }
      var doneDoc = res[2];
      var map = {};
      ((doneDoc && doneDoc.done) || []).forEach(function (r) { if (r && r.id) map[r.id] = r; });

      cache[mod.id] = { data: res[0], ledger: res[1], done: doneDoc, doneMap: map, applied: res[3] };
      if (active === mod.id) {
        remoteDone = map;
        buildAppliedIndex(res[3]);
        view.innerHTML = renderModule(mod, res[0], res[1], doneDoc);
        restoreCollapsed();
      }
      var f = el('footerMeta');
      if (f) f.textContent = 'Private page · data updated ' + (res[0].updated || res[0].generated || '');
    }).catch(function () {
      if (active === mod.id) view.innerHTML = renderEmpty(mod);
    });
  }

  /* ---------------- light / dark ---------------- */

  var THEMES = ['auto', 'light', 'dark'];
  var THEME_ICON = { auto: 'auto', light: 'sun', dark: 'moon' };

  function readTheme() {
    try { var v = localStorage.getItem('dash-theme'); return THEMES.indexOf(v) > -1 ? v : 'auto'; }
    catch (e) { return 'auto'; }
  }

  function applyTheme(t) {
    // "auto" means follow the OS. Only an explicit choice stamps the attribute.
    if (t === 'auto') {
      var dark = !window.matchMedia || !window.matchMedia('(prefers-color-scheme: light)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', t);
    }
    var b = el('themeBtn');
    if (b) {
      b.innerHTML = svg(THEME_ICON[t]);
      b.setAttribute('aria-label', 'Theme: ' + t);
      b.title = 'Theme: ' + t;
    }
    try { localStorage.setItem('dash-theme', t); } catch (e) {}
  }

  /* ---------------- boot ---------------- */

  function buildNav() {
    var nav = el('nav');
    var live = MODULES.filter(function (m) { return m.enabled; });
    nav.innerHTML = live.length < 2 ? '' :
      live.map(function (m) {
        return '<button class="tab" type="button" role="tab" data-id="' + m.id +
          '" aria-selected="false">' + escapeHtml(m.label) + '</button>';
      }).join('');
    nav.insertAdjacentHTML('afterend', '<button class="theme-btn" type="button" id="themeBtn"></button>');

    nav.parentNode.addEventListener('click', function (e) {
      var t = e.target.closest('.tab');
      if (t && t.dataset.id) { show(t.dataset.id); return; }
      if (e.target.closest('#themeBtn')) applyTheme(THEMES[(THEMES.indexOf(readTheme()) + 1) % THEMES.length]);
    });
  }

  /* ---------------- interaction ---------------- */

  // Exact height animation. Opening measures, animates to that height, then
  // releases to auto so later reflows (font load, resize) are not clipped.
  function slide(box, open) {
    if (!box) return;
    // Drop any pending listener from a previous toggle. Without this, closing
    // mid-open leaves the old handler attached, and it fires at the end of the
    // CLOSE transition and resets height to auto, popping the row back open.
    if (box._slideEnd) {
      box.removeEventListener('transitionend', box._slideEnd);
      box._slideEnd = null;
    }
    if (open) {
      box.style.height = box.scrollHeight + 'px';
      box._slideEnd = function (e) {
        if (e.propertyName !== 'height') return;
        box.style.height = 'auto'; // release, so later reflows are not clipped
        box.removeEventListener('transitionend', box._slideEnd);
        box._slideEnd = null;
      };
      box.addEventListener('transitionend', box._slideEnd);
    } else {
      box.style.height = box.scrollHeight + 'px';
      void box.offsetHeight; // force reflow so the next line animates
      box.style.height = '0px';
    }
  }

  function setItem(li, open) {
    li.setAttribute('data-open', String(open));
    var btn = li.querySelector('.item-head');
    if (btn) btn.setAttribute('aria-expanded', String(open));
    slide(li.querySelector('.item-body'), open);
  }

  // Which widgets are folded is a per-viewer convenience, so localStorage is
  // the right home for it. Wrapped because private mode throws on access.
  function collapsedSet() {
    try { return JSON.parse(localStorage.getItem('dash-collapsed') || '{}'); }
    catch (e) { return {}; }
  }
  function saveCollapsed(m) {
    try { localStorage.setItem('dash-collapsed', JSON.stringify(m)); } catch (e) {}
  }

  function restoreCollapsed() {
    var m = collapsedSet();
    Array.prototype.forEach.call(document.querySelectorAll('.card[data-sid]'), function (c) {
      if (!m[c.dataset.sid]) return;
      // Restore folded state without playing the animation on page load.
      c.classList.add('no-anim');
      c.setAttribute('data-collapsed', 'true');
      var b = c.querySelector('.card-body');
      if (b) b.style.height = '0px';
      void c.offsetHeight;
      c.classList.remove('no-anim');
    });
  }


  // ---------------------------------------------------------------------
  // Celebration. Requested as a real reward for a real send: confetti and a chime, and it
  // has to happen at the instant of the click.
  // Fires on the tick, before anything else, so the reward is immediate.
  // Sound is synthesized (Web Audio) so there is no file to load and no
  // autoplay block: the click itself is the user gesture.
  // ---------------------------------------------------------------------
  var audioCtx = null;
  function playWin(big) {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var ctx = audioCtx;
      if (ctx.state === 'suspended') ctx.resume();
      var t0 = ctx.currentTime;
      var master = ctx.createGain();
      master.gain.value = big ? 0.9 : 0.5;
      master.connect(ctx.destination);

      // A soft pop first, like a cork.
      var buf = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
      var pop = ctx.createBufferSource(); pop.buffer = buf;
      var popF = ctx.createBiquadFilter(); popF.type = 'lowpass'; popF.frequency.value = 1800;
      var popG = ctx.createGain(); popG.gain.value = big ? 0.7 : 0.35;
      pop.connect(popF); popF.connect(popG); popG.connect(master); pop.start(t0);

      // Rising major arpeggio into a held chord. C5 E5 G5 C6, then E6 on top.
      var notes = big ? [523.25, 659.25, 783.99, 1046.5, 1318.5] : [523.25, 659.25, 783.99];
      notes.forEach(function (f, n) {
        var start = t0 + 0.03 + n * (big ? 0.085 : 0.07);
        ['sine', 'triangle'].forEach(function (type, k) {
          var o = ctx.createOscillator(); o.type = type; o.frequency.value = f * (k ? 2 : 1);
          var g = ctx.createGain();
          g.gain.setValueAtTime(0, start);
          g.gain.linearRampToValueAtTime(k ? 0.08 : 0.28, start + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, start + (big ? 1.6 : 0.9));
          o.connect(g); g.connect(master);
          o.start(start); o.stop(start + (big ? 1.7 : 1.0));
        });
      });

      // Shimmer on top for the big one.
      if (big) {
        var sh = ctx.createOscillator(); sh.type = 'sine'; sh.frequency.value = 2093;
        var shG = ctx.createGain();
        shG.gain.setValueAtTime(0, t0 + 0.4);
        shG.gain.linearRampToValueAtTime(0.06, t0 + 0.55);
        shG.gain.exponentialRampToValueAtTime(0.0001, t0 + 2.2);
        var lfo = ctx.createOscillator(); lfo.frequency.value = 6;
        var lfoG = ctx.createGain(); lfoG.gain.value = 12;
        lfo.connect(lfoG); lfoG.connect(sh.frequency);
        sh.connect(shG); shG.connect(master);
        lfo.start(t0 + 0.4); sh.start(t0 + 0.4); sh.stop(t0 + 2.3); lfo.stop(t0 + 2.3);
      }
    } catch (e) { /* no audio, no problem */ }
  }

  function fireConfetti(big) {
    if (typeof confetti !== 'function') return;
    var colors = ['#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#a855f7', '#ffffff'];
    if (!big) {
      confetti({ particleCount: 90, spread: 70, startVelocity: 40, origin: { x: 0.5, y: 0.7 }, colors: colors, zIndex: 9999 });
      return;
    }
    var end = Date.now() + 2600;
    // Two cannons from the bottom corners, the whole time.
    (function frame() {
      confetti({ particleCount: 7, angle: 60, spread: 60, startVelocity: 70, origin: { x: 0, y: 1 }, colors: colors, zIndex: 9999 });
      confetti({ particleCount: 7, angle: 120, spread: 60, startVelocity: 70, origin: { x: 1, y: 1 }, colors: colors, zIndex: 9999 });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    // Three big center bursts, staggered.
    [0, 350, 800].forEach(function (ms, i) {
      setTimeout(function () {
        confetti({ particleCount: 320, spread: 160, startVelocity: 55, scalar: 1.25, ticks: 320, origin: { x: 0.5, y: 0.55 - i * 0.08 }, colors: colors, zIndex: 9999 });
      }, ms);
    });
    // Streamers at the end.
    setTimeout(function () {
      confetti({ particleCount: 120, spread: 120, startVelocity: 45, ticks: 400, gravity: 0.6, scalar: 1.6, shapes: ['square'], origin: { x: 0.5, y: 0.2 }, colors: colors, zIndex: 9999 });
    }, 1200);
  }

  function countApplied() {
    // Application rows only: the ranked postings table on your tab and the
    // Open now table on this page's, whether ticked here or recorded in the
    // done file. Not do-this-week chores.
    return document.querySelectorAll(
      '.card[data-sid="postings"] .item[data-done="true"], ' +
      '.card[data-sid="apply-now"] .item[data-done="true"]').length;
  }

  function flashBanner(title, sub) {
    var el = document.createElement('div');
    el.className = 'win-banner';
    el.innerHTML = '<div class="win-title">' + title + '</div>' + (sub ? '<div class="win-sub">' + sub + '</div>' : '');
    document.body.appendChild(el);
    requestAnimationFrame(function () { el.classList.add('on'); });
    setTimeout(function () { el.classList.remove('on'); setTimeout(function () { el.remove(); }, 500); }, 2400);
  }

  var PRAISE = ['Sent.', 'Applied.', 'That one is out the door.', 'One more in the pile.', 'Done. Next.', 'In. Good.'];
  function celebrate(row) {
    var sec = row.closest('.card');
    var sid = sec ? sec.dataset.sid : '';
    var big = sid === 'postings' || sid === 'apply-now' || /^apply-/.test(row.dataset.key || '');
    playWin(big);
    fireConfetti(big);
    if (big) {
      var n = countApplied();
      flashBanner(PRAISE[Math.floor(Math.random() * PRAISE.length)], n > 1 ? n + ' applications in' : '');
    }
  }

  document.addEventListener('click', function (e) {
    // `data-act` is required, not just the class: other buttons reuse .act-btn
    // for its styling, and without this guard they get swallowed here and
    // never reach their own handler below.
    var act = e.target.closest('.act-btn[data-act]');
    if (act) {
      var open = act.dataset.act === 'expand';
      Array.prototype.forEach.call(document.querySelectorAll('.item'), function (li) {
        if (li.querySelector('.item-body')) setItem(li, open);
      });
      return;
    }

    var toggle = e.target.closest('.card-toggle');
    if (toggle) {
      var card = toggle.closest('.card');
      var now = card.getAttribute('data-collapsed') !== 'true';
      card.setAttribute('data-collapsed', String(now));
      slide(card.querySelector('.card-body'), !now);
      var m = collapsedSet();
      if (now) m[card.dataset.sid] = 1; else delete m[card.dataset.sid];
      saveCollapsed(m);
      return;
    }

    var chk = e.target.closest('.item-check');
    if (chk) {
      var row = chk.closest('.item');
      // A row backed by done.json is authoritative; a local tick must not be
      // able to contradict it and quietly disagree with what the nightly task reads.
      if (row.dataset.locked) {
        chk.animate(
          [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' },
           { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }],
          { duration: 220 });
        return;
      }
      var k = row.dataset.key;
      var m = localDone();
      var now = !m[k];
      if (now) m[k] = Date.now(); else delete m[k];
      saveLocalDone(m);
      row.setAttribute('data-done', String(now));
      chk.setAttribute('aria-pressed', String(now));
      if (now) celebrate(row);
      chk.title = now ? 'Mark not done' : 'Mark done';
      return;
    }

    var head = e.target.closest('.item-head');
    // Let a link inside a title behave like a link, not a toggle.
    if (head && !e.target.closest('a') && !head.dataset.nodetail) {
      var li = head.closest('.item');
      setItem(li, li.getAttribute('data-open') !== 'true');
    }
  });



  buildNav();
  applyTheme(readTheme());
  show(location.hash.slice(1));
  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function () {
      if (readTheme() === 'auto') applyTheme('auto');
    });
  }

  // Refresh when the tab regains focus after a while, so an overnight publish
  // appears without a manual reload.
  var lastLoad = Date.now();
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && Date.now() - lastLoad > 15 * 60 * 1000) {
      cache = {}; lastLoad = Date.now(); show(active);
    }
  });
})();
