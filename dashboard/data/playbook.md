# Research playbook

**v51, 2026-11-19.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 19 of 29 on 11-19 (19 of 27 on 11-18).
Sends last 7 days: 2; last 14: 7. Store 11-19: 25 sent, 19 waiting, 1 interview (AG), 5 rejected. Genentech Boston ticked 11-18, the day before close.
Diagnosis 11-19 (new): sends follow named dates; 12 rows show no close date, 10 of them aged 7+. Asked her to self-date Daiichi R Innovation and Genmab Biostatistics for Sun 11-22.
Watch on 11-20/11-22: either row ticked = H26 supported. Next diagnosis only on a change.
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18), self-dating (11-19; escalate once on 11-23 if neither sent, then drop).

## Sunday review (11-15; next 11-22)

- Order right; Manatt pinned; genomics last. Underused: R Shiny (Daiichi R Innovation unsent). Biggest gap: converting AG.
- CHLA and Xencor on Sundays. Watch: AG outcome; H3; undated rows; H26.

## What is working (last confirmed 2026-11-19)

- `/api/apps` first every run; diff against last session's `apps.json`.
- `wd.py host tenant site "q"` for Workday: BMS caught Data Science MS/PhD R1608664 on its posting day (11-19), seven-day window. Run BMS and Sanofi nightly.
- Scratch `live.py` (Workday cxs GET; HTTP for the rest): 26 of 27 live 11-19 (Genentech Boston 403 after her tick). Copy scratch scripts from the last session.
- Greenhouse API `boards-api.greenhouse.io/v1/boards/<key>/jobs`.
- AZ Eightfold in the browser only. St. Jude and Michigan SPH read fine in the browser.
- Sweep diff by URL against the backed-up sweep. 11-19: 479 rows, 17 new, 2 fit; strip em dashes from sweep titles before the ledger write.

## What is not working

- 12 undated rows sit for weeks; the page gives them no urgency. Tonight's diagnosis is the test.
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.
- Sweep takes 25+ min and prints nothing: start it first in the background, Monitor the output for "exit".
- National CRO boards (Syneos, ICON, Thermo, IQVIA, Medpace) show no US 2027 stats intern yet.

## Targets

- Nov 19 Genentech COA. Nov 22 Sunday review and self-dated rows. Nov 25 BMS SP and BMS Data Science. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 2 Genentech CP. Dec 11 Sanofi pools. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Syneos dry 11-19. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Sanofi contact is the test. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Zimmer, Insulet dry 11-19. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H18: early fall applications get decisions in November. SUPPORTED 11-12. Kill: no further outcome by Nov 20.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. Dana-Farber QPS filled 11-19. Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. Kill: a dated seat survives to its date three times running. Genentech COA alive on its close day 11-19 (first survival).
- H24: mid-size Japanese/European pharma post master's R seats in November. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks post in winter. Kill: Lilly and Takeda not posted by Jan 4.
- H26 (new): she sends when a row has a named date. Kill: neither self-dated row ticked by 11-23.

## Exploration queue (never empty)

1. AZ Global Medical Affairs Intern (posted 11-17): read once.
2. National boards not yet read: Lundbeck (Workday 422; no board link), Exelixis (site key unknown), Vertex recheck, Hologic, BD, Labcorp.
3. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
4. BMS: rerun "intern 2027" nightly; it posts single seats with 7-day windows.
- Done 11-19: Zimmer Biomet, Syneos, Dana-Farber, Premier, Insulet, Trinity Health (all dry).

## Notes to self

- AG: carry the prep line in This week until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: Corewell Workday `spectrumhealth.wd5` `CorewellHealthCareers`; Verily `verily.wd1` `Verily_Careers`; Alkermes Oracle `hbap.fa.us1` `CX_1`; Cencora `myhrabc.wd5` `Global`; Biogen `biibhr.wd3` `external`; Regeneron `regeneron.wd1` `Careers`; GSK `gsk.wd5` `GSKCareers`; Alnylam Greenhouse `alnylampharmaceuticals`; Premier `premierinc.wd1` `External_Professional`; Trinity Health `trinityhealth.wd1` `Jobs`; Insulet `insulet.wd5` `insuletcareers`; Zimmer Biomet Phenom `careers.zimmerbiomet.com/us/en/search-results?keywords=`; Syneos `syneoshealth.com/clinical-corporate-careers/jobs/search/?q=`.
- Use `py -3`; write files with LF. Back up data files first; load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Merck, Vertex, Daiichi, Highmark, CVS grad, Genmab, Moderna, Regeneron, GSK, Alnylam, Lilly, Takeda, Teva, Organon, UCB, Incyte, Cencora, Biogen, Northwestern Medicine, Corewell, Alkermes, Insulet, Premier.
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 25; decide whether the hand file still matters.
