# Research playbook

**v12, 2026-10-10.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. Tonight: 11 runs since 10-01, 0 sent, 21 open (Alcon new), all live;
17 rows are past 7 runs. Diagnoses so far: 10-04 shape, 10-05 cost, 10-06 materials, 10-07 recording gap,
10-08 numbers only, 10-09 the cut (Start names three Oct 16 sends, the other seven optional).
10-10 watch, numbers only (done). 10-11 to 10-15: watch; numbers plus the three names. 10-17: name in the log whatever closed Oct 16 unsent; never on the
page.

## What is working (last confirmed 2026-10-10)

- Workday `cxs` job endpoint by curl from a Python script: `endDate`, body, liveness (17 rows).
- Workday `jobs` POST search by curl (`searchText`). Found Humana's grad analytics seat 10-09.
- Diffing tonight's sweep against last night's by URL (15 new 10-10; found Alcon Clinical Data
  Science, Fort Worth). Sweep JSON is `{run, boards:{name:{...lists}}}`; walk every list.
- Reading the body kills title traps (Blue Shield Actuarial, Centene Public Health, 10-07).
- iCIMS (Analysis Group) in the browser: `#icims_content_iframe` innerText via JS. Use
  `/jobs/<id>/job`. Pfizer's list page has no iframe; `get_page_text` shows it empty.
- Oracle HCM REST by curl: BCBSM 14837 (`finder=ById;Id="14837",siteNumber=CX_3`), Cytel,
  Blue Shield.
- Careers-page link scrape in the browser finds the real board (Denali 10-09, Arrowhead 10-09).
- Back up postings-text before `fetch_posting_text.py`; restore stubs under 1.5 KB (AG, BCBSM
  stub every night).
- `--out` with forward slashes in Git Bash. Sweep takes about 6 minutes; run it in background.

## What is not working

- 0 applications recorded across 10 runs. `/api/apps` answers 501, so ticks never arrive.
- The sweep's Kite list omits Kite CDM R0054782 (10-08, 10-09); trust cxs.
- Employer-side named people: zero. Weekly at most.
- Stripping "tonight" by blind replace garbled text 10-09 ("Stated in's postings"). Edit by
  whole sentence.
- Bash heredocs with apostrophes in Python strings break: write scripts with the Write tool.
- Python print to console needs `PYTHONIOENCODING=utf-8` (IQVIA Chinese titles crash cp1252).

## Targets

- This week: Henry Ford, Kite CDM, Gilead RWE (all Oct 16). Then J&J Peds (Oct 20), Analysis
  Group HC (Oct 28), Stryker (rolling), Edwards C&R (Nov 1).
- Watch: Corcept biostat intern (by Jan), Kite stats grad (Oct to Jan), Pfizer positions list
  (empty 10-09), Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb), Denali interns (Oct to Jan,
  five Workday sites: Discovery, Technical_Operations_Manufacturing, Development, Commercial,
  Corporate_Positions), Arrowhead Biostats & Data Management (Pasadena).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a university contact yields an employer name faster than search. Kill: none by Oct 31.
- H6: a three-row shortlist gets a first application recorded. Test started 10-09. Kill:
  nothing recorded by Oct 17.
- H7: the blocker is the cover letter. Kill: Henry Ford still unsent on Oct 13.
- H8: big pharma posts batches with two-week windows; nightly diffing catches them. Kill: no
  such batch again by Nov 15.
- H9: the zero is a recording gap. Kill: she confirms nothing sent.
- H10: large health plans run graduate analytics programs that take MS biostat (Humana does,
  on-site). CVS/Aetna and Elevance: none, 10-10. Kill: Kaiser health plan and Molina none by Oct 23.
- H11 (new): device makers post MS clinical-data seats outside her metros first (Alcon Fort
  Worth 10-09). Kill: no device MS statistics seat in her metros by Dec 1.

## Exploration queue (never empty)

1. Molina graduate analytics seat (was undergrad last read), next 10-11.
2. Alcon Lake Forest: watch its Workday for a California clinical seat (weekly, next 10-17).
3. Blue Shield Oracle board weekly (next 10-14); other teams post in October.
4. Exponent student page after Oct 15.
5. Takeda: recheck jobs.takeda.com for a US 2027 intern (next 10-12).
6. Jazz: find a working board; Otsuka: careers page shows no ATS link.
7. Weekly Workday phrase pass (next 10-15). Other LA biotechs: MannKind (no ATS link found),
   Puma, ImmunityBio.

## Notes to self

- Xencor, CHLA in the browser weekly (next 10-11).
- RAND is in not-a-fit; do not carry its Dec date.
- Medtronic master's window closes Oct 13; drop it from Later and the deadline strip on 10-14.
- Out-of-metro exceptions in Open now: Merck Biostatistics, BCBSM, J&J Peds. Humana went to
  Not a fit with an offer to move it; follow her answer.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.
- Actuarial seats this cycle want a passed exam or an undergraduate.
- No day counts in prose; dates only. Titles under 60 characters. When carrying text forward,
  strip "tonight" and "posted today" from rows not re-read.

## Proposed core changes

- Decide Detroit and out-of-metro scope: BCBSM, Merck, J&J Peds and Alcon are exceptions; Humana
  (exact body fit, Chicago or New York hubs) is held in Not a fit. Keep, widen, or remove.
- Standing dates are stale: Edwards C&R runs Sep to Oct (Req-49745 closes Nov 1); RAND excludes
  biostat MS students; Amgen grad DS has no deadline; Analysis Group Generalist deadline passed.
- `sweep_boards.py`: add Stryker, Denali (`dnli.wd1`, five sites above), Corcept (greenhouse
  `corcepttherapeutics`), BCBSM (oraclehcm `ejko.fa.us2.oraclecloud.com|CX_3|intern`),
  Cytokinetics, Blue Shield (oraclehcm `ecge.fa.us2.oraclecloud.com|CX_1003|intern`), Centene,
  Humana (`humana.wd5|humana|Humana_External_Career_Site`); make `--help` print and exit.
- `fetch_posting_text.py`: skip writing when a fetch fails, so saved bodies are not lost.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
