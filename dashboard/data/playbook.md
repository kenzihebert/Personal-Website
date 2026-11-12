# Research playbook

**v44, 2026-11-12.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 11 of 24 on 11-12.
Sends last 7 days: 4; last 14: 4. Store 11-12: 22 sent, 18 waiting, 4 rejected, no interview
(`curl -s https://mckenziehebert.com/api/apps`). No send since 11-10.
Diagnosis 11-12: three unsent rows died; 4 new seats close in 7 to 15 days (Regeneron x2 undated, BMS PS four days early); change = treat undated rows as due 7 days after first seen.
Next diagnosis on a change only (a send, an outcome, Nov 16 Henry Ford, Nov 20 H18, Sanofi AD unsent at Nov 17).
Used and dropped (11-02 to 11-12): outcomes, send rate, dated East Coast seats, Pfizer late, page finding seats,
ask Mueller, St. Jude faculty route, references, Nov 16-17 seats, undated rows die.

## Sunday review (11-08; next 11-15)

- Ranking fit, then close date; location dropped 11-10. Re-check the order on 11-15.
- Underused: R Shiny app and Big Data Summer Institute model; neither linked publicly. Four open rows name R Shiny (Daiichi x2, Genmab, Sanofi AD).
- Biggest gap to an offer: an interview. 22 sent, none yet.
- Observables that change strategy: an interview in the store; a US CRO biostat intern (H3); a device MS stats seat (H11).

## What is working (last confirmed 2026-11-12)

- Sweep still earns its 25 min: Genentech PD Data Sciences wave (3 MS seats, posted 11-11, close 11-19) found 11-12.
- Direct Workday search of big-pharma boards each run: BMS `bristolmyerssquibb|wd5|BMS` found Data & Quantitative Sciences (posted 11-11, MS ok) 11-12; Sanofi `sanofi|wd3|SanofiCareers` 11-10 to 11-12.
- Workday cxs POST search with `searchText` (scratch `wd.py`), body via `wdjob.py`. Set PYTHONIOENCODING=utf-8. A job GET returning 403 S22 = req removed (confirmed 11-12 against search).
- Liveness pass (`live.py`) every run: caught 3 removals 11-12.
- Web search "<company> 2027 summer intern biostatistics" for national pharma not in the sweep: Daiichi 11-11, Sanofi 11-10.
- SuccessFactors (Daiichi, Novo, Boehringer, Astellas) and Phenom (Eisai) searches: read in the browser or curl `/search/?q=intern`.

## What is not working

- Sweep misses national employers (BMS, Sanofi, Daiichi, Highmark, St. Jude, MSK).
- `sweep_boards.py` takes about 25 min or more, prints nothing; start it first, in the background.
- Otsuka cxs POST returns 422 from curl; read it in the browser (`?q=`).
- Blocked boards (Denali, Xencor, CHLA): 28 dry runs. TGen bot check; do not try to pass it.
- Guessing Workday tenants or Greenhouse slugs: stop. Find the link on the company careers page.

## Targets

- Nov 13 Sanofi call. Nov 16 AZ Lung closes; Henry Ford opens. Nov 17 Sanofi AD. Nov 19 Genentech x3. Nov 20 H18 check. Nov 27 BMS D&QS. Dec 1 Highmark CPH. Dec 11 Sanofi pool. Dec 18 St. Jude. Jan 8 J&J Market Access. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Otsuka InTOW 2027, Astellas biostat (Jan deadlines before), Corcept, Kite grad, Ultragenyx, Kaiser R&E (Feb), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H18: early September applications get decisions in November. Kill: no outcome change by Nov 20.
- H20: remote graduate seats at health plans post late October onward. Kill: no new one by Dec 1.
- H22: research hospitals run graduate biostatistics programs with fall to January deadlines. SUPPORTED (St. Jude, MSK). Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. SUPPORTED again 11-12 (BMS PS 4 days early, Regeneron undated). Kill: a dated seat survives to its date three times running.
- H24: mid-size Japanese and European pharma post R programming seats for master's students in November. Daiichi yes; Otsuka, Astellas, Eisai dry 11-12. Kill: none at those three by Nov 30.

## Exploration queue (never empty)

1. Research hospitals: Dana-Farber biostatistics core, Kaiser Division of Research (Oakland), Cedars-Sinai biostatistics core.
2. ASA Biopharmaceutical Section and StatTrak (amstat) 2027 internship listings.
3. Big pharma Workday boards not yet searched by hand: Merck (re-post?), Takeda, Bayer, Organon, Incyte.
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
- Done 11-12: Otsuka, Astellas, Eisai (dry), BMS (1 found). 11-11: Daiichi (2), Novo, Boehringer.

## Notes to self

- Employers card is by type. Keep it.
- Sanofi start card: drop after Nov 13; carry questions into This week only if she records the call.
- BMS D&QS needs "one year of coursework completed"; she will have it by May. Quoted in the row.
- Daiichi job URLs: `careers.daiichisankyo.com/job/<slug>/<req>-en_US` works for curl.
- RAND and BRG in not-a-fit; do not carry their dates. Federal Reserve: public sector, excluded.
- Back up data files before writing. Pattern: load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford Oct 16, AG Generalist passed).
- Let long-dry BLOCKED boards move to Sundays (28 dry runs).
- `sweep_boards.py`: add BMS (Workday bristolmyerssquibb/wd5/BMS, `intern 2027`), Sanofi (Workday sanofi/wd3/SanofiCareers, `2027 summer intern`), Otsuka (Workday vhr-otsuka/wd1/External), Daiichi, Astellas, Novo, Boehringer (SuccessFactors `/search/?q=intern`), Eisai (Phenom careers.eisai.com), Highmark, CVS grad, Genmab, Moderna, Regeneron, Insulet, Labcorp, Pfizer, SCAN, Lilly.
- `kenzie-done.json` is empty while the store holds 22; decide whether the hand file still matters.
