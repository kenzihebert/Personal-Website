# Research playbook

**v60, 2026-11-28.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now: 25 of 33 on 11-28 (24 of 32 on 11-26). Getting worse.
Sends last 7 days: 2; last 14: 5. Store unchanged since 11-23: 29 sent, 21 waiting, 2 interviews (Kite Fri Dec 4 5:30 pm; AG done 11-19), 6 rejected.
Diagnosis 11-28: escalation of 11-27 (Genentech CP pair, cost stated). Next run: drop it and watch. If Dec 2 passes unsent, record H33 killed; no third item on it.
Do not reuse: self-dating (11-19/23), BMS batch (11-20), early-sends-convert (11-21), fast-no slow-yes (11-22), master's-plus-date (11-24/25), pharmacometrics bundle (11-26), Genentech pair (11-27/28).

## What is working (last confirmed 2026-11-28)

- `/api/apps` first every run; read the `note` field (interview times live there).
- `wd.py host tenant site "q"` nightly for Sanofi, BMS, Regeneron, Lilly, Gilead, Amgen, Genentech, Kite, Denali, J&J, Dexcom, Parexel. Diff paths against ledger `postings` tails.
- `live.py` on the previous `kenzie.json`: 33/33 live on 11-28.
- Browser for sites curl cannot read (St. Jude returns nothing to curl; read in browser 11-28).
- Sweep: `run_in_background`; it prints nothing until it exits (25+ min). Write build/finish scripts while it runs.

## What is not working

- Page volume without sends: 5 quiet days, 33 open rows. More rows will not fix this; fewer, sharper `start` items might.
- Weekday errors: the 11-27 page called Dec 2 a Tuesday and Dec 4 a Thursday (Wed, Fri). Compute weekdays with Python before writing any.
- National boards are dry: 0 fits in the last 12 (health systems and statistics CROs: Rho, PharPoint, Veristat, Quanticate, Premier, Advocate). Cut to one a night after Dec 15 unless one hits.
- Git Bash rewrites `/job/...` args: `export MSYS_NO_PATHCONV=1` before `wdjob.py`.

## Targets

- Dec 2 and 5 Genentech CP. Dec 4 Kite interview. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 BMS PMx x2, Henry Ford biostat, Manatt, Northwestern IS, Kaplan. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson. Feb 28 Takeda.
- Watch: Takeda master's SQS seat, AG outcome, Kite outcome, Emmes term and pay, Kite grad, Corcept (expected before Jan), Veristat and Wake Forest BERD (Jan to Feb), Kaiser R&E (Feb to Mar), Penumbra (Feb), SCAN (spring), Biogen (Jan, PhD).

## Hypotheses

- H3: CRO US stats interns post after November. Emmes 4347 the only one. Kill: none further by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1 (3 days; none so far).
- H12: small or mid biotechs post Q4 to January (Denali 11-25 supports; BridgeBio, Alector, Exelixis dry). Kill: none fitting by Jan 31.
- H23: a vanished Workday seat can be reposted. 7 ids rechecked 11-28, all gone. Kill: no repost by Dec 15.
- H25: big-pharma master's statistics tracks post in winter. Kill: no Takeda master's seat by Jan 31.
- H28: replies arrive 5 to 8 weeks after sending; no's inside 2. Kill: no new outcome on any Sep/Oct send by Dec 15.
- H30: a named contact on a public list gets a reply. Kill: no use of the AZ contact by Jan 14.
- H32: PMx seats take MS stats students more often than biostat seats. Kill: next 3 PMx seats all PhD-only.
- H33: grouping same-skill rows gets them sent. Kill: Genentech CP Dec 2 unsent at close.
- H34: interview weeks stop sends. Kill: a send logged Nov 28 to Dec 4.

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
2. Recheck vanished req ids weekly (next due 12-05).
3. Statistics CROs not yet read: Statistics Collaborative, PSI, Everest, Medpace US biostat (only Clinical Intelligence so far).
4. Corcept Greenhouse board (expected before the new year).
5. Health-tech RWE firms with summer analytics seats: Aetion, Komodo (re-read), HealthVerity, Optum Labs (private).
- Done 11-28: Veristat, Quanticate, Advocate Health, BridgeBio, Alector, Arcus (dry; 2 later rows).

## Notes to self

- Interviews lead `start` item 2: Kite Fri Dec 4, then AG, until she records an outcome.
- Grep the ledger (`searches` by id; `postings` by URL) before any search.
- Board keys (new 11-28): Veristat `veristat.wd503` `Veristatcareers`; Advocate Health `aah.wd115` `External`; Quanticate Workable `quanticate` (`apply.workable.com/quanticate/llms.txt` lists counts). Earlier: Denali `dnli.wd1` `Internships`; Rho Workable `rhoworld`; PharPoint Paylocity `5d4fee17-915e-447f-bebb-b24613777281`; Emmes iCIMS `careers.emmes.com/jobs`; Highmark `highmarkhealth.wd1` `highmark`; Humana `humana.wd5` `Humana_External_Career_Site`; Parexel `parexel.wd1` `Parexel_External_Careers`; Dexcom `dexcom.wd1` `Dexcom`; Lilly `lilly.wd115` `CMP`; Kite `gilead.wd1` `kitepharmacareers`; Gilead `gilead.wd1` `gileadcareers`; BMS `bristolmyerssquibb.wd5` `BMS`; Sanofi `sanofi.wd3` `SanofiCareers`; Regeneron `regeneron.wd1` `Careers`; Genentech `roche.wd3` `ROG-A2O-GENE`.
- Helper scripts live in the latest session scratchpad; copy forward.
- Use `py -3`; Windows Python cannot read Git Bash `/tmp`. Write files with LF, indent 2.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add Denali `dnli.wd1/Internships`, Lilly CMP, BMS, Sanofi, Regeneron, Takeda, Parexel, Dexcom, Highmark, Humana, Emmes (iCIMS), Veristat, Advocate Health.
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 29; decide whether the hand file still matters.
