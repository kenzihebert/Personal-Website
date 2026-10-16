# Research playbook

**v18, 2026-10-16.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. 10-16: 17 runs since 10-01, 0 sent, 25 open; 16 rows past 7 runs.
Diagnoses used: shape, cost, materials, recording gap, the cut (three names, final use 10-16).
10-17: log only whatever closed Oct 16 unsent; never on the page. Then one new diagnosis on the
post-Oct 16 list (J&J Peds Oct 20, J&J Onc Epi Oct 23, AG HC Oct 28, Merck OR Oct 30, Merck
Oct 31, Edwards Nov 1, J&J C&SP Nov 9, J&J SDS Nov 13). Candidate: one-week J&J windows.

## Sunday review (10-11; next 10-18)

- Metro order: still right. Fitting seats are LA, OC or Bay Area; San Diego has J&J and Dexcom's pool.
- Underused skill: survival analysis and the recurrence model fit Gilead Oncology and Henry Ford.
  R Shiny is unused; Stryker and Alcon reward it.
- Biggest gap: zero applications sent or recorded. The KV binding or a done-file entry fixes recording.
- Kill or slow: Pfizer positions list (every 3rd night, next 10-17), CRO phrase passes (after Nov).

## What is working (last confirmed 2026-10-16)

- Sweep diff by URL against last night's backup: 10-13 J&J batch, 10-14 J&J SDS, 10-16 J&J Onc
  Epi and Gilead Biomarker. Highest-yield step. `diff.py` and `live.py` are local helper scripts;
  copy them forward.
- Workday `cxs` job endpoint by curl: `endDate`, body, liveness (19 rows).
- iCIMS (Analysis Group) by curl with `?in_iframe=1`: full body, no browser (10-16).
- Reading the body kills title traps (J&J DM CM and GD read as data seats; both undergrad only).
- Oracle HCM REST by curl: BCBSM 14837, Cedars CX_1. Save responses to files.
- SmartRecruiters API for Henry Ford; Lever API for Penumbra; Paycor (MannKind) needs the browser.
- Back up postings-text before `fetch_posting_text.py`; restore stubs under 1.5 KB (AG HC, BCBSM).
- Bash heredocs with apostrophes break; write scripts with the Write tool.
- `--out` with forward slashes. Sweep about 4 minutes; run in background.

## What is not working

- 0 applications recorded across 17 runs. `/api/apps` answers 501, so ticks never arrive.
- Employer-side named people: zero (J&J SDS search dry 10-16). Weekly at most; next 10-23.
- Carried-forward text keeps stale words. Grep for "tonight", "today", "tomorrow" and old dates.
- Python: use `py -3`; bare `python` hangs. Set `PYTHONIOENCODING=utf-8`.

## Targets

- After Oct 16: J&J Peds (Oct 20), J&J Onc Epi (Oct 23), Analysis Group HC (Oct 28), Merck OR
  (Oct 30), Merck biostat (Oct 31), Edwards C&R (Nov 1), J&J C&SP (Nov 9), J&J SDS (Nov 13),
  Stryker (rolling).
- Watch: Corcept biostat intern (by Jan), Kite stats grad (Oct to Jan), Pfizer positions list,
  Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb), Denali, Arrowhead, MannKind (Q4),
  Penumbra statistician (Feb last cycle).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a university contact yields an employer name faster than search. Kill: none by Oct 31.
- H6: a three-row shortlist gets a first application recorded. Kill: nothing recorded by Oct 17.
- H8 confirmed 10-13, 10-14, 10-16: J&J posts batches; windows run one to four weeks (Onc Epi
  Oct 15 to 23). Keep the sweep diff nightly.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: no device MS
  statistics seat in her metros by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post in Q4 to January. Kill: none by Jan 31.

## Exploration queue (never empty)

1. Alcon Workday for a California clinical seat (10-17).
2. Neurocrine San Diego board (10-20).
3. Takeda jobs.takeda.com/search-jobs/intern (10-26).
4. Evidation and Aetion real boards (from their careers pages in the browser; 10-19).
5. Glaukos Oracle recheck 11-15; Exponent iCIMS recheck 11-01; MannKind Paycor 11-01.
6. Denali real Workday site names; Jazz working board; Puma, Capricor.
7. Weekly Workday phrase pass (next 10-22; filter titles to her fields).
8. Blue Shield Oracle board weekly (next 10-21).

## Notes to self

- Xencor, CHLA, Denali in the browser nightly (fast, under a minute each).
- RAND is in not-a-fit; do not carry its Dec date.
- Out-of-metro exceptions in Open now: Merck biostat, Merck OR, BCBSM, J&J Peds, J&J C&SP,
  J&J Onc Epi, Alcon. Humana held.
- 10-17: drop Oct 16 rows, deadlines and the BRG row; move them to the log only. Retitle the
  Gilead line in Bay Area employers.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.
- No day counts in prose; dates only. Titles under 60 characters.

## Proposed core changes

- Decide out-of-metro scope: seven East Coast, Midwest or Texas rows now sit in Open now.
- Standing dates are stale: Gilead/Kite Oct 16 and Henry Ford Oct 16 pass tonight; Edwards C&R
  closes Nov 1; RAND excludes biostat MS students; Amgen grad DS has no deadline; AG Generalist
  deadline passed.
- `sweep_boards.py`: add Stryker, Denali, Corcept (greenhouse `corcepttherapeutics`), BCBSM
  (oraclehcm `ejko.fa.us2.oraclecloud.com|CX_3|intern`), Blue Shield
  (`ecge.fa.us2.oraclecloud.com|CX_1003|intern`), Humana, Xencor, MannKind (Paycor);
  `--help` should exit.
- `fetch_posting_text.py`: skip writing when a fetch fails; use `?in_iframe=1` for iCIMS.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
