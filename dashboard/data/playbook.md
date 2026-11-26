# Research playbook

**v58, 2026-11-26.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now: 24 of 32 on 11-26 (23 of 31 on 11-25).
Sends last 7 days: 4; last 14: 7. Store unchanged since 11-23: 29 sent, 22 waiting, 2 interviews (Kite Dec 4 5:30 pm per her note; AG done 11-19), 5 rejected.
Two rows closed unsent 11-26: Sanofi Bayesian (on date), Highmark CPH (5 days early). H31 killed.
Diagnosis 11-26: bundle the pharmacometrics cluster (Genentech CP Dec 2 and 5, BMS PMx x2 Dec 31) into one write-up. Next run: watch Genentech ticks; if Dec 2 passes unsent, escalate once.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19/23), BMS batch (11-20), early-sends-convert (11-21), fast-no slow-yes (11-22), master's-plus-date (11-24/25), pharmacometrics bundle (11-26).

## What is working (last confirmed 2026-11-26)

- `/api/apps` first every run; diff against the previous session's `apps.json`. Read the `note` field too: the Kite date sat there unseen on 11-25.
- `wd.py host tenant site "q"` nightly for Sanofi, BMS, Regeneron, Lilly, Gilead, Amgen. BMS PMx x2 found 11-26 on the day posted.
- `live.py` on the previous `kenzie.json`: Workday 403 plus absence from search = taken down (Sanofi Bayesian, Highmark CPH 11-26).
- iCIMS career sites (`careers.<co>.com/jobs?keywords=intern`) need the browser `find`, not page text; the iCIMS job page's JSON-LD has `datePosted` by curl (Emmes 11-26).
- Sweep: `run_in_background`; it prints nothing until it exits (25+ min).

## What is not working

- Undated rows sit for weeks and vanish (Highmark CPH, Amgen KG).
- Single-seat nudges in `start` did not move the Sanofi Bayesian row in 2 runs.
- Git Bash rewrites `/job/...` args into Windows paths: `export MSYS_NO_PATHCONV=1` before `wdjob.py`.
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.

## Targets

- Dec 2 and 5 Genentech CP. Dec 4 Kite interview. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 BMS PMx x2, Henry Ford biostat, Manatt, Northwestern IS, Kaplan. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson. Feb 28 Takeda.
- Watch: Takeda master's SQS seat, AG outcome, Emmes term and pay, ICON US biostat intern, Kite grad, Dexcom roles, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring), Biogen (Jan, PhD), HCSC 2027 analytics wave.

## Hypotheses

- H3: CRO US stats interns post after November. Emmes 4347 (posted 11-09) is the first true stats seat; keep until a second. Kill: none further by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. Kill: no third by Dec 1.
- H23: a vanished Workday seat can be reposted. Kill: no second repost by Dec 15.
- H25: big-pharma master's statistics tracks post in winter. Kill: no Takeda master's seat by Jan 31.
- H27: Sanofi posts single-project stats seats with 7-day windows. Kill: none further by Dec 11.
- H28: replies arrive 5 to 8 weeks after sending; no's inside 2. Kill: no new outcome on any Sep/Oct send by Dec 15.
- H29: payer research institutes post master's RWE seats in November. Kill: no second by Dec 15.
- H30: a named contact on a public list gets a reply. Kill: no use of the AZ contact by Jan 14.
- H32: pharmacometrics seats (clin pharm, PMx) take MS stats students more often than biostat seats do. Kill: next 3 PMx seats all PhD-only.
- H33: grouping same-skill rows into one ask gets them sent. Kill: Genentech CP Dec 2 unsent at close.

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
2. HCSC Workday site key (tenant `hcsc` on wd1 exists; `HCSC`, `External` 404).
3. Recheck vanished req ids weekly (next 11-28).
4. Other statistics CROs on iCIMS or own sites: Rho (Durham), Veristat, Statistics Collaborative, PSI, Quanticate.
5. Advocate, Baylor Scott & White, Ochsner boards (never searched).
- Done 11-26: Emmes (fit), HCSC (none up), IBX (MPH only), Certara (overseas software).

## Notes to self

- Interviews lead `start` item 2: Kite Dec 4, then AG, until she records an outcome.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: Emmes iCIMS `careers.emmes.com/jobs` (apply at `uscareers-emmes.icims.com`); Certara `careers.certara.com/jobs`; Highmark `highmarkhealth.wd1` `highmark`; Parexel `parexel.wd1` `Parexel_External_Careers`; Dexcom `dexcom.wd1` `Dexcom`; CSL `csl.wd1` `CSL_External`; Lilly `lilly.wd115` `CMP`; Kite `gilead.wd1` `kitepharmacareers`; Gilead `gilead.wd1` `gileadcareers`; BMS `bristolmyerssquibb.wd5` `BMS`. Older keys: git history v54 to v57.
- Use `py -3`; write files with LF, indent 2. Load, mutate, validate, banned-word assert.
- Never quote a posting's product names that match the banned-word list; paraphrase.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add Lilly CMP, Cigna, Elevance, BMS, Sanofi, Regeneron, Takeda, GE HC, Parexel, Dexcom, CSL, Highmark, Emmes (iCIMS).
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 29; decide whether the hand file still matters.
