# Research playbook

**v22, 2026-10-21.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. 10-21: 12 of 15 (8 since 10-01, 21 runs); 0 recorded ever; 10 closed
unrecorded. Diagnoses used: shape, cost, materials, recording gap, the cut, warm route (10-18),
cost escalation (10-20). 10-21: watch night, numbers plus the Oct 28 step only. Keep watching
through Oct 28. If AG HC closes unsent, report the number only. If any row shows as sent, lead
with the next warm lead instead.

## Sunday review (10-18; next 10-25)

- Metro order still right. In-metro fits: Irvine (Stryker, Edwards), LA (AG HC), La Jolla or
  virtual (J&J SDS, Clin Pharm), remote (Amgen DS).
- Underused skill: R Shiny app against J&J SDS's "building software for statistical analyses".
- Biggest gap: nothing recorded, so sent and unsent look the same. Second: no warm contact used.

## What is working (last confirmed 2026-10-21)

- Liveness via Workday `cxs` with curl every night (`live.py`): caught IMM Peds close (10-20),
  J&J Onc Epi date move (10-18), Gilead early close (10-14).
- Sweep diff by URL against last night's backup (`kdiff.py`). Back up `sweep-latest.json`,
  `kenzie.json` and `postings-text` before running anything. Helpers live in older scratchpads;
  copy the newest `live.py`, `kdiff.py`, `urls.py` forward.
- iCIMS (Analysis Group, Pfizer list) by curl with `?in_iframe=1`; Oracle HCM REST for BCBSM
  14837 and Blue Shield `findReqs;siteNumber=CX_1003,keyword=intern`.
- Read the body of every new graduate-sounding row: Amgen R-257124 and Genentech PTD Digital
  Sciences looked close and failed on the body (10-21).

## What is not working

- 0 applications recorded across 21 runs. `/api/apps` answers 501; done file empty since 09-16.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- `fetch_posting_text.py` stubs AG x2 and BCBSM every night. Restore from backup.
- Carried text goes stale. Grep for old dates before writing (10-21: two lines caught).

## Targets

- Oct 28 AG HC; Oct 30 Merck OR, J&J Onc Epi, Gilead Biomarker; Oct 31 Merck biostat; Nov 1
  Edwards C&R; Nov 9 J&J C&SP; Nov 13 J&J SDS; Nov 20 J&J Clin Pharm; Dec 18 Alcon. Stryker rolling.
- Watch: Corcept biostat (by Jan), Kite grad (Oct to Jan; 40 roles, no intern 10-21), Pfizer list
  (every 3rd night, next 10-24), Amgen R&D biostat, Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team is a faster route than recruiters. Kill: no second alum lead
  by Nov 1.
- H8 confirmed 10-13 to 10-20: J&J posts batches with one-to-three-week windows.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: no in-metro
  device MS statistics seat by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H13: she is applying but not recording. Kill: she reports a sent application that the page
  still lists, or confirms none went out.
- H14 (new): big-pharma 2027 graduate seats outside J&J, Merck, Gilead and Amgen are MBA or
  undergraduate only (AbbVie, Genentech, Regeneron so far). Kill: one such firm posts an MS
  statistics summer seat before Dec 1.

## Exploration queue (never empty)

1. UMich biostat department student or alumni spotlight pages naming internship employers (10-22).
2. Weekly Workday phrase pass (10-22).
3. Takeda jobs.takeda.com/search-jobs/intern (10-26).
4. Flatiron Health and IQVIA RWE US intern boards (10-27).
5. Glaukos Oracle 11-15; Exponent iCIMS 11-01; MannKind Paycor 11-01.
6. Otsuka (Princeton and San Diego) and Teva US intern boards (10-29).
- Done 10-21: AbbVie (undergrad and MBA only), Neurocrine via sweep (51 roles, 0 intern), Blue
  Shield weekly (2 seats, unchanged).

## Notes to self

- Out-of-metro rows in Open now: Alcon, Merck x2, J&J Onc Epi, J&J C&SP, BCBSM. Humana held.
- RAND and BRG are in not-a-fit; do not carry their dates.
- Pfizer program: move to Open now only when its list shows a Statistics req.
- Mueller: use no pronouns on the page; name only.
- TGen Helios URL 404 since 10-20; genomics, do not chase a new URL unless the sweep gets one.

## Proposed core changes

- Standing dates in the task file are stale: Gilead/Kite Oct 16 and Henry Ford Oct 16 have
  passed; RAND excludes biostat MS students; Amgen grad DS has no deadline; AG Generalist passed.
- Decide out-of-metro scope: six rows sit in Open now.
- Let the playbook move long-dry BLOCKED boards (Xencor, CHLA, Denali: 13+ dry runs) to weekly.
- `sweep_boards.py`: add Stryker, Denali, Corcept, BCBSM, Blue Shield, Humana, Xencor, MannKind;
  fix TGen browser_url (404).
- `fetch_posting_text.py`: skip writing on a failed fetch; use `?in_iframe=1` for iCIMS.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
