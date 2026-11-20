# Research playbook

**v52, 2026-11-20.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 19 of 30 on 11-20 (19 of 29 on 11-19).
Sends last 7 days: 2; last 14: 7. Store unchanged since 11-18: 25 sent, 19 waiting, 1 interview (AG), 5 rejected.
Diagnosis 11-20 (new): four trial seats close 11-25 to 11-30, all posted in the last 8 days (BMS SP, BMS DS, Sanofi Bayesian borrowing, BMS D&QS). Asked her to batch the three BMS seats in one sitting, Sanofi by 11-25.
Watch 11-21 to 11-26: BMS ticks arriving together = batching works. Next diagnosis only on a change.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19; escalate once on 11-23 if neither sent, then drop), BMS batch (11-20).

## Sunday review (11-15; next 11-22)

- Order right; Manatt pinned; genomics last. Underused: R Shiny (Daiichi R Innovation unsent). Biggest gap: converting AG.
- CHLA and Xencor on Sundays. Watch: AG outcome; H3; undated rows; H26; BMS batch.

## What is working (last confirmed 2026-11-20)

- `/api/apps` first every run; diff against last session's `apps.json`.
- `wd.py host tenant site "q"` nightly for BMS and Sanofi: 11-20 caught BMS D&QS R1608215 reposted and Sanofi Bayesian borrowing R2865029, both on posting day.
- Scratch `live.py` for liveness: 27 of 28 HTTP-confirmed 11-20; Henry Ford REDCap times out under curl, read it in the browser.
- Under Git Bash, never pass a `/job/...` path as a subprocess argument (MSYS rewrites it); curl to a file, then parse (`rd.py`).
- Greenhouse `boards-api.greenhouse.io/v1/boards/<key>/jobs`. AZ Eightfold: browser search, then `/api/apply/v2/jobs/<pid>?domain=astrazeneca.com`.
- Sweep diff by URL against the backed-up sweep; strip em dashes from sweep titles before the ledger write.

## What is not working

- 12 undated rows sit for weeks. H26 decides on 11-23.
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.
- Sweep takes 25+ min: start it first in the background, Monitor the log for "exit".
- National CRO boards show no US 2027 stats intern yet.
- URL lists for curl need LF line endings.

## Targets

- Nov 22 Sunday review and self-dated rows. Nov 25 BMS SP and DS. Nov 26 Sanofi Bayesian. Nov 30 BMS D&QS. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 2 Genentech CP. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Labcorp dry 11-20. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. BD dry 11-20. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. Counter-evidence 11-20: BMS D&QS vanished 11-17 and came back 11-19. Revised: a vanished Workday seat can be reposted; recheck its req id for 7 days. Kill: no second repost by Dec 15.
- H24: mid-size Japanese/European pharma post master's R seats in November. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks post in winter. Kill: Lilly and Takeda not posted by Jan 4.
- H26: she sends when a row has a named date. Kill: neither self-dated row ticked by 11-23.
- H27 (new): Sanofi posts single-project biostat seats with 7-day windows. Kill: no further one by Dec 11.
- Cut 11-20: H18 (kill date passed, no further outcome).

## Exploration queue (never empty)

1. Lundbeck and Hologic: find Workday site keys from their careers pages in the browser.
2. National boards not yet read: Exelixis (site key unknown), Abbott Diagnostics recheck, Cardinal Health, Optum grad analytics.
3. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
4. Recheck vanished req ids weekly (BMS Patient Safety R1607761, Regeneron biostat).
- Done 11-20: AZ Global Medical Affairs (no stats), Labcorp, Vertex, BD (all dry).

## Notes to self

- AG: carry the prep line in This week until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: BD `bdx.wd1` `EXTERNAL_CAREER_SITE_USA`; Labcorp `labcorp.wd1` `External`; Vertex `vrtx.wd501` `Vertex_Careers`; Sanofi `sanofi.wd3` `SanofiCareers`; Corewell `spectrumhealth.wd5` `CorewellHealthCareers`; Verily `verily.wd1` `Verily_Careers`; Cencora `myhrabc.wd5` `Global`; Biogen `biibhr.wd3` `external`; Regeneron `regeneron.wd1` `Careers`; GSK `gsk.wd5` `GSKCareers`; Alnylam Greenhouse `alnylampharmaceuticals`; Premier `premierinc.wd1` `External_Professional`; Insulet `insulet.wd5` `insuletcareers`.
- Use `py -3`; write files with LF. Back up data files first; load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Merck, Vertex, Daiichi, Highmark, CVS grad, Genmab, Moderna, Regeneron, GSK, Alnylam, Lilly, Takeda, Teva, Organon, UCB, Incyte, Cencora, Biogen, Northwestern Medicine, Corewell, Alkermes, Insulet, Premier, BD, Labcorp.
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 25; decide whether the hand file still matters.
