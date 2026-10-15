# Research playbook

**v17, 2026-10-15.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. 10-15: 16 runs since 10-01, 0 sent, 22 open; 16 rows past 7 runs.
Gilead pulled R0054464 two days early: a stated close is a latest date. Diagnoses used: shape, cost, materials, recording gap, the cut (three names). 10-15 done as watch. 10-16: numbers and
the three names, last time. 10-17: name in the log whatever closed Oct 16 unsent; never on
the page. Then a new diagnosis built on the post-Oct 16 list (AG HC Oct 28, Merck Oct 31, Edwards
Nov 1, J&J C&SP Nov 9, J&J SDS Nov 13).

## Sunday review (10-11)

- Metro order: still right. Fitting seats are LA, OC or Bay Area; San Diego has J&J and Dexcom's pool.
- Underused skill: survival analysis and the recurrence model fit Gilead Oncology and Henry Ford.
  R Shiny is unused; Stryker and Alcon reward it.
- Biggest gap: zero applications sent or recorded. The KV binding or a done-file entry fixes recording.
- Kill or slow: Pfizer positions list (every 3rd night, next 10-17), CRO phrase passes (after Nov).

## What is working (last confirmed 2026-10-15)

- Workday `cxs` job endpoint by curl from a Python script: `endDate`, body, liveness (16 rows).
  Last markdown link of each row; regex on the URL gives the cxs path.
- Sweep JSON: `boards` is a dict of company to `{intern: [{title, loc, url, req}]}`. Diff by URL
  against a backup of last night's file. 10-13 diff found J&J's Oct 12 batch;
  10-14 diff found J&J SDS R-103411; 10-15 diff 22 new, 0 fit. Highest-yield step.
- Reading the body kills title traps (J&J DM CM and GD read as data seats; both undergrad only).
- SmartRecruiters API `api.smartrecruiters.com/v1/companies/<co>/postings/<id>` for Henry Ford.
- iCIMS (Analysis Group) in the browser: `#icims_content_iframe` innerText via JS.
- Oracle HCM REST by curl: BCBSM 14837. Save responses to files.
- Paycor boards (MannKind) render by JS: read in the browser, curl gets only CSS.
- Back up postings-text before `fetch_posting_text.py`; restore stubs under 1.5 KB (AG HC, BCBSM;
  AG Generalist has no good copy).
- Lever API `api.lever.co/v0/postings/penumbrainc?mode=json` (Penumbra).
- Bash heredocs with apostrophes break; write scripts with the Write tool.
- `--out` with forward slashes. Sweep about 6 minutes; run in background.

## What is not working

- 0 applications recorded across 16 runs. `/api/apps` answers 501, so ticks never arrive.
- Employer-side named people: zero. Weekly at most.
- Carried-forward text keeps stale words. Grep for "tonight", "today" and old dates before writing.
- Python: use `py -3`; bare `python` hangs. Set `PYTHONIOENCODING=utf-8`.

## Targets

- This week: Henry Ford, Kite CDM, Gilead RWE (all Oct 16). Then J&J Peds (Oct 20), Analysis
  Group HC (Oct 28), Merck (Oct 31), Edwards C&R (Nov 1), J&J C&SP (Nov 9), J&J SDS (Nov 13),
  Stryker (rolling).
- Watch: Corcept biostat intern (by Jan), Kite stats grad (Oct to Jan), Pfizer positions list,
  Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb), Denali, Arrowhead, MannKind (Q4),
  Penumbra statistician (Feb last cycle).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a university contact yields an employer name faster than search. Kill: none by Oct 31.
- H6: a three-row shortlist gets a first application recorded. Kill: nothing recorded by Oct 17.
- H7 killed 10-13 on its own condition (Henry Ford unsent). Unobservable while recording is broken.
- H8 confirmed 10-13 and 10-14: J&J posts batches (Oct 12, Oct 13) with about 4-week windows.
  Keep the sweep diff nightly.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: no device MS
  statistics seat in her metros by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post in Q4 to January. Kill: none by Jan 31.

## Exploration queue (never empty)

1. Glaukos Oracle `ekpl.fa.us6` CX_3001 REST, keyword intern (dry 10-15; recheck 11-15).
2. Exponent iCIMS keyword intern (dry 10-15; recheck 11-01).
3. Alcon Workday for a California clinical seat (10-17).
4. Neurocrine San Diego board (10-20).
5. Takeda jobs.takeda.com/search-jobs/intern (10-26).
6. Denali real Workday site names (dry since 10-08); Jazz working board; Puma, Capricor.
7. Weekly Workday phrase pass (dry 10-15; next 10-22; filter titles to her fields). MannKind Paycor board recheck (11-01).
8. Blue Shield Oracle board weekly (dry 10-08, 10-14; next 10-21).

## Notes to self

- Xencor, CHLA, Denali in the browser weekly (read 10-15; next 10-22). Denali careers page lists roles in page text; no Workday needed.
- RAND is in not-a-fit; do not carry its Dec date.
- Out-of-metro exceptions in Open now: Merck, BCBSM, J&J Peds, J&J C&SP, Alcon. Humana held.
- 10-17: drop Oct 16 rows, deadlines and the BRG row; move them to the log only.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.
- No day counts in prose; dates only. Titles under 60 characters.

## Proposed core changes

- Decide out-of-metro scope: BCBSM, Merck, J&J Peds, J&J C&SP and Alcon are exceptions; Humana held.
- Standing dates are stale: Edwards C&R closes Nov 1; RAND excludes biostat MS students; Amgen grad
  DS has no deadline; Analysis Group Generalist deadline passed.
- `sweep_boards.py`: add Stryker, Denali, Corcept (greenhouse `corcepttherapeutics`), BCBSM
  (oraclehcm `ejko.fa.us2.oraclecloud.com|CX_3|intern`), Blue Shield
  (`ecge.fa.us2.oraclecloud.com|CX_1003|intern`), Humana, Xencor, MannKind (Paycor);
  `--help` should exit.
- `fetch_posting_text.py`: skip writing when a fetch fails.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
