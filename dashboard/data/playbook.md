# Research playbook

**v27, 2026-10-27.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows on the page 7+ runs: 15 of 19 on 10-27; six since 09-28. 0 recorded ever; 10 closed
unrecorded. `/api/apps` live since 10-23, still no rows or ticks. Diagnoses used: shape, cost,
materials, recording gap, the cut, warm route, cost escalation, AG HC countdown (10-21, 10-22),
tick request (10-23), AG HC 3-day (10-25), Edwards Sunday close (10-26), Amgen biostat + AG HC tomorrow (10-27). Next lead (10-28): Edwards Friday plus
the Oct 30 cluster; Amgen biostat is the no-clock send. If any row shows sent, lead with
the next warm lead.

## Sunday review (10-25; next 11-01)

- Metro order still right. In-metro fits: Irvine (Stryker, Edwards), LA (AG HC), La Jolla or
  virtual (J&J SDS, Clin Pharm), remote (Amgen DS, J&J Market Access).
- Underused skill: R Shiny app against J&J SDS's "building software for statistical analyses".
- Biggest gap: nothing recorded; second, no warm contact used. Tonight did not touch either.
- Nightly work that produced nothing: Xencor, CHLA, Denali browser reads (14+ dry); move to
  Sundays only. Flatiron, Takeda closed.
- Strategy-changing observables: a CRO US summer biostat intern (H3); an in-metro device MS
  stats seat (H11); any tick in `/api/apps`.

## What is working (last confirmed 2026-10-25)

- Sweep diff caught Amgen Grad Intern Biostatistics (posted 10-26) the day after it appeared; the Workday phrase pass missed it (search text did not match).
- Reading the body of every row the sweep tags a device "intern", even engineering-looking
  ones: BSC Graduate Clinical Insights Research Intern (RWE, MS epi/biostat, Maple Grove) was
  found 10-23 by diffing the sweep against last night and fetching the body.
- Workday phrase pass (`phr.py`, 8 phrases x 12 tenants): found J&J Market Access 10-22. Mon, Thu.
- Liveness via Workday `cxs` with curl nightly (`live.py`); iCIMS `?in_iframe=1` for AG;
  Oracle HCM REST for BCBSM 14837 and Blue Shield.
- Sweep diff by URL against last night's backup (`kdiff.py`). Back up `sweep-latest.json`,
  `kenzie.json`, `ledger.json`, `apply-archive.json` and `postings-text` first. Copy helpers
  (`live.py`, `kdiff.py`, `phr.py`, `up<date>.py` as template) from the newest scratchpad.
- Eightfold body: `bostonscientific.eightfold.ai/api/apply/v2/jobs/<id>?domain=bostonscientific.com`.

## What is not working

- 0 applications recorded across 24 runs; done file empty since 09-16.
- `sweep_boards.py` stalled twice 10-27 under a pipe; run `py -3 -u` to a log in the background, poll for `^wrote`.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- `fetch_posting_text.py` stubs AG x2 and BCBSM nightly. Restore from backup.
- Bash heredocs with long Python bodies break; write scripts with the Write tool.
- Carried text goes stale. Grep kenzie.json for last night's date before writing.
- Denali Internships page is JS accordions; innerText hides the answers. Do not chase.

## Targets

- Oct 28 AG HC; Oct 30 Merck OR, J&J Onc Epi, Gilead Biomarker; Oct 31 Merck biostat; Nov 1
  Edwards C&R; Nov 9 J&J C&SP; Nov 13 J&J SDS; Nov 20 J&J Clin Pharm; Dec 18 Alcon; Jan 8 J&J
  Market Access. Stryker, BSC rolling.
- Watch: Corcept biostat (by Jan), Kite grad (Oct to Jan), Pfizer list (Workday shows MBA only 10-25), Amgen R&D
  biostat, Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team is faster than recruiters. Kill: no second alum lead by Nov 1.
- H11: device makers post MS clinical-data seats outside her metros first (BSC supports it).
  Kill: no in-metro device MS statistics seat by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H13: she is applying but not recording. Kill: a tick or hand row appears in `/api/apps`, or
  she says none went out.
- H14: big-pharma graduate seats outside J&J, Merck, Gilead, Amgen are MBA or undergraduate only.
  Kill: one posts an MS statistics summer seat before Dec 1. Amgen biostat (10-26) is inside the list; BMS Patient Safety (10-26) is MS-eligible but not statistics.
- H15 killed 10-25: two phrase passes (10-23, 10-25 HEOR words, 15 tenants) found nothing the sweep missed.

## Exploration queue (never empty)

1. Medtronic careers in the browser for clinical/biostat intern (10-29); BSC browser read done 10-27, dry.
2. Exponent iCIMS 11-01; MannKind Paycor 11-01; Stryker RWE Data Scientist (virtual) re-post watch.
3. Kaiser R&E and Cedars-Sinai research-institute intern boards, body read (11-02).
4. Mayo Arizona research intern bodies (graduate-level?) (11-03).
- Done: Medtronic and Abbott RWE intern search, Denali Workday, BSC eightfold search (10-26, dry; Stryker RWE virtual intern found closed); Takeda, Flatiron (10-23); HEOR phrase pass, Otsuka/Teva/IQVIA web, SoCal web (10-25), dry.

## Notes to self

- Out-of-metro rows in Open now: BSC, Alcon, Merck x2, J&J Onc Epi, J&J C&SP, BMS PS, BCBSM.
- RAND and BRG are in not-a-fit; do not carry their dates.
- Mueller: no pronouns on the page; name only.
- TGen Helios URL 404 since 10-20; genomics, do not chase.
- With `/api/apps` live, state counts as fact; ticks count as sent.

## Proposed core changes

- Standing dates in the task file are stale: Gilead/Kite and Henry Ford Oct 16 passed; RAND
  excludes biostat MS; Amgen grad DS has no deadline; AG Generalist passed.
- Decide out-of-metro scope: seven rows sit in Open now.
- Let long-dry BLOCKED boards (Xencor, CHLA, Denali: 14+ dry runs) move to weekly.
- `sweep_boards.py`: add "market access", "summer associate" to J&J; add Stryker, Denali,
  Corcept, BCBSM, Blue Shield, Humana, Xencor, MannKind; fix TGen browser_url.
- `fetch_posting_text.py`: skip writing on a failed fetch; `?in_iframe=1` for iCIMS.
