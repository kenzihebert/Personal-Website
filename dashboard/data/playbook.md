# Research playbook

**v14, 2026-10-12.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. 10-12: 13 runs since 10-01, 0 sent, 21 open, all live; 17 rows past 7
runs. Diagnoses used: shape, cost, materials, recording gap, the cut (three names). 10-13 to 10-15:
watch, numbers plus the three names (10-12 done). 10-17: name in the log whatever closed Oct 16 unsent; never on
the page.

## Sunday review (10-11)

- Metro order: still right. Every fitting seat is LA, OC or Bay Area; San Diego has only J&J (quarter
  dates) and Dexcom's pool; Phoenix has nothing that fits.
- Underused skill: survival analysis and the recurrence model (AUC 0.75) fit Gilead Oncology and
  Henry Ford directly; the page says so on both rows. R Shiny is unused; Stryker and Alcon reward it.
- Biggest thing between her and an offer: zero applications sent or recorded. Tonight touched it
  only by keeping the shortlist. The page cannot fix it; the KV binding or a done-file entry can.
- Produces nothing nightly, kill or slow: Pfizer positions list (3 empty runs; move to every 3rd
  night from 10-12), Molina (closed), CRO phrase passes (H3 says after Nov).
- Observables that change strategy: (1) a first recorded send; (2) a US CRO biostat intern before
  Nov 15; (3) her answer on out-of-metro rows (Humana, Merck, Alcon, BCBSM).

## What is working (last confirmed 2026-10-11)

- Workday `cxs` job endpoint by curl from a Python script: `endDate`, body, liveness (16 rows,
  10-12). Script pulls the last markdown link of each row; regex on the URL gives the cxs path.
- Workday `jobs` POST search by curl (`searchText`): Denali's five sites 10-11.
- Diffing tonight's sweep against last night's by URL. Back up `sweep-latest.json` first.
- Reading the body kills title traps.
- iCIMS (Analysis Group) in the browser: `#icims_content_iframe` innerText via JS.
- Oracle HCM REST by curl: BCBSM 14837, Molina (`hckd`, CX_1; keyword is fuzzy, filter titles).
  Response is pretty-printed: save to files, never parse line by line.
- Back up postings-text before `fetch_posting_text.py`; restore stubs under 1.5 KB (AG, BCBSM).
- UMich SPH pages answer curl with 403; read them in the browser.
- `--out` with forward slashes. Sweep about 6 minutes; run in background, wait with an until-loop.

## What is not working

- 0 applications recorded across 12 runs. `/api/apps` answers 501, so ticks never arrive.
- Employer-side named people: zero. Weekly at most.
- Carried-forward notes keep stale dates ("tonight, Oct 9" sat on Open now until 10-11). Grep
  for "tonight" and old dates before writing.
- Python on this machine: use `py -3`; bare `python` hangs. Set `PYTHONIOENCODING=utf-8`.

## Targets

- This week: Henry Ford, Kite CDM, Gilead RWE (all Oct 16). Then J&J Peds (Oct 20), Analysis
  Group HC (Oct 28), Stryker (rolling), Edwards C&R (Nov 1).
- Watch: Corcept biostat intern (by Jan), Kite stats grad (Oct to Jan), Pfizer positions list,
  Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb), Denali (Oct to Jan), Arrowhead Biostats.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a university contact yields an employer name faster than search. Kill: none by Oct 31.
- H6: a three-row shortlist gets a first application recorded. Kill: nothing recorded by Oct 17.
- H7: the blocker is the cover letter. Kill: Henry Ford still unsent on Oct 13.
- H8: big pharma posts batches with two-week windows. Kill: no such batch again by Nov 15.
- H10 answered 10-12: Humana and Kaiser (Pasadena Master's Intern analytics, posted Jan to Mar
  last cycle) yes; CVS, Elevance, Molina, UnitedHealth no. Watch Kaiser board from Jan 5.
- H11: device makers post MS clinical-data seats outside her metros first (Alcon). Kill: no device
  MS statistics seat in her metros by Dec 1.

## Exploration queue (never empty)

1. Takeda: jobs.takeda.com/search-jobs/intern, US 2027 intern (dry 10-05, 10-12; next 10-26).
2. Blue Shield Oracle board (10-14).
3. Exponent student page (after 10-15).
4. Neurocrine San Diego: expected Oct to Dec; recheck its board 10-20.
5. Alcon Workday for a California clinical seat (10-17).
6. Jazz: find a working board; Otsuka: no ATS link. LA biotechs: MannKind, Puma, ImmunityBio.
7. Weekly Workday phrase pass (10-15).

## Notes to self

- Xencor, CHLA in the browser weekly (next 10-18).
- Medtronic master's window closes Oct 13; drop it from Later and deadlines on 10-14.
- RAND is in not-a-fit; do not carry its Dec date.
- Out-of-metro exceptions in Open now: Merck, BCBSM, J&J Peds, Alcon. Humana held in Not a fit.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.
- No day counts in prose; dates only. Titles under 60 characters.

## Proposed core changes

- Decide out-of-metro scope: BCBSM, Merck, J&J Peds and Alcon are exceptions; Humana is held.
- Standing dates are stale: Edwards C&R closes Nov 1; RAND excludes biostat MS students; Amgen grad
  DS has no deadline; Analysis Group Generalist deadline passed.
- `sweep_boards.py`: add Stryker, Denali (`dnli.wd1`, five sites), Corcept (greenhouse
  `corcepttherapeutics`), BCBSM (oraclehcm `ejko.fa.us2.oraclecloud.com|CX_3|intern`), Blue Shield
  (oraclehcm `ecge.fa.us2.oraclecloud.com|CX_1003|intern`), Humana
  (`humana.wd5|humana|Humana_External_Career_Site`), Xencor (Dayforce); `--help` should exit.
- `fetch_posting_text.py`: skip writing when a fetch fails.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
