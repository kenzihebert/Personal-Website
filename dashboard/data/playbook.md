# Research playbook

**v54, 2026-11-22.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 22 of 30 on 11-22 (20 of 29 on 11-21).
Sends last 7 days: 3; last 14: 7. Store 11-22: 27 sent, 19 waiting, 2 interviews (Kite, AG), 6 rejected (Moderna onc marked 11-21).
Diagnosis 11-22 (new): no's recorded in 1 to 14 days (4 of 6), interviews in 35 and 52; 13 of 19 waiting are past 14 days. Change: check portal status on the Sep 29 batch.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19; escalate once on 11-23 if neither sent, then drop), BMS batch (11-20), early-sends-convert (11-21), fast-no slow-yes (11-22).

## Sunday review (11-22; next 11-29)

- Ranking: still right. Trials first, plans last at equal fit; Cigna HCOR placed after CVS because of its 3-year research line.
- Underused: sequence/trajectory analysis (DESERT lab) matches Cigna's past GLP-1 trajectory project; R Shiny and Tableau match Kite's metrics dashboard and Daiichi R Innovation.
- Biggest gap: converting Kite and AG. Tonight: prep line in `start`; diagnosis points at portal status, not more sending.
- Produced nothing for weeks: nightly Denali/Xencor/CHLA reads (Sundays only now), TGen (dropped), national CRO boards (dry since October). Kill CRO rechecks until Jan 4 except ICON.
- Observables that change strategy: an offer from Kite or AG (page turns to decide-and-compare); CRO US intern posts by Jan 31 (H3); ASA StatTrak 2027 list in early December.
- `start` item 3 (how this field hires) is a wall on a phone; cut to 8 lines next Sunday.

## What is working (last confirmed 2026-11-22)

- `/api/apps` first every run; diff against last session's `apps.json` (copy it forward). 11-22 caught Moderna rejected.
- `wd.py host tenant site "q"` nightly for BMS, Sanofi, Regeneron (11-22 dry). Probing a new employer's Workday with `wd.py ... "intern"` found Cigna HCOR on 11-22.
- `live.py` on the previous `kenzie.json`: 29 of 29 live on 11-22. Workday `jobPostingInfo` gives end dates.
- Under Git Bash, never pass a `/job/...` path as a subprocess argument; curl to a file, then `rd.py`.
- Sweep: `run_in_background`, then a Monitor `until` loop on the output file.

## What is not working

- 12 undated rows sit for weeks. H26 decides on 11-23.
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.
- Sweep returned zero Regeneron rows on 11-22 while `wd.py` read 12; trust `wd.py` for Regeneron.

## Targets

- Nov 23 H26. Nov 26 Sanofi Bayesian. Nov 30 BMS D&QS. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 2 and 5 Genentech CP. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Kite and AG interview dates in row notes; Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. Kill: no third by Dec 1.
- H23: a vanished Workday seat can be reposted. Kill: no second repost by Dec 15.
- H24: mid-size Japanese/European pharma post master's R seats in November. Lundbeck, Exelixis dry 11-22. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks post in winter. Kill: Lilly and Takeda not posted by Jan 4.
- H26: she sends when a row has a named date. Kill: neither self-dated row ticked by 11-23.
- H27: Sanofi posts single-project biostat seats with 7-day windows. Kill: no further one by Dec 11.
- H28: replies arrive 5 to 8 weeks after sending; no's inside 2. Kill: a Sep 29 send moves to rejected, or no new outcome on any Sep/Oct send by Dec 15.
- H29 (new): payer research institutes (Evernorth, Optum Labs, Elevance's Carelon Research) post master's RWE seats in November. Kill: no second by Dec 15.

## Exploration queue (never empty)

1. Carelon Research (Elevance) and Optum Labs: graduate research interns (H29).
2. Abbott Diagnostics and Baxter rechecks; Mass General Brigham analytics interns.
3. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
4. Recheck vanished req ids weekly (next 11-28).
- Done 11-22: Cigna (fit found), Lundbeck, Exelixis (dry). Cytel is already in the sweep.

## Notes to self

- Interviews lead `start`: Kite then AG, until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: Cigna `cigna.wd5` `cignacareers`; Exelixis `exelixis.wd1` `Exel`; Denali `dnli.wd1` `Corporate_Positions`; Lundbeck `lundbeck.com/us/careers/your-job/job-opportunities?search=intern` (browser); Sanofi `sanofi.wd3` `SanofiCareers`; Regeneron `regeneron.wd1` `Careers`; BMS `bristolmyerssquibb.wd5` `BMS`. Older keys: v53 in git history.
- Use `py -3`; write files with LF. Back up data files first; load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add Cigna, Exelixis, Denali, BMS, Sanofi, Regeneron (keys above) and the v53 list.
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 27; decide whether the hand file still matters.
