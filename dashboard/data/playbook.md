# Research playbook

**v42, 2026-11-10 (second run, afternoon).** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 11 of 22 on 11-10 pm.
Sends last 7 days: 3; last 14: 4. Store 11-10: 21 sent, 17 waiting, 4 rejected, no interview
(`curl -s https://mckenziehebert.com/api/apps`). AZ Epidemiology ticked 11-10.
Diagnosis 11-10 pm: dated seats vanish early (J&J EASE gone a day after posting); send the Nov 16
seats (BMS, AZ Lung, Sanofi AD) by Nov 12. Sanofi mentor call Nov 13: prep card in Start here; drop it after Nov 13. Next diagnosis on a change only (a send, an outcome, Nov 16, Nov 20).
Used and dropped: unsent seats vanishing, Northeast question, record outcomes (11-02), send rate (11-03),
dated East Coast seats (11-04, 11-05), Pfizer late (11-06), page finding seats (11-07), ask Mueller (11-08),
St. Jude faculty route (11-09), references (11-10 am).

## Sunday review (11-08; next 11-15)

- Ranking now fit, then close date; location dropped 11-10. Re-check the order on 11-15.
- Underused: R Shiny app and Big Data Summer Institute model; neither linked publicly.
- Biggest gap to an offer: an interview. 21 sent, none yet.
- Observables that change strategy: an interview in the store; a US CRO biostat intern (H3); a device MS stats seat (H11).

## What is working (last confirmed 2026-11-10)

- Web search for research-hospital programs: St. Jude 11-09, MSK GEMS 11-10. Moffitt, Vanderbilt, MGB, Cleveland Clinic dry 11-10 pm.
- Sweep diff against `sweep-prev.json` (copy `sweep-latest.json` to scratchpad before running).
- Liveness pass: Workday `cxs` `/job/<path>` (403 S22 = gone; confirm with a board search for the req id); eightfold `/api/apply/v2/jobs/<id>?domain=<co>.com`.
- Phenom career sites (Lilly): fetch `/us/en/search-results?keywords=` and regex `"title"`/`"jobSeqNo"` after `eagerLoadRefineSearch`.
- Reuse scratchpad scripts (`build2.py`, `live.py`, `diff.py`, `emp.py`) from the newest local scratch folder.

## What is not working

- Sweep misses employers not in its list (Highmark, St. Jude, MSK, Lilly, Novartis never).
- `sweep_boards.py` takes about 25 min, prints nothing until done; run in background first thing.
- curl hangs on stjude.org; use the browser. AG iCIMS needs `?in_iframe=1` in the browser.
- Blocked boards (Denali, Xencor, CHLA): 26 dry runs. TGen bot check; do not try to pass it.
- Guessing Workday tenants or Greenhouse slugs: stop.

## Targets

- Nov 16 BMS PS, AZ Lung close; Henry Ford opens. Nov 20 H18 check. Dec 1 Highmark CPH. Dec 18 St. Jude. Jan 8 J&J Market Access. Jan 25 MSK GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H18: early September applications get decisions in November. Kill: no outcome change by Nov 20.
- H20: remote graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H22: research hospitals run graduate biostatistics programs with fall to January deadlines. SUPPORTED (St. Jude, MSK). Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early (EASE, Merck, BMS). Kill: a dated seat survives to its date three times running.

## Exploration queue (never empty)

1. National pharma boards not in the sweep: Novo Nordisk (Plainsboro), Boehringer (Ridgefield), Daiichi Sankyo, Otsuka (careers sites, not Workday guesses).
2. Research hospitals: Dana-Farber biostatistics core, Kaiser Division of Research (Oakland), Cedars-Sinai biostatistics core.
3. ASA Biopharmaceutical Section internship listings.
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
- Done 11-10: Sanofi (Biostatistics AD Shiny intern, Cambridge pool found), Lilly, Novartis (none); Moffitt, Vanderbilt (undergraduate); MGB, Cleveland Clinic (none found).

## Notes to self

- Employers card is by type since 11-10 (Pharma, Biotech, CROs, Devices, Hospitals, Plans, Consulting). Keep it that way.
- Humana closed 11-10; it was the only location-only reject. No other not-a-fit row was rejected for location alone.
- RAND and BRG in not-a-fit; do not carry their dates. Federal Reserve: public sector, excluded.
- Back up data files before writing. Pattern: load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- Let long-dry BLOCKED boards move to Sundays (26 dry runs).
- `sweep_boards.py`: add Highmark, CVS grad, Genmab, Moderna, Regeneron, Sanofi, Biogen, Insulet, BeOne, Ultragenyx, Labcorp, Pfizer iCIMS, SCAN, Philips, Lilly (Phenom, careers.lilly.com). Sanofi tenant: sanofi/SanofiCareers, search `2027 summer intern`.
- `kenzie-done.json` is empty while the store holds 21; decide whether the hand file still matters.
