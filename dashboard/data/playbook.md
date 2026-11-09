# Research playbook

**v40, 2026-11-09.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent 7+ runs in Open now, from `apply-archive.json` `first_listed`: 9 of 20 on 11-09 (AG Generalist,
J&J Market Access, BSC, BMS, Jefferson, Moderna x2, Regeneron x2). 8 of the 9 are out of metro.
Sends last 7 days: 2; last 14: 4. Store: 20 sent, 16 waiting, 4 rejected, no interview (`curl -s https://mckenziehebert.com/api/apps`).
Diagnosis 11-09: no interview; St. Jude is a faculty-read route. Next diagnosis on a change only
(a send, an outcome, a close, Nov 20 passing).
Used and dropped: unsent seats vanishing, Northeast question, record outcomes (11-02), send rate (11-03),
dated East Coast seats (11-04, 11-05), Pfizer late (11-06), page finding seats (11-07), ask Mueller (11-08).

## Sunday review (11-08; next 11-15)

- Metro order still right. In-metro MS statistics seats are thin until January (Kite, Corcept, Ultragenyx, Kaiser, Edwards, Ionis, SCAN).
- Underused: the R Shiny app and the Big Data Summer Institute model; neither is linked publicly.
- Biggest gap to an offer: an interview. 20 sent, none yet.
- Produced nothing for 24 runs: blocked boards (Denali, Xencor, CHLA, TGen). Propose Sundays only.
- Observables that change strategy: an interview in the store; a US CRO biostat intern (H3); an in-metro device MS stats seat (H11).

## What is working (last confirmed 2026-11-09)

- Liveness pass in under a minute: Workday `cxs` `/job/<path>` (`endDate`, `canApply`); eightfold
  `/api/apply/v2/jobs/<id>?domain=<co>.com` (`Closing Date` in body). A 403 S22 on Workday means the req came down.
- Web search for health-system seats surfaced St. Jude 11-09 by accident: research hospitals with their own program pages sit outside every board and tracker. Search more of these.
- Simplify tracker: found Highmark x2 and CVS 11-07; dry 11-08, 11-09.
- compbiojobs tracker: found Genmab x3, Insmed 11-06; dry 11-07, 11-08; not run 11-09.
- Diff tonight's sweep against `git show HEAD:dashboard/data/sweep-latest.json`; the ledger holds fit rows only.

## What is not working

- Sweep misses employers not in its list (Highmark 9 to 18 days late; St. Jude never).
- Workday `searchText` on cxs is fuzzy; filter titles locally.
- Guessing Workday tenants, Greenhouse slugs or Paycor ids: stop (Devoted guess failed 11-09).
- `sweep_boards.py` takes about 25 min, prints nothing until done; run in background first thing.
- Python `urllib` fails on an expired certificate; use curl and `py -3 -X utf8`.
- curl hangs on stjude.org; use the browser. Browser pane is blank for Workday search pages and eightfold bodies.
- Long Bash heredocs with apostrophes fail; write scripts with the Write tool.
- TGen now returns a bot check. Do not try to pass it.

## Targets

- Nov 16 BMS PS, AZ Lung, Henry Ford opens; Nov 19 AZ Epidemiology; Nov 20 H18 check; Dec 1 Highmark CPH; Dec 18 St. Jude; Jan 8 J&J Market Access; Jan 31 Ferguson; Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H18: early September applications get decisions in November. Kill: no outcome change by Nov 20.
- H20: remote and graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H21: in-metro health plans post graduate data seats January to May. Kill: none by May 31.
- H22: research hospitals run biostatistics internships on their own pages with fall deadlines. Kill: no second one by Nov 23.

## Exploration queue (never empty)

1. Other private research hospitals with biostatistics internships: Dana-Farber, Memorial Sloan Kettering, Fred Hutch, Moffitt, City of Hope (H22).
2. Sharp HealthCare analytics interns in San Diego.
3. ASA Biopharmaceutical Section internship listings.
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
- Done 11-09: Providence (none), Oscar and Clover (none; Oscar expected January to April per a third-party guide).

## Notes to self

- Out-of-metro rows in Open now (14): CVS, Genmab x3, Moderna x2, Regeneron x2, AZ x2, BMS PS, Jefferson, BSC, St. Jude.
- RAND and BRG in not-a-fit; do not carry their dates. Federal Reserve: public sector, excluded.
- Write scripts in the scratchpad; back up data files first. `build.py` pattern: load yesterday, mutate, validate.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- Decide out-of-metro scope: 14 of 20 rows.
- Let long-dry BLOCKED boards move to Sundays (24 dry runs).
- `sweep_boards.py`: add Highmark, CVS grad, Genmab, Moderna, Regeneron, Sanofi, Biogen, Insulet, BeOne, Ultragenyx, Labcorp, Pfizer iCIMS, SCAN.
- `kenzie-done.json` is empty while the store holds 20; decide whether the hand file still matters.
