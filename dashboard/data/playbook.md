# Research playbook

**v47, 2026-11-15.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 14 of 24 on 11-15 (13 of 22 on 11-14).
Sends last 7 days: 4; last 14: 6. Store 11-15 unchanged since 11-13: 24 sent, 18 waiting, 1 interview (AG), 5 rejected.
Diagnosis 11-15: Genentech Boston (best-fit dated row) unsent, closes 11-19; change = send by 11-18.
Next diagnosis on a change only (AG date or outcome, a send, Henry Ford posts, Nov 20 H18 check, BMS 11-27 unsent).
Used and dropped (11-02 to 11-15): outcomes, send rate, dated East Coast seats, Pfizer late, page finding seats,
ask Mueller, St. Jude faculty route, references, Nov 16-17 seats, undated rows die, first interview, inside-contact note, Genentech Boston.

## Sunday review (11-15; next 11-22)

- Order still right: trials and biostat seats lead, Manatt pinned by request, genomics last. No change.
- Underused: the R Shiny app. Daiichi R Innovation (Shiny on trial data) is unsent 7 nights; it is her closest skills match.
- Biggest gap to an offer: converting the AG interview. Tonight touched it only by carrying the prep line.
- Produced nothing for 14 days: nightly re-reads of CHLA and Xencor (one role since August). Move both to weekly (Sundays).
- Observables that change strategy: AG outcome; a CRO US biostat intern (H3); undated rows still unsent at 11-22 (then rank undated below dated in start, not on the table).

## What is working (last confirmed 2026-11-15)

- `/api/apps` first every run: Sanofi tick seen 11-14, AG interview 11-13.
- Scratch `live.py` (curl; Workday cxs job GET, Eightfold `/api/apply/v2/jobs/<id>?domain=`): 22 of 22 rows live 11-15; sweep found BMS SP and Amgen KG once Workday returned. Use curl via subprocess, not urllib.
- Phenom boards: read `phApp.ddo.eagerLoadRefineSearch` in the browser via javascript (Organon, UCB 11-15).
- `wd.py host tenant site "q"` for Workday searches (Sanofi 11-15).
- StatTrak annual list (Lilly Jan 4, Takeda Feb 28 last cycle). Next list about Dec 1.

## What is not working

- Workday wd1/wd5 outage 11-14 cleared 11-15. No row lost.
- `fetch_posting_text.py` misses St. Jude (login) and Ferguson (form); bodies on file from earlier runs.
- Sweep misses national employers (BMS, Sanofi, Daiichi, Highmark, St. Jude, MSK, Lilly, Takeda, Teva).
- Sweep takes 25+ min, prints nothing; start it first in the background.
- Denali: internships page shows no board link; dnli.wd1 site names Denali_Careers, External, DenaliCareers all 404.
- Web-search exploration mostly returns PhD seats. Prefer employer boards.

## Targets

- Nov 16 AZ Lung closes; Henry Ford opens. Nov 19 Genentech Boston and COA. Nov 25 BMS Stat Programming (new 11-15). Nov 20 H18 check. Nov 27 BMS D&QS. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 11 Sanofi pool. Dec 18 St. Jude. Jan 8 J&J Market Access. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Sanofi contact is the test. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H18: early fall applications get decisions in November. SUPPORTED 11-12. Kill: no further outcome by Nov 20.
- H20: remote graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. SUPPORTED. Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. SUPPORTED. Kill: a dated seat survives to its date three times running.
- H24: mid-size Japanese/European pharma post master's R seats in November. Daiichi yes; Otsuka, Astellas, Eisai, Ipsen, Teva, Organon, Incyte, UCB dry. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks (Lilly, Takeda) post in December. Kill: neither posted by Jan 4.

## Exploration queue (never empty)

1. Northwestern Medicine and Cedars-Sinai biostatistics cores (graduate summer seats).
2. Weill Cornell Epidemiology Internship Program (separate from the undergrad biostat one).
3. National boards not yet read: Lundbeck (Deerfield), Cencora, Verily, Jazz (Workday site name), Alkermes.
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
- Done 11-15: Organon, Incyte, UCB, TIMI, Cleveland Clinic (dry).

## Notes to self

- Employers card is by type. Keep it.
- AG: carry the prep line in This week until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` is a dict keyed by id; `postings` a dict keyed by URL) before any search.
- Daiichi job URLs: `careers.daiichisankyo.com/job/<slug>/<req>-en_US` work for curl.
- Henry Ford SmartRecruiters key `HenryFordHealth1`; filter titles for "intern", q= is loose.
- RAND and BRG in not-a-fit; do not carry their dates.
- Back up data files before writing. Pattern: load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Roche summer search, Merck, Vertex, Daiichi, Highmark, CVS grad, Genmab, Moderna, Regeneron, careers.lilly.com, jobs.takeda.com, Teva (Eightfold tevapharm.com), Organon (Phenom jobs.organon.com), UCB (Phenom careers.ucb.com), Incyte (careers.incyte.com, iCIMS).
- `fetch_posting_text.py`: wrap each fetch in try/except so one dead host does not stop the rest.
- `kenzie-done.json` is empty while the store holds 24; decide whether the hand file still matters.
