# Research playbook

**v24, 2026-10-23.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows on the page 7+ runs: 15 of 17 on 10-23; six since 09-28. 0 recorded ever; 10 closed
unrecorded. Diagnoses used: shape, cost, materials, recording gap, the cut, warm route (10-18),
cost escalation (10-20), AG HC countdown (10-21, 10-22). 10-23: `/api/apps` went live
(`configured:true`, writable) with no manual rows and no ticks, so the lead states 0 sent and asks
for ticks. Do not repeat it; 10-24 leads with the Oct 28 step only. If any row shows as sent,
lead with the next warm lead instead.

## Sunday review (10-18; next 10-25)

- Metro order still right. In-metro fits: Irvine (Stryker, Edwards), LA (AG HC), La Jolla or
  virtual (J&J SDS, Clin Pharm), remote (Amgen DS, J&J Market Access).
- Underused skill: R Shiny app against J&J SDS's "building software for statistical analyses".
- Biggest gap: nothing recorded, so sent and unsent look the same. Second: no warm contact used.

## What is working (last confirmed 2026-10-23)

- Reading the body of every row the sweep tags a device "intern", even engineering-looking
  ones: BSC Graduate Clinical Insights Research Intern (RWE, MS epi/biostat, Maple Grove) was
  found 10-23 by diffing the sweep against last night and fetching the body.
- Workday phrase pass (`phr.py`, 8 phrases x 12 tenants): found J&J Market Access 10-22. Mon, Thu.
- Liveness via Workday `cxs` with curl nightly (`live.py`); iCIMS `?in_iframe=1` for AG;
  Oracle HCM REST for BCBSM 14837 and Blue Shield.
- Sweep diff by URL against last night's backup (`kdiff.py`). Back up `sweep-latest.json`,
  `kenzie.json`, `ledger.json`, `apply-archive.json` and `postings-text` first. Copy helpers
  (`live.py`, `kdiff.py`, `phr.py`, `up<date>.py` as template) from the newest scratchpad.
- Eightfold body: `bostonscientific.eightfold.ai/api/apply/v2/jobs/<id>?domain=bostonscientific.com`.

## What is not working

- 0 applications recorded across 23 runs; done file empty since 09-16.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- `fetch_posting_text.py` stubs AG x2 and BCBSM nightly. Restore from backup.
- Bash heredocs with long Python bodies break; write scripts with the Write tool.
- Carried text goes stale. Grep kenzie.json for last night's date before writing.
- Denali Internships page is JS accordions; innerText hides the answers. Do not chase.

## Targets

- Oct 28 AG HC; Oct 30 Merck OR, J&J Onc Epi, Gilead Biomarker; Oct 31 Merck biostat; Nov 1
  Edwards C&R; Nov 9 J&J C&SP; Nov 13 J&J SDS; Nov 20 J&J Clin Pharm; Dec 18 Alcon; Jan 8 J&J
  Market Access. Stryker, BSC rolling.
- Watch: Corcept biostat (by Jan), Kite grad (Oct to Jan), Pfizer list (next 10-24), Amgen R&D
  biostat, Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb).

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team is faster than recruiters. Kill: no second alum lead by Nov 1.
- H11: device makers post MS clinical-data seats outside her metros first (BSC supports it).
  Kill: no in-metro device MS statistics seat by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H13: she is applying but not recording. Kill: a tick or hand row appears in `/api/apps`, or
  she says none went out.
- H14: big-pharma graduate seats outside J&J, Merck, Gilead, Amgen are MBA or undergraduate only.
  Kill: one posts an MS statistics summer seat before Dec 1.
- H15: sweep keyword filters miss market access, HEOR and RWE titles. Kill: two more phrase
  passes find nothing the sweep missed (10-23 pass: none, count 1 of 2).

## Exploration queue (never empty)

1. Phrase pass with HEOR words: "market access", "health economics", "summer associate",
   "value evidence" on the 12 tenants plus Merck and Pfizer (10-26).
2. IQVIA RWE and Otsuka (Princeton, San Diego) and Teva US intern boards (10-27).
3. Boston Scientific eightfold search for "real world", "clinical research" (10-28).
4. Medtronic and Abbott diabetes RWE interns; Exponent iCIMS 11-01; MannKind Paycor 11-01.
- Done 10-23: Takeda (no US intern), Flatiron (22 roles, none). Closed.

## Notes to self

- Out-of-metro rows in Open now: BSC, Alcon, Merck x2, J&J Onc Epi, J&J C&SP, BCBSM.
- RAND and BRG are in not-a-fit; do not carry their dates.
- Mueller: no pronouns on the page; name only.
- TGen Helios URL 404 since 10-20; genomics, do not chase.
- With `/api/apps` live, state counts as fact; ticks count as sent.

## Proposed core changes

- Standing dates in the task file are stale: Gilead/Kite and Henry Ford Oct 16 passed; RAND
  excludes biostat MS; Amgen grad DS has no deadline; AG Generalist passed.
- Decide out-of-metro scope: seven rows sit in Open now.
- Let long-dry BLOCKED boards (Xencor, CHLA, Denali: 14+ dry runs) move to weekly.
- `sweep_boards.py`: add "market access", "summer associate" to J&J; add Stryker, Denali,
  Corcept, BCBSM, Blue Shield, Humana, Xencor, MannKind; fix TGen browser_url.
- `fetch_posting_text.py`: skip writing on a failed fetch; `?in_iframe=1` for iCIMS.
