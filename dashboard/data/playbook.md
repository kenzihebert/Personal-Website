# Research playbook

**v56, 2026-11-24.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now: 22 of 30 on 11-24 (23 of 32 on 11-23).
Sends last 7 days: 5 (3 the week before); last 14: 9. Store 11-24: 29 sent, 21 waiting, 2 interviews (Kite, AG), 6 rejected. New 11-23: Lilly MS Statistics, BMS D&QS.
Diagnosis 11-24: every send this week was master's-explicit and dated; next such row is Sanofi Bayesian (closes Thanksgiving). Change offered: send by Wednesday.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19, escalated 11-23, dropped), BMS batch (11-20), early-sends-convert (11-21), fast-no slow-yes (11-22), master's-plus-date (11-24).

## What is working (last confirmed 2026-11-24)

- A row she sends the day it lands: Lilly MS Statistics listed 11-23, ticked 11-23. Lead `start` with the newest master's-explicit dated row.
- `/api/apps` first every run; diff against the previous session's `apps.json`.
- `wd.py host tenant site "q"` nightly for BMS, Sanofi, Regeneron, Amgen, Lilly (11-24 dry). Probes with `wd.py ... "intern"` sort national boards fast (6 boards 11-24).
- Takeda Radancy: the search page URL keeps the keyword when the path is `/search-jobs/<kw>/1113/1`; the JSON pager `search-jobs/results?...Keywords=...&CurrentPage=N` with `X-Requested-With` lists every row by curl, and posting pages curl fine. Found the 2027 wave 11-24.
- `live.py` on the previous `kenzie.json`: 32 of 32 live on 11-24.
- Sweep: `run_in_background`; it prints nothing until it exits (25+ min on 11-24).

## What is not working

- Undated rows sit for weeks; dating them did not help (H26 killed 11-23).
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.
- ASA "MS eligible" lines are not the posting: Takeda's ASA entry named master's, its four posted seats say PhD. Read the req before moving a `later` row to Open now.
- A Workday 500 is not "no posting": retry next night.

## Targets

- Nov 26 Sanofi Bayesian. Dec 1 Highmark CPH. Dec 2 and 5 Genentech CP. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS, Kaplan. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson. Feb 28 Takeda (master's seat not up).
- Watch: Takeda master's SQS seat, Kite and AG interview dates, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring), Biogen portal (Jan, PhD).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1 (GE HC, Baxter, ResMed, Medtronic dry 11-24).
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. Kill: no third by Dec 1.
- H23: a vanished Workday seat can be reposted. Kill: no second repost by Dec 15.
- H25: big-pharma master's statistics tracks post in winter. Lilly confirmed 11-09; Takeda wave 11-24 PhD only. Kill: no Takeda master's seat by Jan 31.
- H27: Sanofi posts single-project biostat seats with 7-day windows. Kill: no further one by Dec 11.
- H28: replies arrive 5 to 8 weeks after sending; no's inside 2. Kill: a Sep 29 send moves to rejected, or no new outcome on any Sep/Oct send by Dec 15.
- H29: payer research institutes post master's RWE seats in November. Kill: no second by Dec 15.
- H30: a named contact on a public list (ASA) gets a reply. Kill: she reports no use of the AZ contact by Jan 14.
- H31 (new): master's-explicit plus a date gets a row sent within days. Kill: Sanofi Bayesian unsent at close on 11-26.

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
2. Abbott Diagnostics recheck; EMD Serono and Exact Sciences keys (exactsciences wd1 guess = 0 rows).
3. Recheck vanished req ids weekly (next 11-28).
4. Tempus, Viatris boards (keys unknown).
5. xtalks.com job feed carries pharma intern reqs (403 to curl; try browser).
- Done 11-24: Takeda wave (PhD), GE HC, ResMed, Intermountain, Baxter, Illumina, Zoetis, Alnylam GH (dry), web search for 2027 biostat interns (nothing new).

## Notes to self

- Interviews lead `start` item 2: Kite then AG, until she records a date or outcome.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: GE HealthCare `gehc.wd5` `GEHC_ExternalSite`; ResMed `resmed.wd3` `ResMed_External_Careers`; Intermountain `imh.wd108` `IntermountainCareers`; Illumina `illumina.wd1` `illumina-careers`; Zoetis `zoetis.wd5` `zoetis`; Medtronic `medtronic.wd1` `MedtronicCareers`; Kite `gilead.wd1` `kitepharmacareers`; Lilly `lilly.wd115` `CMP`; Takeda Radancy org 1113. Older keys: v55 and v54 in git history.
- Use `py -3`; write files with LF, indent 2. Load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add Lilly CMP, Cigna, Elevance, BMS, Sanofi, Regeneron, Takeda (Radancy pager), GE HealthCare, ResMed, Intermountain (keys above, v54, v55).
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 29; decide whether the hand file still matters.
- Add the ASA StatTrak list to step 3 with "from October".
