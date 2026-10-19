# Research playbook

**v20, 2026-10-19.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. 10-19: 12 of 16 (8 since 10-01, 19 runs); 0 recorded ever; 9 closed
Oct 16 unrecorded. Diagnoses used: shape, cost, materials, recording gap, the cut, warm route
(10-18). 10-19: numbers only, Oct 20 close named. Next: watch; after Oct 20 passes, the item is
what that close cost (escalate once), then drop. If Mueller or J&J SDS shows as sent, lead with
the next warm lead instead.

## Sunday review (10-18; next 10-25)

- Metro order: still right. The fitting in-metro seats are Irvine (Stryker, Edwards), LA (AG HC)
  and La Jolla/virtual (J&J SDS, IMM Peds, Clin Pharm).
- Underused skill: the J&J SDS req names building software for statistical analyses; her R
  Shiny app is the direct match. Survival analysis fits J&J Onc Epi's "closely related".
- Biggest gap: no person attached to any application. Tonight touched it (first employer-side
  name). Second gap: nothing recorded, so the page cannot tell sent from unsent.
- Xencor/CHLA/Denali browser reads: dry 9+ runs, but the core requires every BLOCKED board
  nightly; reverted 10-19 (about five browser calls). Proposed core change below.
- Three observables that change strategy: (1) any row shows as sent; (2) a CRO posts a US
  biostat intern; (3) J&J SDS closes early or extends.

## What is working (last confirmed 2026-10-18)

- Liveness via Workday `cxs` with curl every night: caught J&J Onc Epi close moving Oct 23 to
  Oct 30 (10-18), Gilead early close (10-14). Keep.
- Sweep diff by URL against last night's backup (`kdiff.py`, copy forward): J&J batches 10-13,
  10-14, 10-16. Back up `sweep-latest.json` before running the sweep.
- iCIMS (Analysis Group) by curl with `?in_iframe=1`, also to re-save bodies (10-18).
- Oracle HCM REST by curl: BCBSM 14837 (10-18). SmartRecruiters for Henry Ford, Lever for Penumbra.
- Reading the body kills title traps: Amgen grad DS ranks below trials rows (IT/CS preferred).
- Her own folder holds leads: `kenzie\MEMORY.md` named the J&J SDS alum. Re-read it on Sundays.

## What is not working

- 0 applications recorded across 19 runs. `/api/apps` answers 501; done file empty since 09-16.
- Python `urllib` fails on an expired certificate (10-18). Use curl via subprocess. `py -3 -I`
  ignores PYTHONIOENCODING; use `-X utf8`.
- `fetch_posting_text.py` stubs AG and BCBSM every night. Back up first; re-save by curl.
- Carried text goes stale. Grep for "tonight", "today", old dates before writing.

## Targets

- Oct 20 J&J IMM Peds; Oct 28 AG HC; Oct 30 Merck OR, J&J Onc Epi, Gilead Biomarker; Oct 31
  Merck biostat; Nov 1 Edwards C&R; Nov 9 J&J C&SP; Nov 13 J&J SDS; Nov 20 J&J Clin Pharm;
  Dec 18 Alcon. Stryker rolling.
- Watch: Corcept biostat (by Jan), Kite grad (Oct to Jan; board empty 10-18), Pfizer list
  (every 3rd night, next 10-21), Amgen R&D biostat, Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4 (revised 10-18): a peer inside a target team is a faster route than recruiters. Kill: no
  second alum lead by Nov 1.
- H8 confirmed 10-13, 10-14, 10-16, 10-18: J&J posts batches and moves close dates.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: no in-metro
  device MS statistics seat by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H6 killed 10-17: the three-row shortlist did not get anything recorded.

## Exploration queue (never empty)

1. Evidation and Aetion real boards from their careers pages in the browser (10-20).
2. Neurocrine San Diego board (10-21).
3. UMich biostat department student or alumni spotlight pages naming internship employers
   (10-22). Web search for alumni portfolios at Gilead/Amgen/Edwards was dry 10-19.
4. Takeda jobs.takeda.com/search-jobs/intern (10-26).
5. Glaukos Oracle 11-15; Exponent iCIMS 11-01; MannKind Paycor 11-01.
6. Weekly Workday phrase pass (next 10-22); Blue Shield Oracle weekly (next 10-21).

## Notes to self

- Out-of-metro rows in Open now: Alcon, Merck x2, J&J Onc Epi, J&J C&SP, BCBSM. Humana held.
- RAND is in not-a-fit; do not carry its Dec date. BRG is in not-a-fit (past final review).
- Pfizer program: move to Open now only when its list shows a Statistics req.
- Mueller: use no pronouns on the page; name only.
- No day counts in prose; dates only. Titles under 60 characters.

## Proposed core changes

- Standing dates in the task file are stale: Gilead/Kite Oct 16 and Henry Ford Oct 16 have
  passed (row dropped 10-18); RAND excludes biostat MS students; Amgen grad DS has no deadline;
  AG Generalist deadline passed.
- Decide out-of-metro scope: six rows sit in Open now.
- Let the playbook move long-dry BLOCKED boards (Xencor, CHLA, Denali: 9+ dry runs) to weekly.
  Denali's page links five `dnli.wd1` Workday sites; add them to the sweep instead.
- `sweep_boards.py`: add Stryker, Denali, Corcept (greenhouse `corcepttherapeutics`), BCBSM,
  Blue Shield, Humana, Xencor, MannKind; `--help` should exit.
- `fetch_posting_text.py`: skip writing on a failed fetch; use `?in_iframe=1` for iCIMS.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
- Python certificate store on this machine is expired; scripts that use urllib will fail.
