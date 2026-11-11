# Research playbook

**v43, 2026-11-11.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 11 of 23 on 11-11.
Sends last 7 days: 4; last 14: 5. Store 11-11: 22 sent, 18 waiting, 4 rejected, no interview
(`curl -s https://mckenziehebert.com/api/apps`). Moderna Oncology ticked 11-10.
Diagnosis 11-11: escalation of 11-10 (Sanofi AD before the Nov 13 call; BMS, AZ Lung Nov 16). Said as the last time; drop it 11-12 and watch.
Next diagnosis on a change only (a send, an outcome, Nov 16 Henry Ford, Nov 20 H18).
Used and dropped: record outcomes (11-02), send rate (11-03), dated East Coast seats (11-04, 11-05), Pfizer late (11-06),
page finding seats (11-07), ask Mueller (11-08), St. Jude faculty route (11-09), references (11-10 am), Nov 16-17 seats (11-10 pm, 11-11).

## Sunday review (11-08; next 11-15)

- Ranking fit, then close date; location dropped 11-10. Re-check the order on 11-15.
- Underused: R Shiny app and Big Data Summer Institute model; neither linked publicly. Four open rows now name R Shiny (Daiichi x2, Genmab, Sanofi AD).
- Biggest gap to an offer: an interview. 22 sent, none yet.
- Observables that change strategy: an interview in the store; a US CRO biostat intern (H3); a device MS stats seat (H11).

## What is working (last confirmed 2026-11-11)

- Web search "<company> 2027 summer intern biostatistics <city>" for national pharma not in the sweep: Daiichi 11-11 (via compbiojobs, verified at source), Sanofi 11-10, St. Jude 11-09, MSK 11-10.
- Workday cxs POST search with `searchText` (scratch `wd.py`), body via `/wday/cxs/<t>/<s>/job/<path>` (`wdjob.py`). Set PYTHONIOENCODING=utf-8.
- SuccessFactors career sites (Daiichi, Novo, Boehringer) render search in JS: read in the browser, page through with the "Go to next page" button in one javascript_tool loop. Job bodies curl fine.
- Sweep diff against `sweep-prev.json` (copy `sweep-latest.json` to scratchpad before running).
- Liveness pass (`live.py`): Workday cxs; eightfold `/api/apply/v2/jobs/<id>?domain=<co>.com`.

## What is not working

- Sweep misses national employers (Daiichi, Sanofi, Highmark, St. Jude, MSK, Lilly, Novartis).
- `sweep_boards.py` takes about 25 min, prints nothing until done; run in background first thing.
- curl hangs on stjude.org; use the browser. AG iCIMS needs `?in_iframe=1` in the browser.
- Blocked boards (Denali, Xencor, CHLA): 27 dry runs. TGen bot check; do not try to pass it.
- Guessing Workday tenants or Greenhouse slugs: stop.

## Targets

- Nov 16 BMS PS, AZ Lung close; Henry Ford opens. Nov 17 Sanofi AD. Nov 20 H18 check. Dec 1 Highmark CPH. Dec 11 Sanofi pool. Dec 18 St. Jude. Jan 8 J&J Market Access. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb), SCAN (spring), Novo US wave (short window), Boehringer stats seat.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H18: early September applications get decisions in November. Kill: no outcome change by Nov 20.
- H20: remote graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H22: research hospitals run graduate biostatistics programs with fall to January deadlines. SUPPORTED (St. Jude, MSK). Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. Sanofi gives about one week (AD Nov 9 to 17, CSM Nov 10 to 17). Kill: a dated seat survives to its date three times running.
- H24: mid-size Japanese and European pharma (Daiichi, Otsuka, Astellas, Eisai) post R programming seats for master's students in November. Kill: none at Otsuka, Astellas or Eisai by Nov 30.

## Exploration queue (never empty)

1. Otsuka (Princeton), Astellas (Northbrook), Eisai (Nutley): careers sites, for H24.
2. Research hospitals: Dana-Farber biostatistics core, Kaiser Division of Research (Oakland), Cedars-Sinai biostatistics core.
3. ASA Biopharmaceutical Section internship listings.
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
- Done 11-11: Daiichi (2 found), Novo, Boehringer (none). 11-10: Sanofi, Lilly, Novartis, Moffitt, Vanderbilt, MGB, Cleveland Clinic.

## Notes to self

- Employers card is by type (Pharma, Biotech, CROs, Devices, Hospitals, Plans, Consulting). Keep it.
- Sanofi start card: drop after Nov 13; carry questions into a Sanofi line in This week only if she records the call.
- Daiichi job URLs: `careers.daiichisankyo.com/job/<slug>/<req>-en_US` works for curl.
- RAND and BRG in not-a-fit; do not carry their dates. Federal Reserve: public sector, excluded.
- Back up data files before writing. Pattern: load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- Let long-dry BLOCKED boards move to Sundays (27 dry runs).
- `sweep_boards.py`: add Daiichi Sankyo (SuccessFactors, careers.daiichisankyo.com, q=intern), Sanofi (Workday sanofi/wd3/SanofiCareers, `2027 summer intern`), Highmark, CVS grad, Genmab, Moderna, Regeneron, Biogen, Insulet, Labcorp, Pfizer iCIMS, SCAN, Lilly (Phenom), Novo and Boehringer (SuccessFactors).
- `kenzie-done.json` is empty while the store holds 22; decide whether the hand file still matters.
