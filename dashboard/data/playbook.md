# Research playbook

**v8, 2026-10-06.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. Tonight: 7 runs since 10-01, 0 sent, 21 open. The Gilead/Kite batch
crossed 7 runs tonight: the page is failing her. Diagnoses so far: 10-04 shape (First three),
10-05 cost (one-sitting ask), 10-06 materials (no cover letter; three top rows need one). 10-07:
do not repeat; watch. 10-10 with zero: cut Start to one row and one link.

## What is working (last confirmed 2026-10-06)

- Workday `cxs` job endpoint by curl (Python urllib fails on an expired CA store; shell out to
  curl): `endDate`, body, liveness. In Git Bash no leading slash on job paths.
- Diffing tonight's sweep against last night's by URL: found the J&J IMM batch on its day one.
- Reading the body kills title traps (J&J Discovery and Translational are lab seats, 10-06).
- iCIMS (Analysis Group, Pfizer) in the browser via `icims_content_iframe`.
- Oracle HCM REST reads Oracle boards by curl (BCBSM 10-04 and 10-06, Cytel 10-06).
- Careers-page link scrape finds the real ATS: Denali (5 `dnli.wd1` sites), Cytokinetics
  (`cytokinetics.wd1`), 10-06. Cytel is already in the sweep.
- Backing up postings-text before `fetch_posting_text.py`, restoring stubs under 1.5 KB.
- `--out` with forward slashes in Git Bash (10-06 clean).

## What is not working

- 0 applications recorded across 7 runs. `/api/apps` answers 501, so ticks never arrive.
- Employer-side named people: zero. Weekly at most.
- `sweep_boards.py --help` starts a full sweep. Never probe it.
- Jazz Workday cxs (`vhr-jazz`) did not answer; Certara's iCIMS host is an employee login.
- Bash heredocs with apostrophes in Python strings broke once (10-06): write scripts with the
  Write tool, then run.

## Targets

- First three: Kite CDM (Oct 16), Stryker Irvine (rolling), Analysis Group HC (Oct 28).
- Then: Henry Ford (Oct 16), Gilead RWE and both Biostatistics, BRG (Oct 16), J&J Peds Clinical
  Dev (Oct 20), Edwards C&R (Nov 1).
- Watch for posting: Corcept biostat intern (by Jan), Kite stats grad (Oct to Jan), Pfizer
  positions list (empty 10-06), Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb).

## Hypotheses

- H1: one-sitting framing gets a Gilead application out. Kill: nothing recorded by Oct 8.
- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a university contact yields an employer name faster than search. Kill: none by Oct 31.
- H6: a three-row shortlist gets a first application recorded. Kill: nothing by Oct 10.
- H7 (new): the blocker is the cover letter. Kill: Henry Ford still unsent on Oct 13.
- H8 (new): big pharma posts batches with two-week windows (J&J IMM, Oct 5 to 20); nightly
  diffing catches them, weekly passes would not. Kill: no such batch again by Nov 15.

## Exploration queue (never empty)

1. City of Hope Taleo (maintenance 10-06): retry 10-07.
2. Add Denali and Cytokinetics to the nightly curl list (endpoints above) until the sweep has them.
3. Exponent student page after Oct 15.
4. Health plans by Oracle REST: Kaiser Health Plan analytics, Blue Shield.
5. Takeda: recheck jobs.takeda.com for a US 2027 intern (next 10-12).
6. Jazz: find a working board (cxs failed); Otsuka: careers page shows no ATS link.
7. J&J IMM Infectious Disease or Oncology batches at La Jolla: phrase search `IMM` on jj.wd5.

## Notes to self

- Phrase pass on all Workday boards weekly (next 10-08); small LA biotechs weekly (next 10-09).
- Xencor, CHLA in the browser weekly (next 10-11). Denali is now curl, not browser.
- RAND is in not-a-fit; do not carry its Dec date.
- Medtronic master's window closes Oct 13; no CA or AZ seat. Drop from Later after Oct 13.
- Out-of-metro exceptions: Merck Biostatistics, BCBSM, J&J Peds (La Jolla is listed but its
  dates are for quarter-system schools). No more without a yes.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.
- Henry Ford row title shortened to fit 60 chars; id unchanged.

## Proposed core changes

- Decide Detroit scope: BCBS Michigan is listed last as an exception. Keep, widen to Michigan
  health plans, or remove.
- Standing dates are stale: Edwards Clinical & Regulatory runs Sep to Oct (Req-49745 closes
  Nov 1); RAND excludes biostat MS students; Amgen grad DS has no deadline.
- `sweep_boards.py`: add Stryker, Denali (`dnli.wd1`, 5 sites), Corcept (greenhouse
  `corcepttherapeutics`), BCBSM (oraclehcm `ejko.fa.us2.oraclecloud.com|CX_3|intern`),
  Cytokinetics (workday `cytokinetics.wd1|cytokinetics|Cytokinetics`); make `--help` print and exit.
- `fetch_posting_text.py`: skip writing when a fetch fails, so saved bodies are not lost.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
