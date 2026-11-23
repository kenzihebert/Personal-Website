# Research playbook

**v55, 2026-11-23.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now: 23 of 32 on 11-23 (22 of 30 on 11-22).
Sends last 7 days: 3; last 14: 7. Store unchanged since 11-21: 27 sent, 19 waiting, 2 interviews (Kite, AG), 6 rejected.
Diagnosis 11-23: escalation of self-dating (Daiichi R Innovation, Genmab Biostatistics unsent past her 11-22 date); offered send-one or mark-withdrawn. Now dropped: never raise these two again.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19, escalated 11-23), BMS batch (11-20), early-sends-convert (11-21), fast-no slow-yes (11-22).

## What is working (last confirmed 2026-11-23)

- ASA StatTrak list: the 2027 list went up **Nov 6**, not Dec 1. Read on 11-23, 17 days late: Lilly MS Statistics R-110151 (Jan 3), Kaplan Life Care Planning, AZ contact name, Takeda Feb 28 confirmed. Check `stattrak.amstat.org` front page weekly from October next cycle.
- `/api/apps` first every run; diff against the previous session's `apps.json`.
- `wd.py host tenant site "q"` nightly for BMS, Sanofi, Regeneron (11-23 dry). New-board probes with `wd.py ... "intern"` found Cigna (11-22).
- `live.py` on the previous `kenzie.json`: 30 of 30 live on 11-23.
- Git Bash: `export MSYS_NO_PATHCONV=1` before passing a `/job/...` path to `wdjob.py`; works.
- Sweep: `run_in_background`; it prints nothing until it exits.

## What is not working

- Undated rows sit for weeks and dating them did not help (H26 killed 11-23).
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.
- Lilly CMP Workday was "dead (500)" on 11-13 while R-110151 was already live (posted 11-09). A 500 is not "no posting": retry next night.
- Radancy search pages (Takeda, UHG, Northwell) drop the keyword from URLs; type in the box or skip.

## Targets

- Nov 26 Sanofi Bayesian. Nov 30 BMS D&QS. Dec 1 Highmark CPH. Dec 2 and 5 Genentech CP. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS, Kaplan. Jan 3 Lilly MS. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson. Feb 28 Takeda.
- Watch: Takeda SQS req, Kite and AG interview dates, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring), Biogen portal (Jan, PhD).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. Kill: no third by Dec 1.
- H23: a vanished Workday seat can be reposted. Kill: no second repost by Dec 15.
- H25: big-pharma master's statistics tracks post in winter. Lilly confirmed 11-09; Takeda pending. Kill: Takeda not posted by Jan 31.
- H27: Sanofi posts single-project biostat seats with 7-day windows. Kill: no further one by Dec 11.
- H28: replies arrive 5 to 8 weeks after sending; no's inside 2. Kill: a Sep 29 send moves to rejected, or no new outcome on any Sep/Oct send by Dec 15.
- H29: payer research institutes post master's RWE seats in November. Carelon, Optum dry 11-23. Kill: no second by Dec 15.
- H30 (new): a named contact on a public list (ASA) gets a reply. Kill: she reports no use of the AZ contact by Jan 14.
- Cut: H24 (Lundbeck, Exelixis dry; folded into H25), H26 (killed).

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
2. Abbott Diagnostics and Baxter rechecks.
3. Recheck vanished req ids weekly (next 11-28).
4. Tempus, Viatris boards (keys unknown; Workday guesses 422/404 on 11-23).
- Done 11-23: ASA 2027 list (found), Carelon/Elevance, UHG/Optum, Northwell, Geisinger, MGB (dry).

## Notes to self

- Interviews lead `start` item 2: Kite then AG, until she records a date or outcome.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: Lilly `lilly.wd115` `CMP`; Elevance `elevancehealth.wd1` `ANT`; Geisinger `geisinger.wd5` `GeisingerExternal`; MGB `massgeneralbrigham.wd1` `MGBExternal`; Northwell browser `jobs.northwell.edu/job-search-results/?keyword=intern`; UHG browser `careers.unitedhealthgroup.com/search-jobs/2027%20intern/`. Older keys: v54 and v53 in git history.
- Use `py -3`; write files with LF. Load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add Lilly CMP, Cigna, Elevance, BMS, Sanofi, Regeneron, Exelixis, Denali (keys above and v54).
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 27; decide whether the hand file still matters.
- Add the ASA StatTrak list to the standing research list in step 3 with "from October".
