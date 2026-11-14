# Research playbook

**v46, 2026-11-14.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 13 of 22 on 11-14 (flat).
Sends last 7 days: 4 (best week); last 14: 6. Store 11-14: 24 sent, 18 waiting, 1 interview (AG), 5 rejected
(Stryker override counted from 11-14; earlier runs said 4).
Diagnosis 11-14: Sanofi sent the day of the inside call; change = thank-you note with req ids R2865024, R2871289.
Next diagnosis on a change only (AG date or outcome, a send, Nov 16 Henry Ford, Nov 19 Genentech unsent, Nov 20 H18 check).
Used and dropped (11-02 to 11-14): outcomes, send rate, dated East Coast seats, Pfizer late, page finding seats,
ask Mueller, St. Jude faculty route, references, Nov 16-17 seats, undated rows die, first interview, inside-contact note.

## Sunday review (next 11-15)

- Re-check the order (fit, then close date). Underused: R Shiny app and the AG interview story.
- Biggest gap to an offer: converting the AG interview; second, an inside word at Sanofi.
- Observables: AG outcome; a US CRO biostat intern (H3); a device MS stats seat (H11).

## What is working (last confirmed 2026-11-14)

- `/api/apps` first every run: Sanofi tick seen 11-14, AG interview 11-13.
- Scratch `live.py` (curl; Workday cxs job GET, Eightfold `/api/apply/v2/jobs/<id>?domain=`): 15 of 15 reachable rows live 11-14. Python urllib fails here; use curl via subprocess.
- Eightfold API works by curl for BSC, AZ and now Teva (`www.careers.teva`, domain=tevapharm.com).
- StatTrak annual list (Lilly Jan 4, Takeda Feb 28 last cycle). Next list about Dec 1.

## What is not working

- **Workday wd1 and wd5 returned 521 all night 11-14** (BMS, J&J, Amgen, Moderna, CVS, Highmark, Gilead, Kite, Merck, Pfizer, Dexcom...). 26 of 67 sweep boards failed; 7 rows unverified. If it repeats 11-15, say so in start; if it lasts 3 nights, drop no row for it.
- `fetch_posting_text.py` crashes on the first Workday non-JSON answer (no try/except). Proposed fix below.
- Sweep misses national employers (BMS, Sanofi, Daiichi, Highmark, St. Jude, MSK, Lilly, Takeda, Teva).
- Sweep takes ~25 min, prints nothing; start it first in the background.
- Workday 422 from curl on guessed site names (Teva, UCB, Lundbeck, Viatris): find the site name first.
- Teva's careers.teva search redirects to a Microsoft login in the browser; use the Eightfold API.

## Targets

- Nov 16 AZ Lung closes; Henry Ford opens. Nov 19 Genentech Boston and COA. Nov 20 H18 check. Nov 27 BMS D&QS. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 11 Sanofi pool. Dec 18 St. Jude. Jan 8 J&J Market Access. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. ICON ran a US multi-site one in a past cycle. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Sanofi contact is the test. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H18: early fall applications get decisions in November. SUPPORTED 11-12. Kill: no further outcome by Nov 20.
- H20: remote graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. SUPPORTED. Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. SUPPORTED. Kill: a dated seat survives to its date three times running.
- H24: mid-size Japanese/European pharma post master's R seats in November. Daiichi yes; Otsuka, Astellas, Eisai, Ipsen, Teva dry. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks (Lilly, Takeda) post in December. Kill: neither posted by Jan 4.

## Exploration queue (never empty)

1. Research hospitals: Cedars-Sinai biostatistics core, Northwestern Medicine, Cleveland Clinic Quantitative Health Sciences.
2. Weill Cornell Epidemiology Internship Program (separate from the undergrad biostat one).
3. National boards not yet read: Organon, Lundbeck (Deerfield), UCB (Smyrna), Cencora, Verily, Incyte (find Workday site names first).
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
- Done 11-14: Teva, ICON, Thermo Fisher, Kaiser Division of Research (dry).

## Notes to self

- Employers card is by type. Keep it.
- AG: carry the prep line in This week until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` is a dict keyed by id; `postings` a dict keyed by URL) before any search.
- Daiichi job URLs: `careers.daiichisankyo.com/job/<slug>/<req>-en_US` work for curl.
- Denali's openings live on `dnli.wd1`; Xencor uses Dayforce `jobs.dayforcehcm.com/en-US/xencor/EXTERNALCANDIDATEPORTAL`.
- RAND and BRG in not-a-fit; do not carry their dates. Federal Reserve: public sector.
- Back up data files before writing. Pattern: load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Roche summer search, Merck, Vertex, Denali, Xencor (Dayforce), Daiichi, Highmark, CVS grad, Genmab, Moderna, Regeneron, careers.lilly.com, jobs.takeda.com, Teva (Eightfold tevapharm.com).
- `fetch_posting_text.py`: wrap each fetch in try/except so one dead host does not stop the rest.
- `kenzie-done.json` is empty while the store holds 24; decide whether the hand file still matters.
