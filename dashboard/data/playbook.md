# Research playbook

**v39, 2026-11-08.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent 7+ runs in Open now, from `apply-archive.json` `first_listed`: 10 of 20 on 11-08 (AG Generalist,
J&J C&SP, J&J Market Access, BSC, BMS, Moderna x2, Jefferson, Regeneron x2). 9 of the 10 are out of metro.
Sends last 7 days: 2; last 14: 4. Store: 20 sent, 16 waiting, 4 rejected, no interview (`curl -s https://mckenziehebert.com/api/apps`).
Diagnosis 11-08: no interview from the Sept 29 to Oct 2 batch; ask Mueller. Next diagnosis on a change only
(a send, an outcome, a close, Nov 20 passing).
Used and dropped: unsent seats vanishing, Northeast question, record outcomes (11-02), send rate (11-03),
dated East Coast seats (11-04, 11-05), Pfizer late (11-06), page finding seats (11-07).

## Sunday review (11-08; next 11-15)

- Metro order still right. In-metro MS statistics seats are thin until January (Kite, Corcept, Ultragenyx, Kaiser, Edwards, Ionis, SCAN).
- Underused: the R Shiny app and the Big Data Summer Institute model; neither is linked publicly.
- Biggest gap to an offer: an interview. 20 sent, none yet. Tonight touched it (Mueller ask). Kill if an interview lands.
- Produced nothing for 23 runs: blocked boards (Denali, Xencor, CHLA, TGen). Propose Sundays only.
- Observables that change strategy: an interview in the store; a US CRO biostat intern (H3); an in-metro device MS stats seat (H11).

## What is working (last confirmed 2026-11-08)

- Liveness pass in under a minute: Workday `cxs` `/job/<path>` (`endDate`, `canApply`); eightfold
  `/api/apply/v2/jobs/<id>?domain=<co>.com` (`Closing Date` in body). Script pattern in scratchpad `live.py`.
- Simplify tracker (`raw.githubusercontent.com/SimplifyJobs/Summer2027-Internships/dev/README.md`): found Highmark x2 and CVS 11-07; dry 11-08.
- compbiojobs tracker: found Genmab x3, Insmed 11-06; dry 11-07, 11-08. Status lags; check Workday before trusting.
- Web search on last cycle's postings gives windows for Coming up (SCAN May 16 found 11-08).
- Same-day send when a near-metro row tops the page (Pfizer 11-06).

## What is not working

- Sweep misses employers not in its list (Highmark 9 to 18 days late).
- Workday `searchText` on cxs is fuzzy; filter titles locally.
- Guessing Workday tenants or Paycor ids: stop. Get board links from the employer page (MannKind Paycor link is on mannkindcorp.com/internships).
- `sweep_boards.py` takes about 25 min, prints nothing until done; run in background first thing.
- Python `urllib` fails on an expired certificate; use curl and `py -3 -X utf8`.
- Browser pane is blank for Workday search pages and eightfold bodies.
- Web searches for 2027 seats return 2026 pages; useful only for windows.

## Targets

- Nov 9 J&J C&SP; Nov 16 BMS PS, AZ Lung, Henry Ford opens; Nov 19 AZ Epidemiology; Nov 20 H18 check; Dec 1 Highmark CPH; Jan 8 J&J Market Access; Jan 31 Ferguson; Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H18: early September applications get decisions in November. Kill: no outcome change by Nov 20.
- H20: remote and graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H21: in-metro health plans (SCAN, Kaiser Pasadena, Blue Shield) post graduate data seats January to May. Kill: none by May 31.
- Cut 11-08: H17 (J&J C&SP lasted to its date), H19 (folded into the governing metric).

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
2. Oscar, Devoted, Clover graduate data seats through the trackers.
3. ASA Biopharmaceutical Section internship listings.
4. Providence and Sharp HealthCare (private nonprofit) analytics interns in LA and San Diego.
- Done 11-08: Kaiser board (dry), SCAN and Alignment (SCAN window found).

## Notes to self

- Out-of-metro rows in Open now (14): CVS, Genmab x3, Moderna x2, Regeneron x2, AZ x2, J&J CSP, BMS PS, Jefferson, BSC.
- RAND and BRG in not-a-fit; do not carry their dates. Federal Reserve: public sector, excluded.
- Write scripts in the scratchpad; back up data files first. `build.py` pattern: load yesterday, mutate, validate.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- Decide out-of-metro scope: 14 of 20 rows.
- Let long-dry BLOCKED boards move to Sundays (23 dry runs).
- `sweep_boards.py`: add Highmark, CVS grad, Genmab, Moderna, Regeneron, Sanofi, Biogen, Insulet, BeOne, Ultragenyx, Labcorp, Pfizer iCIMS, SCAN.
- `kenzie-done.json` is empty while the store holds 20; decide whether the hand file still matters.
