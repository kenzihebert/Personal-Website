# Research playbook

**v53, 2026-11-21.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 20 of 29 on 11-21 (19 of 30 on 11-20).
Sends last 7 days: 3; last 14: 7. Store 11-21: 27 sent, 20 waiting, 2 interviews (AG; Kite CDM marked 11-20), 5 rejected.
Diagnosis 11-21 (new): both interviews came from sends in her first ten days; Kite replied about 7 weeks after sending; waiting rows are inside Kite's stated window. Change: prep Kite first.
BMS batch confirmed: SP and DS ticked together 11-20. D&QS (11-30) and Sanofi Bayesian (11-26) still unsent.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19; escalate once on 11-23 if neither sent, then drop), BMS batch (11-20), early-sends-convert (11-21).

## Sunday review (next 11-22)

- Last (11-15): order right; Manatt pinned; genomics last. Underused: R Shiny. Biggest gap was converting AG; now two interviews.
- CHLA and Xencor on Sundays. Answer: does Kite prep change what Open now leads with?

## What is working (last confirmed 2026-11-21)

- `/api/apps` first every run; diff against last session's `apps.json` (copy it forward). 11-21 caught the Kite interview and two BMS ticks.
- `wd.py host tenant site "q"` nightly for BMS, Sanofi, Regeneron: 11-21 caught BMS R1608752 and Regeneron R53282 on posting day (both no fit).
- `live.py` on the previous `kenzie.json`: 30 of 30 HTTP 200 on 11-21. Workday `jobPostingInfo` API gives end dates.
- Kite's Workday job API answers 403 and its closed posting 404s in the browser; saved text in `postings-text\kite-clinical-development-data-management-intern.md`.
- Under Git Bash, never pass a `/job/...` path as a subprocess argument; curl to a file, then `rd.py`.
- Sweep: run it with `run_in_background` directly; a `( ... ) &` subshell gets killed. Output is buffered until exit.

## What is not working

- 12 undated rows sit for weeks. H26 decides on 11-23.
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.
- National boards read 11-21 (Cardinal, Jazz, Hologic): all dry. National CROs still dry.

## Targets

- Nov 22 Sunday review and self-dated rows. Nov 26 Sanofi Bayesian. Nov 30 BMS D&QS. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 2 Genentech CP. Dec 5 Genentech CP oncology (new 11-21). Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Kite interview date in the row note; Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Hologic dry 11-21. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. Kill: no third by Dec 1.
- H23: a vanished Workday seat can be reposted; recheck its req id for 7 days. BMS Patient Safety and Regeneron biostat still gone 11-21. Kill: no second repost by Dec 15.
- H24: mid-size Japanese/European pharma post master's R seats in November. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks post in winter. Kill: Lilly and Takeda not posted by Jan 4.
- H26: she sends when a row has a named date. Kill: neither self-dated row ticked by 11-23.
- H27: Sanofi posts single-project biostat seats with 7-day windows. Kill: no further one by Dec 11.
- H28 (new): replies arrive 5 to 8 weeks after a req closes. Kill: no new outcome on any Sep/Oct send by Dec 15.

## Exploration queue (never empty)

1. Lundbeck: find its board key from its careers page in the browser.
2. National boards not yet read: Exelixis (site key unknown), Optum grad analytics, Abbott Diagnostics recheck, Baxter recheck, Cleveland Clinic and Mass General Brigham analytics interns.
3. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
4. Recheck vanished req ids weekly (next 11-28).
- Done 11-21: Cardinal Health, Jazz, Hologic (all dry); vanished-req recheck (still gone).

## Notes to self

- Interviews lead `start`: Kite then AG, until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: Cardinal `jobs.cardinalhealth.com/search/searchjobs?keyword=intern` (browser); Jazz `careers.jazzpharma.com/search-jobs/intern`; Hologic `careers.hologic.com/search?keyword=intern`; BD `bdx.wd1` `EXTERNAL_CAREER_SITE_USA`; Labcorp `labcorp.wd1` `External`; Vertex `vrtx.wd501` `Vertex_Careers`; Sanofi `sanofi.wd3` `SanofiCareers`; Regeneron `regeneron.wd1` `Careers`; Corewell `spectrumhealth.wd5` `CorewellHealthCareers`; Biogen `biibhr.wd3` `external`; GSK `gsk.wd5` `GSKCareers`; Alnylam Greenhouse `alnylampharmaceuticals`; Insulet `insulet.wd5` `insuletcareers`.
- Use `py -3`; write files with LF. Back up data files first; load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Regeneron, Merck, Vertex, Daiichi, Highmark, CVS grad, Genmab, Moderna, GSK, Alnylam, Lilly, Takeda, Biogen, Northwestern Medicine, Corewell, Insulet, Cardinal, Jazz, Hologic.
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 27; decide whether the hand file still matters.
