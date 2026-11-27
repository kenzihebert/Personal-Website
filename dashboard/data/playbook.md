# Research playbook

**v59, 2026-11-27.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now: see `runs` notes (24 of 32 on 11-26).
Sends last 7 days: 4; last 14: 6. Store unchanged since 11-23 (Thanksgiving week): 29 sent, 22 waiting, 2 interviews (Kite Dec 4 5:30 pm; AG done 11-19), 5 rejected.
Diagnosis 11-27: interview week (Kite Dec 4) sits between Genentech CP closes Dec 2 and 5; send both this weekend. Next run: if Genentech Dec 2 passes unsent, escalate once with cost (the only master's clin-pharm seats at Genentech), then drop.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19/23), BMS batch (11-20), early-sends-convert (11-21), fast-no slow-yes (11-22), master's-plus-date (11-24/25), pharmacometrics bundle (11-26), interview-week crowd-out (11-27).

## What is working (last confirmed 2026-11-27)

- `/api/apps` first every run; read the `note` field (interview times live there).
- `wd.py host tenant site "q"` nightly for Sanofi, BMS, Regeneron, Lilly, Gilead, Amgen, Genentech, Kite.
- `live.py` on the previous `kenzie.json`: Workday 403 plus absence from search = taken down. 32/32 live on 11-27.
- Reading BLOCKED careers pages with browser `find "intern"`: Denali's intern wave (7 seats, separate Workday site) surfaced 11-27, two days after posting.
- Sweep: `run_in_background`; it prints nothing until it exits (25+ min).

## What is not working

- Undated rows sit for weeks and vanish (Highmark CPH, Amgen KG).
- Single-seat nudges in `start` did not move the Sanofi Bayesian row in 2 runs.
- National health-system searches (Rho, BSW, Ochsner, HCSC, IBX, MGB, Cleveland Clinic) are now mostly dry: 0 fits in the last 9 national boards. Shift national effort to statistics CROs and mid-size biotech intern sites.
- Git Bash rewrites `/job/...` args: `export MSYS_NO_PATHCONV=1` before `wdjob.py`.

## Targets

- Dec 2 and 5 Genentech CP. Dec 4 Kite interview. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 BMS PMx x2, Henry Ford biostat, Manatt, Northwestern IS, Kaplan. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson. Feb 28 Takeda.
- Watch: Takeda master's SQS seat, AG outcome, Emmes term and pay, Kite grad, Dexcom, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring), PharPoint (spring), Biogen (Jan, PhD).

## Hypotheses

- H3: CRO US stats interns post after November. Emmes 4347 is the first; keep until a second. Kill: none further by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small or mid biotechs post Q4 to January (Denali 11-25 supports). Kill: none fitting by Jan 31.
- H23: a vanished Workday seat can be reposted. Kill: no second repost by Dec 15.
- H25: big-pharma master's statistics tracks post in winter. Kill: no Takeda master's seat by Jan 31.
- H28: replies arrive 5 to 8 weeks after sending; no's inside 2. Kill: no new outcome on any Sep/Oct send by Dec 15.
- H30: a named contact on a public list gets a reply. Kill: no use of the AZ contact by Jan 14.
- H32: PMx seats take MS stats students more often than biostat seats. Kill: next 3 PMx seats all PhD-only.
- H33: grouping same-skill rows gets them sent. Kill: Genentech CP Dec 2 unsent at close.
- H34: interview weeks stop sends. Kill: a send logged Nov 28 to Dec 4.
- Cut 11-27: H22, H27, H29 (no confirming evidence in 14 days).

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
2. Recheck vanished req ids weekly (due 11-28).
3. Statistics CROs not yet read: Veristat, Statistics Collaborative, PSI, Quanticate, Premier Research.
4. Mid-size biotech intern sites like Denali's (separate Workday site `Internships`): try Alector, Arcus, Exelixis, Nektar, BridgeBio.
5. Advocate Health board (never searched).
- Done 11-27: Rho, PharPoint, Costello (no intern), BSW, Ochsner (not fit).

## Notes to self

- Interviews lead `start` item 2: Kite Dec 4, then AG, until she records an outcome.
- Grep the ledger (`searches` by id; `postings` by URL) before any search.
- Board keys: Denali `dnli.wd1` site `Internships` (not the main site); Rho Workable `rhoworld` (POST `apply.workable.com/api/v3/accounts/rhoworld/jobs`); PharPoint Paylocity `5d4fee17-915e-447f-bebb-b24613777281`; Emmes iCIMS `careers.emmes.com/jobs`; Highmark `highmarkhealth.wd1` `highmark`; Parexel `parexel.wd1` `Parexel_External_Careers`; Dexcom `dexcom.wd1` `Dexcom`; Lilly `lilly.wd115` `CMP`; Kite `gilead.wd1` `kitepharmacareers`; Gilead `gilead.wd1` `gileadcareers`; BMS `bristolmyerssquibb.wd5` `BMS`; Sanofi `sanofi.wd3` `SanofiCareers`; Regeneron `regeneron.wd1` `Careers`; Genentech `roche.wd3` `ROG-A2O-GENE`. Older keys: git history v54 to v58.
- Helper scripts (wd.py, live.py) live in the previous session scratchpad; copy forward.
- Use `py -3`; write files with LF, indent 2. Load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add Denali `dnli.wd1/Internships`, Lilly CMP, Cigna, Elevance, BMS, Sanofi, Regeneron, Takeda, Parexel, Dexcom, CSL, Highmark, Emmes (iCIMS), Rho (Workable).
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 29; decide whether the hand file still matters.
