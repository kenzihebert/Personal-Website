# Research playbook

**v57, 2026-11-25.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now: 23 of 31 on 11-25 (22 of 30 on 11-24).
Sends last 7 days: 4 (3 the week before); last 14: 7. Store unchanged since 11-23: 29 sent, 21 waiting, 2 interviews (Kite, AG), 6 rejected.
Diagnosis 11-25: escalation of 11-24 (Sanofi Bayesian unsent, closes Thanksgiving; cost = the only open trial-design seat and the last Sanofi stats seat she qualifies for until the Dec 11 pools). Next run: drop it and watch.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19/23), BMS batch (11-20), early-sends-convert (11-21), fast-no slow-yes (11-22), master's-plus-date (11-24, escalated 11-25).
Candidate for 11-26: three closes Dec 1 to 5 (Highmark, two Genentech CP) right after the holiday.

## What is working (last confirmed 2026-11-25)

- `/api/apps` first every run; diff against the previous session's `apps.json` (copy it into tonight's scratchpad).
- `wd.py host tenant site "q"` nightly for Sanofi, BMS, Regeneron, Lilly, Gilead, Amgen. Sanofi posts statistics seats with 7-day windows (Bayesian 11-19, NCES 11-24): nightly is the only way to catch them.
- Re-reading bodies of rows the sweep auto-marked not-a-fit: Amgen R-260757 (retitled Clinical Science, master's ok) was mis-sorted 11-19, listed 11-25.
- `live.py` on the previous `kenzie.json`: a Workday 403 "permission denied" plus absence from search = taken down (Amgen KG 11-25).
- Sweep: `run_in_background`; it prints nothing until it exits (25+ min).

## What is not working

- Undated rows sit for weeks; dating them did not help (H26 killed 11-23).
- The sweep's generic "not a fit" note on new rows hides retitled or mis-sorted seats. Skim titles of new Amgen, Sanofi, BMS rows by hand.
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.
- ASA "MS eligible" lines are not the posting (Takeda: four PhD seats). Read the req first.

## Targets

- Nov 26 Sanofi Bayesian. Dec 1 Highmark CPH. Dec 2 and 5 Genentech CP. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS, Kaplan. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson. Feb 28 Takeda (master's seat not up).
- Watch: Takeda master's SQS seat, Kite and AG interview dates, ICON US biostat intern, Kite grad, Dexcom specific roles (pool says "coming months"), Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring), Biogen (Jan, PhD).

## Hypotheses

- H3: CRO US summer interns post after November. Medpace Clinical Intelligence 11-25 (BI, not stats). Kill: no CRO stats seat by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1 (Smith+Nephew, Dexcom dry 11-25).
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. Kill: no third by Dec 1.
- H23: a vanished Workday seat can be reposted. Kill: no second repost by Dec 15.
- H25: big-pharma master's statistics tracks post in winter. Kill: no Takeda master's seat by Jan 31.
- H27: Sanofi posts single-project statistics seats with 7-day windows. Confirmed again 11-24 (NCES R2865668, 7 days). Kill: none further by Dec 11.
- H28: replies arrive 5 to 8 weeks after sending; no's inside 2. Kill: a Sep 29 send moves to rejected, or no new outcome on any Sep/Oct send by Dec 15.
- H29: payer research institutes post master's RWE seats in November. Kill: no second by Dec 15.
- H30: a named contact on a public list gets a reply. Kill: no use of the AZ contact by Jan 14.
- H31: master's-explicit plus a date gets a row sent within days. Kill: Sanofi Bayesian unsent at close 11-26.

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
2. Abbott Diagnostics recheck; EMD Serono, BioMarin, Siemens Healthineers keys (wd guesses 422 11-25).
3. Recheck vanished req ids weekly (next 11-28).
4. Re-read every sweep row auto-sorted 11-17 to 11-24 for Amgen, BMS, Sanofi with "Grad" or "MS" in the title.
5. Cleveland Clinic, HCA, Advocate, Baylor Scott & White, Ochsner boards (never searched).
- Done 11-25: Parexel, Dexcom, CSL, Smith+Nephew (dry); Komodo, Truveta, Flatiron Greenhouse (dry); xtalks (no jobs page, dropped).

## Notes to self

- Interviews lead `start` item 2: Kite then AG, until she records a date or outcome.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: Parexel `parexel.wd1` `Parexel_External_Careers`; Dexcom `dexcom.wd1` `Dexcom`; CSL `csl.wd1` `CSL_External`; Smith+Nephew `smithnephew.wd5` `External`; GE HC `gehc.wd5` `GEHC_ExternalSite`; Lilly `lilly.wd115` `CMP`; Kite `gilead.wd1` `kitepharmacareers`; Takeda Radancy org 1113. Older keys: git history v54 to v56.
- Use `py -3`; write files with LF, indent 2. Load, mutate, validate, banned-word assert.
- Never quote a posting's product names that match the banned-word list; paraphrase.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add Lilly CMP, Cigna, Elevance, BMS, Sanofi, Regeneron, Takeda, GE HC, ResMed, Intermountain, Parexel, Dexcom, CSL.
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 29; decide whether the hand file still matters.
