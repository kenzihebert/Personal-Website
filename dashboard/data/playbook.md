# Research playbook

**v28, 2026-10-28.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Old metric (rows unsent 7+ runs) was wrong: 10-28 the full `/api/apps` read showed 17 sent
applications (09-29 to 10-26; 14 waiting, 3 rejected) while runs through 10-27 reported "no rows,
no ticks". Seven sent rows sat in Open now. New metric: unsent rows in Open now (14 on 10-28, 4 in
her metros or remote) and sends in the last 7 days (2 on 10-28). Read the store with
`curl -s https://mckenziehebert.com/api/apps` and print every `manual` row, not just the head.
Diagnoses used: stale list of sent rows (10-28). Next lead (10-29): Merck/J&J/Gilead Oct 30 cluster
if still unsent, else Moderna and Amgen biostat as the no-clock sends. If a send count rises, lead
with the next warm lead.

## Sunday review (10-25; next 11-01)

- Metro order still right; the thin spot is in-metro MS statistics seats (4 of 14 unsent rows).
- Underused skill: R Shiny app against J&J SDS's "building software for statistical analyses".
- Biggest gap was the page not knowing what she had sent; fixed 10-28. Next: no warm contact used.
- Nightly work that produced nothing: Xencor, CHLA, Denali browser reads (15+ dry); Sundays only.
- Strategy-changing observables: a CRO US summer biostat intern (H3); an in-metro device MS
  stats seat (H11); sends per week falling below 2.

## What is working (last confirmed 2026-10-28)

- Workday `cxs` search by tenant finds employers the sweep lacks: Moderna (`modernatx`, site
  `M_tx`) gave Oncology Biostatistics and Biometrics on 10-28. Try other biotechs the same way.
- Web search "summer 2027 biostatistics intern master's" surfaced Moderna and Jefferson (10-28).
- Sweep diff by URL against last night's backup (`kdiff.py`). Back up `sweep-latest.json`,
  `kenzie.json`, `ledger.json`, `apply-archive.json` first. Copy helpers (`live.py`, `kdiff.py`,
  `phr.py`, `up<date>.py`, `mod.py` as Workday template) from the newest scratchpad.
- Liveness via Workday `cxs` with curl (`live.py`); iCIMS `?in_iframe=1` for AG; Oracle HCM REST
  for BCBSM 14837 and Blue Shield; Eightfold `bostonscientific.eightfold.ai/api/apply/v2/jobs/<id>`.
- Reading the body of any intern row the sweep tags a device "intern" (BSC Clinical Insights).

## What is not working

- `sweep_boards.py` takes about 20 min; run `py -3 -u` to a log in the background and Monitor for `^wrote`.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- Browser pane returns blank for Workday search pages; use the `cxs` API instead.
- `fetch_posting_text.py` stubs AG x2 and BCBSM; restore from backup if overwritten.
- Long bash heredocs break; write scripts with the Write tool.
- Carried text goes stale. Grep kenzie.json for last night's date before writing.
- Denali Internships page is JS accordions; do not chase.

## Targets

- Oct 30 J&J Onc Epi, Merck OR, Gilead Biomarker; Oct 31 Merck biostat; Nov 9 J&J C&SP; Nov 26
  BMS PS; Dec 18 Alcon; Jan 8 J&J Market Access; Feb 15 Jefferson. Moderna, Amgen biostat, BSC rolling.
- Watch: Corcept biostat (by Jan), Kite grad, Pfizer list, Amgen R&D biostat, Kaiser R&E (Feb),
  MannKind (Q4), Penumbra (Feb), Moderna new postings (nightly, `mod.py`).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 1.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H13 killed 10-28: she is applying and recording (17 rows); earlier reads missed them.
- H14: big-pharma graduate seats outside J&J, Merck, Gilead, Amgen, Moderna are MBA or undergrad only.
  Kill: one posts an MS statistics summer seat before Dec 1.
- H16: mid-size east-coast biotechs (Moderna pattern) post MS biostat summer interns in Sept to Oct.
  Kill: Vertex, Biogen, Regeneron, Alnylam boards show none by Nov 10.

## Exploration queue (never empty)

1. Workday cxs for Vertex, Biogen, Alnylam, Regeneron intern/biostat (10-29).
2. Exponent iCIMS 11-01; MannKind Paycor 11-01; Stryker RWE Data Scientist (virtual) re-post watch.
3. Kaiser R&E and Cedars-Sinai research-institute intern boards, body read (11-02).
4. Mayo Arizona research intern bodies (graduate-level?) (11-03).
- Done: Medtronic cxs, Moderna cxs, Jefferson, web biostat search (10-28); Medtronic/Abbott RWE,
  Denali, BSC eightfold (10-26); Takeda, Flatiron (10-23); HEOR phrase pass (10-25).

## Notes to self

- Out-of-metro rows in Open now: Moderna x2, Merck x2, J&J x2, BMS PS, Jefferson, BSC, Alcon.
- RAND and BRG are in not-a-fit; do not carry their dates.
- Mueller: no pronouns on the page; name only.
- `/api/apps` is live: state counts as fact; ticks and manual rows count as sent; drop those rows
  from Open now, keep them in the archive.
- BCBSM: manual row "Epidemiologist / Biostatistician" rejected 10-15; treated the DS/Biostat req as the same family and dropped it.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite and Henry Ford Oct 16 passed; RAND excludes
  biostat MS; Amgen grad DS has no deadline; AG Generalist passed).
- Decide out-of-metro scope: ten rows sit in Open now.
- Let long-dry BLOCKED boards (Xencor, CHLA, Denali) move to weekly.
- `sweep_boards.py`: add Moderna (`modernatx` / `M_tx`), Vertex, Biogen, Alnylam; "market access", "summer associate" for J&J; Stryker, Denali, Corcept, BCBSM, Blue Shield, Humana, Xencor, MannKind; fix TGen browser_url.
- `fetch_posting_text.py`: skip writing on a failed fetch; `?in_iframe=1` for iCIMS.
