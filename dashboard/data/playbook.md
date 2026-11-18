# Research playbook

**v50, 2026-11-18.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last. No location limit (11-10).

## Governing metric

Rows unsent 7+ runs in Open now (`first_listed` on or before tonight minus 6): 19 of 27 on 11-18 (17 of 25 on 11-17). Rising three nights running.
Sends last 7 days: 2; last 14: 6. Store unchanged since 11-13 (five days): 24 sent, 18 waiting, 1 interview (AG), 5 rejected.
Diagnosis 11-18 (escalation, used once): five days with nothing recorded; Genentech Boston and COA close 11-19; BMS SP missed its 11-18 target. Asked her to tick anything sent.
From 11-19: drop the send-pressure diagnosis and watch. Next diagnosis only on a change (a send, an AG date or outcome, H18 at 11-20, BMS SP vanishing, StatTrak list, a new fit).
Do not reuse: Genentech Boston (11-15), Henry Ford live (11-16), dates-are-ceilings (11-17), nothing-recorded (11-18).

## Sunday review (11-15; next 11-22)

- Order right; Manatt pinned; genomics last. Underused: R Shiny (Daiichi R Innovation unsent). Biggest gap: converting AG.
- CHLA and Xencor on Sundays. Watch: AG outcome; H3; undated rows at 11-22.

## What is working (last confirmed 2026-11-18)

- `/api/apps` first every run.
- Sweep diff by URL on `boards[*].intern[*].url` against the backed-up sweep (AZ Statistics 11-17, BMS SP 11-15).
- Scratch `live.py` (Workday cxs GET; HTTP for the rest): 25 of 25 live 11-18. Copy scratch scripts from the last session.
- `wd.py host tenant site "q"` for Workday (Sanofi, Regeneron, GSK, BMS 11-18).
- Greenhouse API `boards-api.greenhouse.io/v1/boards/<key>/jobs` (Alnylam key `alnylampharmaceuticals`).
- AZ Eightfold in the browser: `careers?domain=astrazeneca.com&query=summer+intern+2027&location=United+States&start=N` (browser only).
- Sources that curl cannot fetch (St. Jude, Michigan SPH) read fine in the browser.

## What is not working

- Sends fell to 2 in 7 days while 19 rows age. A nightly diagnosis has not moved the store since 11-13.
- `fetch_posting_text.py` saves stubs for St. Jude and Ferguson; program text lives in `*-program.md`.
- Sweep misses national employers; takes 25+ min, prints nothing; start it first in the background, then Monitor the task output for "exit".
- Jazz cxs 422; Alnylam Workday 422 (it moved to Greenhouse). TGen and jobs.corewellhealth.org refuse the browser.

## Targets

- Nov 19 Genentech Boston and COA. Nov 20 H18 check. Nov 22 Sunday review. Nov 25 BMS SP posted close. ~Dec 1 StatTrak 2027 list. Dec 1 Highmark CPH. Dec 11 Sanofi pool. Dec 18 St. Jude. Dec 31 Henry Ford biostat, Manatt, Northwestern IS. Jan 8 J&J Market Access. Jan 14 AZ Statistics. Jan 25 GEMS. Jan 31 Ferguson. Feb 15 Jefferson.
- Watch: Lilly MS Statistics, Takeda SQS, ICON US biostat intern, Kite grad, Ultragenyx, Alnylam summer (Greenhouse), Kaiser R&E (Feb to Mar), MannKind, Penumbra (Feb), SCAN (spring).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: none by Jan 31.
- H4: a peer inside a target team beats recruiters. Sanofi contact is the test. Kill: no Sanofi response by Dec 11.
- H11: device makers post MS clinical-data seats late. Kill: none new by Dec 1.
- H12: small LA biotechs post Q4 to January. Kill: none by Jan 31.
- H18: early fall applications get decisions in November. SUPPORTED 11-12. Kill: no further outcome by Nov 20.
- H22: research hospitals run graduate biostat programs, fall to January deadlines. SUPPORTED (Henry Ford Dec 31). Kill: no third by Dec 1.
- H23: posted close dates are ceilings; seats vanish early. SUPPORTED (Bayer 11-16, BMS D&QS 11-17). Kill: a dated seat survives to its date three times running (Genentech x2 on 11-19 is the first test).
- H24: mid-size Japanese/European pharma post master's R seats in November. Daiichi yes; eight others dry. Kill: none by Nov 30.
- H25: big-pharma master's statistics tracks post in winter. AZ Statistics 11-16. Kill: Lilly and Takeda not posted by Jan 4 (Takeda dry 11-18).

## Exploration queue (never empty)

1. Trinity Health (Livonia) research/analytics summer seats; careers page gave no board link 11-17.
2. National boards not yet read: Lundbeck (no board link), Exelixis recheck, Insulet recheck, Vertex recheck.
3. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (named lead for H4).
4. AZ Global Medical Affairs Intern (posted 11-17): read once; AZ medical-affairs seats so far are undergraduate.
- Done 11-18: AbbVie (PhD/undergrad only), Takeda (no US intern), Alnylam (no intern), GSK (no US stats), Regeneron Workday (no new stats), AZ US interns (41; Statistics already listed, rest PhD/undergrad/ops).

## Notes to self

- AG: carry the prep line in This week until she records a date or outcome; then the date leads.
- Grep the ledger (`searches` dict by id; `postings` dict by URL) before any search.
- Board keys: Corewell Workday `spectrumhealth.wd5` `CorewellHealthCareers`; Denali `dnli.wd1`; Verily `verily.wd1` `Verily_Careers`; Alkermes Oracle `hbap.fa.us1` `CX_1`; Cencora `myhrabc.wd5` `Global`; Biogen `biibhr.wd3` `external`; Regeneron `regeneron.wd1` `Careers`; GSK `gsk.wd5` `GSKCareers`; Alnylam Greenhouse `alnylampharmaceuticals`; AbbVie `careers.abbvie.com/en/jobs?q=`.
- Use `py -3`, never `python`; strip CR before piping URLs; write files with LF.
- Back up data files first; load, mutate, validate, banned-word assert.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite Oct 16, Henry Ford CEPC Oct 16, AG Generalist passed).
- `sweep_boards.py`: add BMS, Sanofi, Merck, Vertex, Daiichi, Highmark, CVS grad, Genmab, Moderna, Regeneron Workday, GSK, Alnylam (Greenhouse), Lilly, Takeda, Teva, Organon, UCB, Incyte, Cencora, Biogen, Northwestern Medicine, Corewell, Denali, Alkermes (Oracle).
- `fetch_posting_text.py`: never overwrite an existing body with a "could not fetch" stub.
- `kenzie-done.json` is empty while the store holds 24; decide whether the hand file still matters.
