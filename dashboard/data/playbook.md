# Research playbook

**v41, 2026-11-10.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 12 of 22 on 11-10.
10 of the 12 are out of metro. Sends last 7 days: 2; last 14: 3. Store unchanged since 11-06:
20 sent, 16 waiting, 4 rejected, no interview (`curl -s https://mckenziehebert.com/api/apps`).
Diagnosis 11-10: quiet since 11-06; references for the three graduate-built programs (St. Jude,
Ferguson, GEMS). Next diagnosis on a change only (a send, an outcome, Nov 16 closes, Nov 20).
Used and dropped: unsent seats vanishing, Northeast question, record outcomes (11-02), send rate (11-03),
dated East Coast seats (11-04, 11-05), Pfizer late (11-06), page finding seats (11-07), ask Mueller (11-08),
St. Jude faculty route (11-09).

## Sunday review (11-08; next 11-15)

- Metro order still right. In-metro MS statistics seats thin until January.
- Underused: R Shiny app and Big Data Summer Institute model; neither linked publicly.
- Biggest gap to an offer: an interview. 20 sent, none yet.
- Observables that change strategy: an interview in the store; a US CRO biostat intern (H3); an in-metro device MS stats seat (H11).

## What is working (last confirmed 2026-11-10)

- Web search for research-hospital programs: St. Jude 11-09, MSK GEMS 11-10. Two runs, two finds. Keep going (queue item 1).
- Sweep diff against `sweep-prev.json` (copy `sweep-latest.json` to scratchpad before running): found J&J IDAR EASE 11-10 the day after posting.
- Liveness pass in under a minute: Workday `cxs` `/job/<path>`; eightfold `/api/apply/v2/jobs/<id>?domain=<co>.com`. Eightfold sweep rows come and go (BSC Clinical Insights missing from sweep 11-10 but live by API); trust the API.
- Simplify tracker: found Highmark x2, CVS 11-07; one non-fit row 11-10 (Philips marketing).
- Reuse last run's scratchpad scripts (`build.py`, `live.py`, `diff.py`, `chk.py`) from the newest local scratch folder; keep sweep-specific values in `extra.json`.

## What is not working

- Sweep misses employers not in its list (Highmark, St. Jude, MSK never).
- `sweep_boards.py` takes about 25 min, prints nothing until done; run in background first thing.
- curl hangs on stjude.org; use the browser. AG iCIMS needs `?in_iframe=1` in the browser.
- Denali internships page renders empty in the browser; 25 dry runs. Blocked boards produce nothing.
- Guessing Workday tenants or Greenhouse slugs: stop.
- TGen bot check. Do not try to pass it.

## Targets

- Nov 16 BMS PS, AZ Lung, J&J EASE close; Henry Ford opens. Nov 19 AZ Epidemiology. Nov 20 H18 check. Dec 1 Highmark CPH. Dec 18 St. Jude. Jan 8 J&J Market Access. Jan 25 MSK GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H18: early September applications get decisions in November. Kill: no outcome change by Nov 20.
- H20: remote graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H21: in-metro health plans post graduate data seats January to May. Kill: none by May 31.
- H22: research hospitals run graduate biostatistics programs on their own pages with fall to January deadlines. SUPPORTED 11-10 (MSK GEMS). Kill: no third by Dec 1.

## Exploration queue (never empty)

1. More research hospitals and cancer centers: Moffitt, Dana-Farber (search dry 11-10), Cleveland Clinic, Cedars-Sinai biostatistics core, Kaiser Division of Research (Oakland).
2. Sharp HealthCare analytics interns in San Diego.
3. ASA Biopharmaceutical Section internship listings.
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
- Done 11-10: City of Hope (none), Fred Hutch (undergrad), MSK (GEMS found), Philips board (no fit).

## Notes to self

- Out-of-metro rows in Open now (16): CVS, Genmab x3, Moderna x2, Regeneron x2, AZ x2, BMS PS, J&J EASE, Jefferson, BSC, St. Jude, MSK GEMS.
- RAND and BRG in not-a-fit; do not carry their dates. Federal Reserve: public sector, excluded.
- Back up data files before writing. Pattern: load yesterday, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- Out-of-metro scope decided 2026-11-10: no location limit at all.
- Let long-dry BLOCKED boards move to Sundays (25 dry runs).
- `sweep_boards.py`: add Highmark, CVS grad, Genmab, Moderna, Regeneron, Sanofi, Biogen, Insulet, BeOne, Ultragenyx, Labcorp, Pfizer iCIMS, SCAN, Philips.
- `kenzie-done.json` is empty while the store holds 20; decide whether the hand file still matters.
