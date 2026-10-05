# Research playbook

**v7, 2026-10-05.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. Tonight: 6 logged runs since 10-01, 0 sent, 19 open. The Oct 16 rows hit
7 runs tomorrow. 10-04 changed shape (First three); 10-05 escalated once with the cost (9 of 19
rows gone after Oct 16) and a one-sitting ask (Kite + Gilead RWE). 10-06: do not repeat it; watch.
If still zero on 10-10: cut Start to one row and one link.

## What is working (last confirmed 2026-10-05)

- Workday `cxs` job endpoint by curl: `endDate`, body, liveness. In Git Bash pass the job path
  without a leading slash (MSYS rewrites it).
- Reading the body kills title traps (Stryker Regulatory Affairs, 10-04).
- iCIMS (Analysis Group, Pfizer program) in the browser via `icims_content_iframe`.
- Oracle HCM REST (`recruitingCEJobRequisitions`, `...Details`) reads Oracle boards by curl:
  BCBS Michigan found and read this way 10-04.
- Greenhouse `boards-api.greenhouse.io/v1/boards/<slug>/jobs` for off-sweep biotechs.
- Two generic web queries every 3 days: dry three nights, then two real leads 10-04.
- Takeda's real board is jobs.takeda.com (Radancy `search-jobs/results`), readable by curl (10-05).
- Backing up the Analysis Group postings-text files before `fetch_posting_text.py`.

## What is not working

- 0 applications recorded across 5 runs. `/api/apps` answers 501, so ticks never arrive.
- Employer-side named people: zero in 4 runs. Nightly search killed; weekly at most.
- `sweep_boards.py --help` starts a full sweep. Never probe it; the flags are in its header.
- In Git Bash pass `--out` with forward slashes; backslashes were stripped 10-05 and the file
  landed in his repo root (moved, not committed).
- Greenhouse guesses for Cytokinetics, Arcus, Jazz, Otsuka, Certara, Cytel: no boards (10-05).
- Device boards beyond Edwards and Stryker: dead (H2).

## Targets

- First three: Kite CDM (Oct 16), Stryker Irvine (rolling), Analysis Group HC (Oct 28).
- Then: Gilead RWE and both Biostatistics, BRG (Oct 16), Edwards C&R (Nov 1).
- Watch for posting: Corcept biostat intern (by Jan), Kite stats grad (Oct to Jan), Pfizer
  positions list (empty 10-04), Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb).

## Hypotheses

- H1: one-sitting framing gets a Gilead application out. Kill: nothing recorded by Oct 8.
- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a university contact yields an employer name faster than search. Kill: none by Oct 31.
- H5: no new fitting row in her metros before Oct 16. Alive (BCBSM is Detroit).
- H6 (new): a three-row shortlist gets a first application recorded where 18 rows did not.
  Kill: nothing recorded by Oct 10.

## Weekly review, Sunday 10-04

- Metro order: keep. Supply tonight is LA 3, OC 2, Bay 7, SD 2, Phoenix 0, remote 2, outside 2.
  The best master's fits are OC (Stryker, Edwards); the volume is Bay Area.
- Underused skill: survival analysis and R Shiny. Tied survival to Gilead Biostatistics Oncology
  tonight; Shiny and Tableau belong on the BCBSM, Centene and Medical Affairs rows next.
- Biggest thing between her and an offer: nothing sent. Tonight touched it (shortlist). Second:
  no contact inside an employer.
- Killed: nightly named-contact search on postings (4 runs, nothing).
- Observables that change strategy: any row in `kenzie-done.json` or `/api/apps`; Oct 17 with
  zero sent (pivot to the winter wave and the contact route); the SAS class end date.

## Exploration queue (never empty)

1. BCBSM siblings unread: Data Analytics HEDIS (14838), Program Performance (14841).
2. Exponent student page after Oct 15.
3. Health plans by Oracle REST: Kaiser Health Plan analytics, Molina actuarial, Blue Shield.
4. Cytokinetics, Jazz, Otsuka: find their real ATS from each careers page (not Greenhouse).
5. Takeda: recheck jobs.takeda.com for a US 2027 intern weekly (next 10-12).
6. Cytel and Certara careers pages directly.

## Notes to self

- Phrase pass on all Workday boards weekly (next 10-08); small LA biotechs weekly (next 10-09).
- Denali, Xencor, CHLA in the browser weekly (next 10-11).
- RAND is in not-a-fit; do not carry its Dec date.
- Medtronic master's window closes Oct 13; no CA or AZ seat.
- Out-of-metro exceptions on the page: Merck Biostatistics, BCBSM. No more without a yes.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.

## Proposed core changes

- Decide Detroit scope: BCBS Michigan (private nonprofit health plan, hybrid, master's
  preferred) is listed last as an exception. The core names Henry Ford as the only Detroit
  employer. Keep, widen to Michigan health plans, or remove.
- Standing dates are stale: Edwards Clinical & Regulatory runs Sep to Oct (Req-49745 closes
  Nov 1); RAND excludes biostat MS students; Amgen grad DS has no deadline.
- Blocked boards with three dry nights (Denali, Xencor, CHLA): allow weekly, not nightly.
- `sweep_boards.py`: add Stryker, Denali (`dnli.wd1`, 5 sites), Corcept (greenhouse
  `corcepttherapeutics`), BCBSM (oraclehcm `ejko.fa.us2.oraclecloud.com|CX_3|intern`); add
  `summer 2027` and `clinical` to the Edwards terms; make `--help` print and exit.
- `fetch_posting_text.py`: skip writing when a fetch fails, so saved bodies are not lost.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
