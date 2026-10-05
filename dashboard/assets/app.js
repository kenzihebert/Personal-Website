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
      stale: { days: 2, task: 'kenzie-research' }, reader: true, apps: { kind: 'done', cycle: 'summer-2027', after: 'apply-now' }, enabled: true }
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


  /* ---------------- applications card ----------------
     One place for every application and its outcome. Rows are merged by id
     from four places:
       1. the data file: on the career tab the Notion mirror (counter.src),
          every row that was actually sent; on a reader page the done file.
       2. postings ticked on this page but not yet in the data file.
       3. rows added here by hand, for the ones found elsewhere and applied to
          anyway. Stored in localStorage (`dash-apps`).
       4. outcome and note overrides set here, same store.
     Outcomes: waiting, interview, offer, rejected, withdrawn, closed.

     Sync: when the site has the /api/apps Pages Function with a KV binding,
     the local store is merged with the server copy on load and pushed on
     every change, so phone and desktop agree and the nightly task can read
     it. Without it the card says plainly that edits live on this device only.
  ---------------------------------------------------- */
  var OUTCOMES = [
    ['waiting',   'Waiting',   'warning'],
    ['interview', 'Interview', 'good'],
    ['offer',     'Offer',     'good'],
    ['rejected',  'Rejected',  'critical'],
    ['withdrawn', 'Withdrawn', ''],
    ['closed',    'Closed',    '']
  ];
  var OUTCOME_LABEL = {}, OUTCOME_STATUS = {};
  OUTCOMES.forEach(function (o) { OUTCOME_LABEL[o[0]] = o[1]; OUTCOME_STATUS[o[0]] = o[2]; });

  var remoteAppsDoc = null;      // last GET /api/apps result, or null
  var appsFilter = 'all';
  var appsShowOlder = false;
  var appsAddOpen = false;
  var appsSyncState = 'local';   // local | needs-key | synced | rejected | offline

  function appsEnabled() { return !!(currentMod && currentMod.apps); }

  function appsStore() {
    try { return JSON.parse(localStorage.getItem('dash-apps') || '{"manual":[],"overrides":{}}'); }
    catch (e) { return { manual: [], overrides: {} }; }
  }
  function saveAppsStore(s) {
    s.updated = new Date().toISOString();
    try { localStorage.setItem('dash-apps', JSON.stringify(s)); } catch (e) {}
    return s;
  }
  function appsKey() { try { return localStorage.getItem('dash-apps-key') || ''; } catch (e) { return ''; } }

  function localToday() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  // Newer `updated` wins per id. Removed manual rows stay as tombstones so a
  // removal made on one device reaches the others.
  function mergeApps(a, b) {
    var m = {}, o = {};
    [a, b].forEach(function (d) {
      if (!d) return;
      (d.manual || []).forEach(function (x) {
        if (!x || !x.id) return;
        if (!m[x.id] || String(x.updated || '') > String(m[x.id].updated || '')) m[x.id] = x;
      });
      Object.keys(d.overrides || {}).forEach(function (id) {
        var x = d.overrides[id];
        if (!x) return;
        if (!o[id] || String(x.updated || '') > String(o[id].updated || '')) o[id] = x;
      });
    });
    return { manual: Object.keys(m).map(function (k) { return m[k]; }), overrides: o };
  }

  function normUrl(u) {
    return String(u || '').toLowerCase().replace(/^https?:\/\/(www\.)?/, '').replace(/[?#].*$/, '').replace(/\/+$/, '');
  }
  // A posting URL identifies one requisition only when it goes deeper than
  // the board root (jobs.ashbyhq.com/acme/<id>, not job-boards.greenhouse.io/acme).
  function specificUrl(u) {
    var n = normUrl(u);
    return n && n.split('/').length >= 3 ? n : '';
  }
  // The mirror leaves company empty when Notion has no option for it. Fall
  // back to the note, then to the board slug in the URL.
  function guessCompany(r) {
    if (r.company) return r.company;
    var m = /company is ([^,.;]+)/i.exec(r.note || '');
    if (m) return m[1].trim();
    var u = String(r.url || '');
    var b = /greenhouse\.io\/([^\/?#]+)/.exec(u) || /ashbyhq\.com\/([^\/?#]+)/.exec(u) || /lever\.co\/([^\/?#]+)/.exec(u) || /^https?:\/\/([^.\/]+)\.wd\d/.exec(u);
    if (b) return b[1].charAt(0).toUpperCase() + b[1].slice(1);
    return '';
  }
  // "3. Varda: Vehicle Integration & Test Internship" -> company Varda, role the rest.
  // A title with no colon is all company; the role stays empty.
  function splitTitle(t) {
    var s = String(t || '').replace(/^\s*\d+\.\s*/, '').trim();
    var m = /^([^:]{1,60}):\s*(.+)$/.exec(s);
    return m ? { company: m[1].trim(), role: m[2].trim() } : { company: s, role: '' };
  }

  // Rows from the data file and from ticks on this page, before overrides.
  function appsBaseRows() {
    var mod = currentMod, out = [];
    if (!mod || !mod.apps) return out;
    var c = cache[mod.id] || {};

    if (mod.apps.kind === 'notion') {
      var rows = (counterDoc && (counterDoc.applications || counterDoc.rows)) || [];
      rows.forEach(function (r) {
        if (!r) return;
        var st = String(r.stage || '').toLowerCase();
        var byMail = !!r.mail_confirmation;
        if (!SENT[st] && !byMail) return;
        var outcome = st === 'rejected' ? 'rejected' : (st === 'offered' || st === 'signed') ? 'offer' : st === 'closed' ? 'closed' : 'waiting';
        out.push({
          id: 'n-' + hash([r.company || '', r.position || '', r.req || '', r.url || ''].join('|').toLowerCase()),
          company: guessCompany(r), role: r.position || '', location: '', url: r.url || '',
          applied: r.applied || (byMail && r.mail_confirmation.date) || '',
          outcome: outcome, cycle: r.cycle || '',
          source: byMail && !SENT[st] ? 'email' : 'notion',
          note: r.note || '', req: r.req || ''
        });
      });
    } else if (mod.apps.kind === 'done') {
      ((c.done && c.done.done) || []).forEach(function (r) {
        if (!r || !r.id) return;
        if (r.status !== 'waiting' && !/\bapplied\b/i.test(r.title || '')) return;
        out.push({ id: r.id, company: r.title || r.id, role: '', location: '', url: '', applied: r.date || '',
          outcome: 'waiting', cycle: mod.apps.cycle || '', source: 'record', note: r.note || '', req: '' });
      });
    }

    // Postings ticked here and not yet in the data file. The nightly task
    // moves them into the file; the URL match below then hides this copy.
    var ticks = localDone();
    ((c.data && c.data.sections) || []).forEach(function (sec) {
      if (!sec || !sec.checkable || !/postings|apply/.test(sec.id || '')) return;
      (sec.items || sec.rows || []).forEach(function (raw) {
        if (!raw || typeof raw !== 'object') return;
        var key = itemKey(raw);
        if (!ticks[key] || remoteDone[key]) return;
        var link = lastLink(raw.detail);
        var when = new Date(Number(ticks[key]));
        var parts = splitTitle(raw.title);
        out.push({
          id: 'tick-' + key, company: raw.company || parts.company, role: parts.role,
          location: raw.location || '', url: link ? link.url : '',
          applied: isNaN(when) ? '' : when.getFullYear() + '-' + String(when.getMonth() + 1).padStart(2, '0') + '-' + String(when.getDate()).padStart(2, '0'),
          outcome: 'waiting', cycle: (mod.apps.cycle || (mod.counter && mod.counter.cycle) || ''), source: 'ticked', note: '', req: ''
        });
      });
    });
    return out;
  }

  // Everything, merged: file rows, ticks and manual rows, with overrides
  // applied and duplicates folded (same URL, or same company and role).
  function appsList() {
    if (!appsEnabled()) return null;
    var store = mergeApps(appsStore(), remoteAppsDoc && remoteAppsDoc.configured ? remoteAppsDoc : null);
    var rows = appsBaseRows();
    (store.manual || []).forEach(function (m) {
      if (!m || m.deleted) return;
      rows.push(Object.assign({ source: 'manual' }, m));
    });
    rows.forEach(function (r) {
      var o = store.overrides[r.id];
      if (o) {
        if (o.outcome) r.outcome = o.outcome;
        if (o.note !== undefined && o.note !== null) r.note = o.note;
      }
    });
    // Fold a tick or hand row into the file row for the same requisition
    // (same posting URL, or same company and role). File rows are never
    // folded into each other: two reqs at one company are two applications.
    // The hand row's outcome survives when the file still says waiting, so a
    // rejection set here is not lost when the row later appears in the file.
    var seen = {}, out = [];
    var rank = { notion: 0, email: 0, record: 0, ticked: 1, manual: 2 };
    rows.sort(function (a, b) { return (rank[a.source] || 0) - (rank[b.source] || 0); });
    rows.forEach(function (r) {
      var keys = [];
      if (specificUrl(r.url)) keys.push('u:' + specificUrl(r.url));
      if (r.company && r.role) keys.push('c:' + normCompany(r.company) + '|' + normCompany(r.role));
      var dup = null;
      keys.forEach(function (k) { if (!dup && seen[k]) dup = seen[k]; });
      if (dup && (rank[r.source] || 0) <= (rank[dup.source] || 0)) dup = null;
      if (dup) {
        if (dup.outcome === 'waiting' && r.outcome !== 'waiting') dup.outcome = r.outcome;
        if (!dup.note && r.note) dup.note = r.note;
        if (!dup.location && r.location) dup.location = r.location;
        dup.folded = (dup.folded || 0) + 1;
        return;
      }
      keys.forEach(function (k) { seen[k] = r; });
      out.push(r);
    });
    return out;
  }

  function appsCurrentCycle() {
    var mod = currentMod;
    return (mod && mod.apps && mod.apps.cycle) || (mod && mod.counter && mod.counter.cycle) || '';
  }

  function appsStats(rows) {
    var cyc = appsCurrentCycle();
    var s = { sent: 0, waiting: 0, interview: 0, offer: 0, rejected: 0, withdrawn: 0, closed: 0, ticked: 0 };
    rows.forEach(function (r) {
      if (cyc && r.cycle && r.cycle !== cyc) return;
      s.sent++;
      if (s[r.outcome] !== undefined) s[r.outcome]++;
      if (r.source === 'ticked') s.ticked++;
    });
    return s;
  }

  var OUTCOME_ORDER = { interview: 0, offer: 0, waiting: 1, rejected: 2, withdrawn: 3, closed: 3 };
  var SOURCE_TEXT = {
    manual: 'added on the dashboard', email: 'sent per the employer confirmation email', notion: 'from Notion',
    record: 'from the record', ticked: 'ticked on this page, not in the record yet'
  };

  function renderAppRow(r) {
    var badge = tag({ label: OUTCOME_LABEL[r.outcome] || r.outcome, status: OUTCOME_STATUS[r.outcome] || '' });
    var src = r.source === 'manual' ? '<span class="tag">added here</span>' :
              r.source === 'ticked' ? '<span class="tag">ticked here</span>' :
              r.source === 'email' ? '<span class="tag" title="Sent per the employer confirmation email">email</span>' : '';
    var title = '<span class="item-title"><b>' + escapeHtml(r.company || r.role) + '</b>' +
      (r.role && r.company ? ': ' + escapeHtml(r.role) : '') + ' ' + badge + src +
      (r.applied ? '<span class="apps-date">' + escapeHtml(fmtDate(r.applied)) + '</span>' : '') + '</span>';
    var buttons = OUTCOMES.map(function (o) {
      return '<button type="button" class="apps-btn' + (r.outcome === o[0] ? ' on' : '') + '" data-apps="outcome" data-id="' +
        escapeHtml(r.id) + '" data-value="' + o[0] + '">' + o[1] + '</button>';
    }).join('');
    var meta = [];
    if (r.location) meta.push(escapeHtml(r.location));
    if (r.req) meta.push('req ' + escapeHtml(r.req));
    if (r.cycle) meta.push(escapeHtml(r.cycle));
    meta.push(SOURCE_TEXT[r.source] || r.source);
    if (r.url) meta.push('<a href="' + escapeHtml(r.url) + '" target="_blank" rel="noopener noreferrer">open posting</a>');
    return '<li class="item has-status apps-row" data-open="false" data-key="' + escapeHtml(r.id) + '" style="--s:var(--' + (OUTCOME_STATUS[r.outcome] || 'border-2') + ')">' +
      '<button class="item-head" type="button" aria-expanded="false">' + svg('chev', 'item-chev') + title + '</button>' +
      '<div class="item-body"><div><div class="item-detail apps-detail">' +
        '<div class="apps-meta">' + meta.join(' · ') + '</div>' +
        '<div class="apps-outcomes">' + buttons + '</div>' +
        '<textarea class="apps-note" data-id="' + escapeHtml(r.id) + '" rows="2" placeholder="Note: who you heard from, next step, anything worth remembering">' + escapeHtml(r.note || '') + '</textarea>' +
        '<div class="apps-actions"><button type="button" class="apps-btn" data-apps="save-note" data-id="' + escapeHtml(r.id) + '">Save note</button>' +
        (r.source === 'manual' ? '<button type="button" class="apps-btn danger" data-apps="remove" data-id="' + escapeHtml(r.id) + '">Remove</button>' : '') +
        '</div></div></div></div></li>';
  }

  function appsSyncText() {
    if (appsSyncState === 'synced') return 'Synced across your devices.';
    if (appsSyncState === 'needs-key') return 'Sync is set up on the server. <button type="button" class="apps-link" data-apps="key">Enter the passphrase</button> once on this device to turn it on.';
    if (appsSyncState === 'rejected') return 'The server rejected the passphrase. <button type="button" class="apps-link" data-apps="key">Enter it again</button>.';
    if (appsSyncState === 'offline') return 'Could not reach the sync server. Edits are saved here and will sync when it is back.';
    return 'Edits are saved on this device only. Sync across devices turns on once the site has its APPS store and passphrase set up.';
  }

  function renderAppsCard() {
    var rows = appsList();
    if (rows === null) return '';
    var cyc = appsCurrentCycle();
    var s = appsStats(rows);
    var older = cyc ? rows.filter(function (r) { return r.cycle && r.cycle !== cyc; }) : [];
    var current = cyc ? rows.filter(function (r) { return !r.cycle || r.cycle === cyc; }) : rows.slice();
    var shown = (appsShowOlder ? rows.slice() : current).filter(function (r) {
      return appsFilter === 'all' || r.outcome === appsFilter;
    });
    shown.sort(function (a, b) {
      var d = (OUTCOME_ORDER[a.outcome] === undefined ? 1 : OUTCOME_ORDER[a.outcome]) - (OUTCOME_ORDER[b.outcome] === undefined ? 1 : OUTCOME_ORDER[b.outcome]);
      if (d) return d;
      return (b.applied || '') < (a.applied || '') ? -1 : (b.applied || '') > (a.applied || '') ? 1 : 0;
    });
    var chips = [['all', 'All'], ['waiting', 'Waiting'], ['interview', 'Interview'], ['offer', 'Offer'], ['rejected', 'Rejected']].map(function (c) {
      return '<button type="button" class="apps-chip' + (appsFilter === c[0] ? ' on' : '') + '" data-apps="filter" data-value="' + c[0] + '">' + c[1] + '</button>';
    }).join('');
    if (older.length) {
      chips += '<button type="button" class="apps-chip' + (appsShowOlder ? ' on' : '') + '" data-apps="older">' +
        (appsShowOlder ? 'Hide earlier cycles' : 'Earlier cycles (' + older.length + ')') + '</button>';
    }
    var summary = s.sent + ' sent' + (cyc ? ' this cycle' : '') +
      (s.waiting ? ' · ' + s.waiting + ' waiting' : '') +
      (s.interview ? ' · ' + s.interview + ' interview' + (s.interview > 1 ? 's' : '') : '') +
      (s.offer ? ' · ' + s.offer + ' offer' + (s.offer > 1 ? 's' : '') : '') +
      (s.rejected ? ' · ' + s.rejected + ' rejected' : '') +
      (s.withdrawn + s.closed ? ' · ' + (s.withdrawn + s.closed) + ' withdrawn or closed' : '');

    var form = appsAddOpen ?
      '<form class="apps-form" data-apps="form">' +
        '<input name="company" placeholder="Company (required)" required autocomplete="organization">' +
        '<input name="role" placeholder="Role">' +
        '<input name="location" placeholder="City or remote">' +
        '<input name="url" placeholder="Posting URL" inputmode="url">' +
        '<label>Applied <input name="applied" type="date" value="' + localToday() + '"></label>' +
        '<label>Outcome <select name="outcome">' + OUTCOMES.map(function (o) { return '<option value="' + o[0] + '">' + o[1] + '</option>'; }).join('') + '</select></label>' +
        '<div class="apps-actions"><button type="submit" class="apps-btn on">Add application</button>' +
        '<button type="button" class="apps-btn" data-apps="cancel">Cancel</button></div>' +
      '</form>' : '';

    return '<section class="card apps-card span-full" data-sid="applications" data-collapsed="false">' +
      '<div class="card-head"><span class="card-icon">' + svg('case') + '</span>' +
        '<h2 class="card-title">Applications</h2><span class="card-count">' + s.sent + '</span>' +
        '<button type="button" class="apps-btn on apps-add" data-apps="add">' + (appsAddOpen ? 'Close' : '+ Add one') + '</button>' +
        '<button class="card-toggle" type="button" aria-label="Collapse section">' + svg('chev') + '</button></div>' +
      '<div class="card-body"><div>' +
        '<div class="apps-summary">' + escapeHtml(summary) + '</div>' +
        form +
        '<div class="apps-chips">' + chips + '</div>' +
        (shown.length ? '<ul class="items">' + shown.map(renderAppRow).join('') + '</ul>'
                      : '<p class="card-note" style="border:0">Nothing here yet' + (appsFilter !== 'all' ? ' with that outcome' : '') + '. Use + Add one for anything you applied to elsewhere.</p>') +
        '<p class="card-note apps-sync">' + appsSyncText() + '</p>' +
      '</div></div></section>';
  }

  // Redraw the card in place, keeping open rows open and the fold state.
  function rerenderApps() {
    var old = document.querySelector('.apps-card');
    if (!old) return;
    var open = {};
    Array.prototype.forEach.call(old.querySelectorAll('.apps-row[data-open="true"]'), function (li) { open[li.dataset.key] = 1; });
    var folded = old.getAttribute('data-collapsed') === 'true';
    old.outerHTML = renderAppsCard();
    var card = document.querySelector('.apps-card');
    if (card) {
      if (folded) { card.setAttribute('data-collapsed', 'true'); var b = card.querySelector('.card-body'); if (b) b.style.height = '0px'; }
      Array.prototype.forEach.call(card.querySelectorAll('.apps-row'), function (li) {
        if (!open[li.dataset.key]) return;
        li.setAttribute('data-open', 'true');
        var h = li.querySelector('.item-head'); if (h) h.setAttribute('aria-expanded', 'true');
        var body = li.querySelector('.item-body'); if (body) body.style.height = 'auto';
      });
    }
    if (typeof refreshCounter === 'function') refreshCounter();
  }

  function setSyncText() {
    var el = document.querySelector('.apps-sync');
    if (el) el.innerHTML = appsSyncText();
  }

  function pushApps() {
    if (!remoteAppsDoc || !remoteAppsDoc.configured) return;
    var key = appsKey();
    if (!key) { appsSyncState = 'needs-key'; setSyncText(); return; }
    var s = appsStore();
    fetch('/api/apps', { method: 'POST', cache: 'no-store',
      headers: { 'content-type': 'application/json', 'authorization': 'Bearer ' + key },
      body: JSON.stringify({ manual: s.manual || [], overrides: s.overrides || {} }) })
      .then(function (r) {
        if (r.status === 401) { appsSyncState = 'rejected'; try { localStorage.removeItem('dash-apps-key'); } catch (e) {} return null; }
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function (doc) {
        if (doc) {
          remoteAppsDoc = doc;
          var merged = mergeApps(appsStore(), doc);
          merged.updated = doc.updated || new Date().toISOString();
          try { localStorage.setItem('dash-apps', JSON.stringify(merged)); } catch (e) {}
          appsSyncState = 'synced';
        }
        setSyncText();
      })
      .catch(function () { appsSyncState = 'offline'; setSyncText(); });
  }

  // Called on every module render with the GET /api/apps result (or null).
  function adoptRemoteApps(doc) {
    remoteAppsDoc = doc;
    if (doc && doc.configured) {
      var local = appsStore();
      var merged = mergeApps(local, doc);
      merged.updated = String(local.updated || '') > String(doc.updated || '') ? local.updated : (doc.updated || '');
      try { localStorage.setItem('dash-apps', JSON.stringify(merged)); } catch (e) {}
      appsSyncState = appsKey() ? 'synced' : 'needs-key';
      // Edits made while offline or before the passphrase was entered.
      if (appsKey() && String(local.updated || '') > String(doc.updated || '')) setTimeout(pushApps, 0);
    } else {
      appsSyncState = 'local';
    }
  }

  function touchRow(id, patch) {
    var s = appsStore();
    var now = new Date().toISOString();
    var m = (s.manual || []).filter(function (x) { return x && x.id === id; })[0];
    if (m) { Object.keys(patch).forEach(function (k) { m[k] = patch[k]; }); m.updated = now; }
    else {
      s.overrides = s.overrides || {};
      var o = s.overrides[id] || {};
      Object.keys(patch).forEach(function (k) { o[k] = patch[k]; });
      o.updated = now;
      s.overrides[id] = o;
    }
    saveAppsStore(s);
    pushApps();
    rerenderApps();
  }

  function setOutcome(id, outcome) {
    touchRow(id, { outcome: outcome });
    if (outcome === 'interview' || outcome === 'offer') {
      playWin(true); fireConfetti(true);
      flashBanner(outcome === 'offer' ? 'An offer.' : 'An interview.', '');
    }
  }

  function addApp(f) {
    var s = appsStore();
    var row = {
      id: 'm-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      company: f.company.trim(), role: f.role.trim(), location: f.location.trim(), url: f.url.trim(),
      applied: f.applied || localToday(), outcome: f.outcome || 'waiting',
      cycle: appsCurrentCycle(), note: '', updated: new Date().toISOString()
    };
    s.manual = s.manual || []; s.manual.push(row);
    saveAppsStore(s); pushApps();
    appsAddOpen = false; appsFilter = 'all'; rerenderApps();
    playWin(true); fireConfetti(true);
    flashBanner(PRAISE[Math.floor(Math.random() * PRAISE.length)], appsStats(appsList() || []).sent + ' applications in');
  }

  function removeApp(id) {
    var s = appsStore();
    (s.manual || []).forEach(function (x) { if (x && x.id === id) { x.deleted = true; x.updated = new Date().toISOString(); } });
    saveAppsStore(s); pushApps(); rerenderApps();
  }

  document.addEventListener('submit', function (e) {
    var f = e.target.closest && e.target.closest('form[data-apps="form"]');
    if (!f) return;
    e.preventDefault();
    var g = function (n) { return (f.elements[n] && f.elements[n].value) || ''; };
    if (!g('company').trim()) { f.elements.company.focus(); return; }
    addApp({ company: g('company'), role: g('role'), location: g('location'), url: g('url'), applied: g('applied'), outcome: g('outcome') });
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-apps]');
    if (!b || b.tagName === 'FORM') return;
    var act = b.dataset.apps, id = b.dataset.id;
    if (act === 'add') {
      appsAddOpen = !appsAddOpen; rerenderApps();
      if (appsAddOpen) { var i = document.querySelector('.apps-form input[name=company]'); if (i) i.focus(); }
    }
    else if (act === 'cancel') { appsAddOpen = false; rerenderApps(); }
    else if (act === 'filter') { appsFilter = b.dataset.value; rerenderApps(); }
    else if (act === 'older') { appsShowOlder = !appsShowOlder; rerenderApps(); }
    else if (act === 'outcome') { setOutcome(id, b.dataset.value); }
    else if (act === 'save-note') {
      var t = document.querySelector('.apps-note[data-id="' + CSS.escape(id) + '"]');
      if (t) touchRow(id, { note: t.value });
    }
    else if (act === 'remove') { if (confirm('Remove this application from the list?')) removeApp(id); }
    else if (act === 'key') {
      var k = prompt('Sync passphrase (the APPS_KEY variable on the Cloudflare Pages project):');
      if (k) { try { localStorage.setItem('dash-apps-key', k.trim()); } catch (err) {} appsSyncState = 'synced'; pushApps(); rerenderApps(); }
    }
  });

  // The Applications card sits directly under the list of what is still open
  // to apply to (`apps.after`, a section id). The open list changes every
  // night and has to be seen first; what is already sent is the record and
  // gets looked at far less often. With no such section the card goes last.
  function sectionsWithApps(sections) {
    var html = (sections || []).map(renderSection);
    var card = renderAppsCard();
    if (card) {
      var want = (currentMod && currentMod.apps && currentMod.apps.after) || '';
      var at = -1;
      (sections || []).forEach(function (s, i) { if (at < 0 && s && want && s.id === want) at = i; });
      if (at < 0) (sections || []).forEach(function (s, i) { if (at < 0 && s && /postings|apply/.test(s.id || '')) at = i; });
      html.splice(at < 0 ? html.length : at + 1, 0, card);
    }
    return html.join('');
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
      '<div class="grid">' + sectionsWithApps(data.sections) +
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
      adoptRemoteApps(c.apps);
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
      mod.reminders ? getJson(mod.reminders).catch(function () { return null; }) : Promise.resolve(null),
      // Shared store for the Applications card. 501 until the KV binding exists.
      mod.apps ? getJson('/api/apps').catch(function () { return null; }) : Promise.resolve(null)
    ]).then(function (res) {
      // Hand-set reminders ride along with the nightly task's deadlines. The task rewrites
      // career.json nightly, so anything the owner pins by hand has to live elsewhere.
      if (res[4] && res[4].deadlines && res[4].deadlines.length) {
        res[0] = Object.assign({}, res[0], { deadlines: (res[0].deadlines || []).concat(res[4].deadlines) });
      }
      var doneDoc = res[2];
      var map = {};
      ((doneDoc && doneDoc.done) || []).forEach(function (r) { if (r && r.id) map[r.id] = r; });

      cache[mod.id] = { data: res[0], ledger: res[1], done: doneDoc, doneMap: map, applied: res[3], apps: res[5] };
      adoptRemoteApps(res[5]);
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
      rerenderApps();
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
