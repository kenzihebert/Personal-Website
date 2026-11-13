# Research playbook

**v45, 2026-11-13.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 13 of 22 on 11-13.
Sends last 7 days: 3; last 14: 5. Store 11-13: 23 sent, 18 waiting, 1 interview (Analysis Group Health Care, 11-12), 4 rejected.
Diagnosis 11-13: first interview; change = she writes the interview date in the row note.
Next diagnosis on a change only (interview date or outcome, a send, Nov 16 Henry Ford, Nov 17 Sanofi AD unsent, Nov 20 H18 check).
Used and dropped (11-02 to 11-13): outcomes, send rate, dated East Coast seats, Pfizer late, page finding seats,
ask Mueller, St. Jude faculty route, references, Nov 16-17 seats, undated rows die, first interview.

## Sunday review (11-08; next 11-15)

- Ranking fit, then close date; location dropped 11-10. Re-check the order on 11-15.
- Underused: R Shiny app and Big Data Summer Institute model; now the AG interview story. Four open rows name R Shiny.
- Biggest gap to an offer: converting the AG interview. Tonight touched it (AG FAQ prep in start).
- Observables that change strategy: AG outcome; a US CRO biostat intern (H3); a device MS stats seat (H11).

## What is working (last confirmed 2026-11-13)

- `/api/apps` outcomes: AG interview surfaced 11-13 from the store, not mail. Read it first every run.
- StatTrak (amstat) annual internship list: last cycle's list named master's tracks at Lilly (Jan 4) and Takeda (Feb 28) that board searches never showed. Found 11-13.
- Sweep still earns its 25 min: Genentech wave 11-12; Kaiser Pasadena master's round seen 11-13 (strategy seat, out).
- Direct Workday cxs POST (`wd.py`, `wdjob.py`, PYTHONIOENCODING=utf-8): BMS, Sanofi, Roche, Merck, Vertex. 403/500 on a job GET = req removed.
- Liveness pass (`live.py`) every run: 24 of 24 live 11-13.

## What is not working

- Sweep misses national employers (BMS, Sanofi, Daiichi, Highmark, St. Jude, MSK, Lilly, Takeda).
- `sweep_boards.py` takes about 25 min, prints nothing; start it first, in the background, copy yesterday's `sweep-latest.json` from git for the diff.
- Workday 422 from curl: Takeda, Incyte, Otsuka, Lilly (Lilly's CMP site is dead; use careers.lilly.com).
- Exploration repeats: Merck PDL, Weill Cornell, Vertex were re-read 11-13 though already in the ledger. Grep the ledger before any exploration search.
- TGen bot check; do not try to pass it.

## Targets

- Nov 13 Sanofi call. Nov 16 AZ Lung closes; Henry Ford opens. Nov 17 Sanofi AD. Nov 19 Genentech Boston and COA. Nov 20 H18 check. Nov 27 BMS D&QS. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 11 Sanofi pool. Dec 18 St. Jude. Jan 8 J&J Market Access. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Lilly MS Statistics, Takeda SQS, Otsuka, Astellas, Corcept, Kite grad, Ultragenyx, Kaiser R&E (Feb) and Pasadena master's analytics, MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H18: early fall applications get decisions in November. SUPPORTED 11-12 (AG, sent Oct 8). Kill: no further outcome by Nov 20.
- H20: remote graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H22: research hospitals run graduate biostatistics programs, fall to January deadlines. SUPPORTED (St. Jude, MSK). Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. SUPPORTED 11-12. Kill: a dated seat survives to its date three times running.
- H24: mid-size Japanese and European pharma post master's R seats in November. Daiichi yes; Otsuka, Astellas, Eisai, Ipsen dry. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks (Lilly, Takeda) post in December with January to February deadlines. Kill: neither posted by Jan 4.

## Exploration queue (never empty)

1. Research hospitals: Kaiser Division of Research (Oakland), Cedars-Sinai biostatistics core, Cleveland Clinic, Northwestern Medicine.
2. Weill Cornell Epidemiology Internship Program (separate from the undergrad biostat one).
3. National boards not yet read: Organon, Lundbeck (Deerfield), UCB (Smyrna; Phenom), Cencora, Flatiron Health, Verily.
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
- Done 11-13: StatTrak (found 2), Merck, Vertex, Takeda, Lilly, Ipsen, WashU BIDS, Mathematica (dry).

## Notes to self

- Employers card is by type. Keep it.
- AG interview: carry the AG FAQ prep in start until she records a date or outcome; then the date leads.
- Sanofi start card folded into This week 11-13; drop the Sanofi call line from 11-14.
- Daiichi job URLs: `careers.daiichisankyo.com/job/<slug>/<req>-en_US` work for curl.
- Denali links its Workday board on its careers page (`dnli.wd1`); Xencor uses Dayforce `jobs.dayforcehcm.com/en-US/xencor/EXTERNALCANDIDATEPORTAL`. Both can join the sweep.
- RAND and BRG in not-a-fit; do not carry their dates. Federal Reserve: public sector.
- Back up data files before writing. Pattern: load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Roche summer search, Merck, Vertex (wd501 Vertex_Careers), Denali (dnli wd1), Xencor (Dayforce), Daiichi, Highmark, CVS grad, Genmab, Moderna, Regeneron, careers.lilly.com, jobs.takeda.com.
- `kenzie-done.json` is empty while the store holds 23; decide whether the hand file still matters.
