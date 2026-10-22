# Research playbook

**v23, 2026-10-22.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows on the page 7+ runs: 15 of 16 on 10-22; six since 09-28. 0 recorded ever; 10 closed
unrecorded. Diagnoses used: shape, cost, materials, recording gap, the cut, warm route (10-18),
cost escalation (10-20). 10-21 and 10-22: watch nights, numbers plus the Oct 28 step. Keep
watching through Oct 28. If AG HC closes unrecorded, report the number only. If any row shows as
sent, lead with the next warm lead instead.

## Sunday review (10-18; next 10-25)

- Metro order still right. In-metro fits: Irvine (Stryker, Edwards), LA (AG HC), La Jolla or
  virtual (J&J SDS, Clin Pharm), remote (Amgen DS, J&J Market Access).
- Underused skill: R Shiny app against J&J SDS's "building software for statistical analyses".
- Biggest gap: nothing recorded, so sent and unsent look the same. Second: no warm contact used.

## What is working (last confirmed 2026-10-22)

- Workday phrase pass (`phr.py`, 8 phrases x 12 tenants, diff against ledger and sweep): found
  J&J Global Market Access R-101873 on 10-22, remote, posted 09-30, missed by the sweep for three
  weeks. Run it twice a week now (Mon, Thu), not weekly.
- Liveness via Workday `cxs` with curl every night (`live.py`): caught IMM Peds close (10-20),
  J&J Onc Epi date move (10-18), Gilead early close (10-14).
- Sweep diff by URL against last night's backup (`kdiff.py`). Back up `sweep-latest.json`,
  `kenzie.json`, `ledger.json`, `apply-archive.json` and `postings-text` first. Helpers live in
  older scratchpads; copy the newest `live.py`, `kdiff.py`, `phr.py`, `ledger1022.py` forward.
- iCIMS (Analysis Group, Pfizer list) by curl with `?in_iframe=1`; Oracle HCM REST for BCBSM
  14837 and Blue Shield `findReqs;siteNumber=CX_1003,keyword=intern`.
- Read the body of every graduate-sounding row: J&J RWE & Modeling (10-22) and Amgen R-257124
  (10-21) looked close and failed on the body.

## What is not working

- 0 applications recorded across 22 runs. `/api/apps` answers 501; done file empty since 09-16.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- `fetch_posting_text.py` stubs AG x2 and BCBSM every night. Restore from backup.
- Bash heredocs with long Python bodies can break; write scripts with the Write tool.
- Carried text goes stale. Grep kenzie.json for last night's date before writing (10-22: Kite x2).

## Targets

- Oct 28 AG HC; Oct 30 Merck OR, J&J Onc Epi, Gilead Biomarker; Oct 31 Merck biostat; Nov 1
  Edwards C&R; Nov 9 J&J C&SP; Nov 13 J&J SDS; Nov 20 J&J Clin Pharm; Dec 18 Alcon; Jan 8 J&J
  Market Access. Stryker rolling.
- Watch: Corcept biostat (by Jan), Kite grad (Oct to Jan; 40 roles, no intern 10-22), Pfizer list
  (every 3rd night, next 10-24), Amgen R&D biostat, Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team is a faster route than recruiters. Kill: no second alum lead
  by Nov 1.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: no in-metro
  device MS statistics seat by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H13: she is applying but not recording. Kill: she reports a sent application that the page
  still lists, or confirms none went out.
- H14: big-pharma 2027 graduate seats outside J&J, Merck, Gilead and Amgen are MBA or
  undergraduate only (AbbVie, Genentech, Regeneron so far). Kill: one such firm posts an MS
  statistics summer seat before Dec 1.
- H15 (new): the sweep's per-board keyword filters miss market access and HEOR titles that say
  "Summer Associate". Kill: two more phrase passes find nothing the sweep missed.

## Exploration queue (never empty)

1. Phrase pass with HEOR words: "market access", "health economics", "summer associate",
   "value evidence" on the same 12 tenants plus Merck and Pfizer (10-26).
2. Takeda jobs.takeda.com/search-jobs/intern (10-26).
3. Flatiron Health and IQVIA RWE US intern boards (10-27).
4. Otsuka (Princeton and San Diego) and Teva US intern boards (10-29).
5. Glaukos Oracle 11-15; Exponent iCIMS 11-01; MannKind Paycor 11-01.
- Done 10-22: Workday phrase pass (1 fit); UMich biostat spotlight pages (dry, SPH page 403;
  do not retry, the placement page was answered 10-01).

## Notes to self

- Out-of-metro rows in Open now: Alcon, Merck x2, J&J Onc Epi, J&J C&SP, BCBSM. Humana held.
- RAND and BRG are in not-a-fit; do not carry their dates.
- Pfizer program: move to Open now only when its list shows a Statistics req.
- Mueller: use no pronouns on the page; name only.
- TGen Helios URL 404 since 10-20; genomics, do not chase a new URL unless the sweep gets one.
- While `/api/apps` is 501, write "if not sent yet", never an application count.

## Proposed core changes

- Standing dates in the task file are stale: Gilead/Kite Oct 16 and Henry Ford Oct 16 have
  passed; RAND excludes biostat MS students; Amgen grad DS has no deadline; AG Generalist passed.
- Decide out-of-metro scope: six rows sit in Open now.
- Let the playbook move long-dry BLOCKED boards (Xencor, CHLA, Denali: 14+ dry runs) to weekly.
- `sweep_boards.py`: add "market access" and "summer associate" to the J&J query (it missed
  R-101873); add Stryker, Denali, Corcept, BCBSM, Blue Shield, Humana, Xencor, MannKind; fix
  TGen browser_url (404).
- `fetch_posting_text.py`: skip writing on a failed fetch; use `?in_iframe=1` for iCIMS.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
