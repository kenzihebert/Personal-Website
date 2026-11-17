# Research playbook

**v49, 2026-11-17.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 17 of 25 on 11-17 (16 of 26 on 11-16). Rising.
Sends last 7 days: 2; last 14: 6. Store unchanged since 11-13: 24 sent, 18 waiting, 1 interview (AG), 5 rejected.
Diagnosis 11-17: BMS D&QS taken down 10 days early, unsent; change = treat posted dates as one week earlier (BMS SP due 11-18).
Next diagnosis on a change only (AG date or outcome, a send, H18 check 11-20, BMS SP unsent at 11-20, StatTrak list).
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17). Escalate once only if BMS SP vanishes unsent.

## Sunday review (11-15; next 11-22)

- Order right; Manatt pinned; genomics last. Underused: R Shiny (Daiichi R Innovation unsent). Biggest gap: converting AG.
- CHLA and Xencor weekly (Sundays). Watch: AG outcome; CRO US biostat intern (H3); undated rows unsent at 11-22.

## What is working (last confirmed 2026-11-17)

- `/api/apps` first every run (AG interview 11-13 seen there).
- Sweep diff by URL on the `intern` arrays (`boards[*].intern[*].url`): AZ Statistics R-264440 found 11-17, BMS SP 11-15.
- Scratch `live.py` (curl; Workday cxs job GET, Eightfold `/api/apply/v2/jobs/<id>?domain=`): caught AZ Lung close and BMS D&QS removal 11-17. Copy it and `wd.py` from the last session scratchpad.
- Reading the Henry Ford PHS REDCap form text by curl (dates appeared 11-17: through Dec 31, $18/hr).
- `wd.py host tenant site "q"` for Workday searches (Sanofi, BMS, Corewell 11-17).
- Oracle CE API: `https://<pod>/hcmRestApi/resources/latest/recruitingCEJobRequisitions?onlyData=true&expand=requisitionList&finder=findReqs;siteNumber=CX_1,keyword=intern,limit=50` (Alkermes 11-17).

## What is not working

- Sends fell to 2 in 7 days while 17 rows age. Close dates get read as deadlines; four seats vanished early this month.
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson and REDCap boilerplate; program text lives in `*-program.md`.
- Sweep misses national employers (BMS, Sanofi, Daiichi, Highmark, St. Jude, MSK, Lilly, Takeda, Teva, Corewell).
- Sweep takes 25+ min, prints nothing; start it first in the background.
- Jazz cxs 422. TGen and jobs.corewellhealth.org refuse the browser (bot check / denied); do not retry nightly.
- Aggregators (compbiojobs, teal) surface seats only after they close.

## Targets

- Nov 18 BMS SP send target. Nov 19 Genentech Boston and COA. Nov 20 H18 check. Nov 25 BMS SP posted close. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 11 Sanofi pool. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring), Alkermes (posted a biostat intern last cycle per aggregators; unverified).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Sanofi contact is the test. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H18: early fall applications get decisions in November. SUPPORTED 11-12. Kill: no further outcome by Nov 20.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. SUPPORTED (Henry Ford Dec 31). Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. SUPPORTED (Bayer 11-16, BMS D&QS 11-17). Kill: a dated seat survives to its date three times running.
- H24: mid-size Japanese/European pharma post master's R seats in November. Daiichi yes; Otsuka, Astellas, Eisai, Ipsen, Teva, Organon, Incyte, UCB dry. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks post in winter. AZ Statistics posted 11-16 (Jan 14 close). Kill: Lilly and Takeda not posted by Jan 4.

## Exploration queue (never empty)

1. Trinity Health (Livonia) research/analytics summer seats; careers page gave no board link 11-17.
2. National boards not yet read: Lundbeck (no board link), Regeneron recheck, Exelixis, Insulet recheck.
3. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
4. AstraZeneca other US statistics seats (Boston, Wilmington) on Eightfold search.
- Done 11-17: Corewell, Verily, Alkermes (dry); Weill Cornell epi ($2000, no 2027 window).

## Notes to self

- AG: carry the prep line in This week until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: Corewell Workday `spectrumhealth.wd5` site `CorewellHealthCareers`; Denali Workday `dnli.wd1` sites Commercial, Technical_Operations_Manufacturing, Development, Discovery, Corporate_Positions; Verily `verily.wd1` `Verily_Careers`; Alkermes Oracle `hbap.fa.us1` `CX_1`; Cencora `myhrabc.wd5` `Global`; Biogen `biibhr.wd3` `external`.
- Strip `\r` from Python output before piping URLs to bash.
- Back up data files first; load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Merck, Vertex, Daiichi, Highmark, CVS grad, Genmab, Moderna, Regeneron, Lilly, Takeda, Teva, Organon, UCB, Incyte, Cencora, Biogen, Northwestern Medicine, Corewell, Denali (dnli.wd1, replaces BLOCKED), Alkermes (Oracle).
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 24; decide whether the hand file still matters.
