# Research playbook

**v48, 2026-11-16.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 16 of 26 on 11-16 (14 of 24 on 11-15). Rising.
Sends last 7 days: 4; last 14: 6. Store unchanged since 11-13: 24 sent, 18 waiting, 1 interview (AG), 5 rejected.
Diagnosis 11-16: Henry Ford Division of Biostatistics live on the PHS form; change = send by 11-20 reusing CEPC letter.
Genentech Boston (11-15 diagnosis) kept in This week only; do not escalate again. Next diagnosis on a change only
(AG date or outcome, a send, Nov 20 H18 check, BMS 11-25/11-27 unsent, StatTrak list).
Used and dropped (11-02 to 11-16): 14 diagnoses; latest Genentech Boston (11-15), Henry Ford live (11-16).

## Sunday review (11-15; next 11-22)

- Order right; Manatt pinned; genomics last. Underused: R Shiny (Daiichi R Innovation unsent). Biggest gap: converting AG.
- CHLA and Xencor weekly (Sundays). Watch: AG outcome; CRO US biostat intern (H3); undated rows unsent at 11-22.

## What is working (last confirmed 2026-11-16)

- `/api/apps` first every run: Sanofi tick seen 11-14, AG interview 11-13.
- Reading the Henry Ford PHS REDCap form in the browser (program list changed 11-16; SmartRecruiters never showed it).
- Scratch `live.py` (curl; Workday cxs job GET, Eightfold `/api/apply/v2/jobs/<id>?domain=`): 24 of 24 rows live 11-16; sweep found BMS SP and Amgen KG once Workday returned. Use curl via subprocess, not urllib.
- Phenom boards: read `phApp.ddo.eagerLoadRefineSearch` in the browser via javascript (Organon, UCB 11-15).
- `wd.py host tenant site "q"` for Workday searches (Sanofi 11-15).
- StatTrak annual list (Lilly Jan 4, Takeda Feb 28 last cycle). Next list about Dec 1.

## What is not working

- `fetch_posting_text.py` overwrites St. Jude and Ferguson with JS stubs nightly and saves REDCap boilerplate; Henry Ford form and Ferguson program text saved by hand 11-16 (`*-program.md`).
- Sweep misses national employers (BMS, Sanofi, Daiichi, Highmark, St. Jude, MSK, Lilly, Takeda, Teva).
- Sweep takes 25+ min, prints nothing; start it first in the background.
- Denali: internships page shows no board link (11-16). Jazz cxs 422 on JazzPharmaceuticals, Jazz, External, JazzCareers.
- Aggregator leads (compbiojobs) surfaced Bayer only after it closed; check employer boards, not aggregators.

## Targets

- Nov 16 AZ Lung closes (drop 11-17). Nov 19 Genentech Boston and COA. Nov 20 Henry Ford send target; H18 check. Nov 25 BMS Stat Programming. Nov 27 BMS D&QS. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 11 Sanofi pool. Dec 18 St. Jude. Dec 31 Manatt, Northwestern IS. Jan 8 J&J Market Access. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Sanofi contact is the test. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H18: early fall applications get decisions in November. SUPPORTED 11-12. Kill: no further outcome by Nov 20.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. SUPPORTED. Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. SUPPORTED (Bayer 11-16). Kill: a dated seat survives to its date three times running.
- H24: mid-size Japanese/European pharma post master's R seats in November. Daiichi yes; Otsuka, Astellas, Eisai, Ipsen, Teva, Organon, Incyte, UCB dry. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks (Lilly, Takeda) post in December. Weakened: Bayer's posted Sep 24. Kill: neither posted by Jan 4.

## Exploration queue (never empty)

1. Weill Cornell Epidemiology Internship Program (separate from the undergrad biostat one).
2. National boards not yet read: Lundbeck (Deerfield; careers page has no board link), Verily, Alkermes, Regeneron recheck.
3. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
4. Corewell Health and Trinity Health (Michigan private nonprofits) research/analytics summer seats.
- Done 11-16: Cencora, Biogen, Bayer (dry), Northwestern Medicine (IS intern, low), Cedars (nothing dated).

## Notes to self

- AG: carry the prep line in This week until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` is a dict keyed by id; `postings` a dict keyed by URL) before any search.
- Daiichi job URLs: `careers.daiichisankyo.com/job/<slug>/<req>-en_US` work for curl.
- Henry Ford: SmartRecruiters `HenryFordHealth1` (q= is loose) AND the PHS REDCap form; the form is where seats appear.
- Board keys: Cencora Workday `myhrabc.wd5` site `Global` (Phenom front end careers.cencora.com); Biogen `biibhr.wd3` site `external`; Northwestern Medicine jobs.nm.org (server-rendered, search-jobs/2027).
- Back up data files first; load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Roche summer search, Merck, Vertex, Daiichi, Highmark, CVS grad, Genmab, Moderna, Regeneron, careers.lilly.com, jobs.takeda.com, Teva (Eightfold tevapharm.com), Organon (Phenom jobs.organon.com), UCB (Phenom careers.ucb.com), Incyte (careers.incyte.com, iCIMS), Cencora, Biogen, Northwestern Medicine.
- `fetch_posting_text.py`: wrap each fetch in try/except; never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 24; decide whether the hand file still matters.
