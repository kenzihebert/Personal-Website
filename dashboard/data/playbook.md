# Research playbook

**v10, 2026-10-08.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. Tonight: 9 runs since 10-01, 0 sent, 20 open, all live. The
Gilead/Kite batch is at 9 runs. Diagnoses so far: 10-04 shape, 10-05 cost, 10-06 materials,
10-07 recording gap. 10-08: numbers only, no diagnosis (done). 10-10 with zero recorded: cut
Start to one row and one link. 10-17: whatever closed Oct 16 unsent gets named in the log, not
on the page.

## What is working (last confirmed 2026-10-08)

- Workday `cxs` job endpoint by curl: `endDate`, body, liveness (17 rows in one script, 10-07).
  Centene's cxs job path answers 403 while its `jobs` search works: use search for Centene.
- Workday `jobs` POST search by curl (`searchText`), 10-08: 10 boards x 6 phrases in one script.
  The same call from Python subprocess failed on jj and gilead once; plain curl in bash worked.
- Diffing tonight's sweep against last night's by URL (24 new rows triaged in a minute).
- Reading the body kills title traps (Blue Shield Actuarial, Centene Public Health, 10-07).
- iCIMS (Analysis Group, Pfizer) in the browser: `#icims_content_iframe` innerText via JS;
  `get_page_text` returns only the sidebar. Use `/jobs/<id>/job`; the slug URL gave a 504.
- Oracle HCM REST reads Oracle boards by curl: BCBSM, Cytel, and now Blue Shield
  (`ecge.fa.us2.oraclecloud.com|CX_1003`, found from the careers page link scrape, 10-07).
- Careers-page link scrape finds the real ATS (Denali, Cytokinetics, Blue Shield).
- Backing up postings-text before `fetch_posting_text.py`, restoring stubs under 1.5 KB.
- `--out` with forward slashes in Git Bash.

## What is not working

- 0 applications recorded across 9 runs. `/api/apps` answers 501, so ticks never arrive.
- The sweep's Kite list dropped the live Kite CDM row on 10-08; trust cxs over the sweep list.
- Denali: site name `Denali_Careers` 404s. Record the five real dnli site names when next found.
- Employer-side named people: zero. Weekly at most.
- `sweep_boards.py --help` starts a full sweep. Never probe it.
- Jazz Workday cxs (`vhr-jazz`, both site names) does not answer; Certara is a login portal.
- Bash heredocs with apostrophes in Python strings break: write scripts with the Write tool.
- Medtronic, Edwards, Pfizer intro and SPH pages are JS or 403 to curl: browser only.

## Targets

- First three: Henry Ford (Oct 16), Kite CDM (Oct 16), Analysis Group HC (Oct 28).
- Then: Gilead RWE and both Biostatistics, BRG (Oct 16), J&J Peds Clinical Dev (Oct 20),
  Stryker (rolling), Edwards C&R (Nov 1).
- Watch for posting: Corcept biostat intern (by Jan), Kite stats grad (Oct to Jan), Pfizer
  positions list (empty 10-07), Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb), Blue Shield
  non-finance seats (October), a Centene graduate analytics repost.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a university contact yields an employer name faster than search. Kill: none by Oct 31.
- H6: a three-row shortlist gets a first application recorded. Kill: nothing by Oct 10.
- H7: the blocker is the cover letter. Kill: Henry Ford still unsent on Oct 13.
- H8: big pharma posts batches with two-week windows; nightly diffing catches them. Kill: no
  such batch again by Nov 15.
- H9 (new): the zero is a recording gap, not an application gap. Kill: she confirms nothing sent.

## Exploration queue (never empty)

1. Blue Shield Oracle board nightly by curl until the sweep has it; other teams post in October.
2. Add Denali and Cytokinetics to the nightly curl list until the sweep has them.
3. Exponent student page after Oct 15.
4. Kaiser Permanente health plan analytics (not R&E): Radancy board shows pharmacy only;
   try phrase `analyst intern` and `master's intern` weekly.
5. Takeda: recheck jobs.takeda.com for a US 2027 intern (next 10-12).
6. Jazz: find a working board; Otsuka: careers page shows no ATS link.
7. Remote health-analytics grad seats: Humana, CVS/Aetna (UnitedHealth closed 10-08: PhD only).
8. Weekly Workday phrase pass (next 10-15); small LA biotechs (next 10-09).

## Notes to self

- Xencor, CHLA in the browser weekly (next 10-11). Denali and City of Hope are curl/sweep now.
- RAND is in not-a-fit; do not carry its Dec date.
- Medtronic master's window closes Oct 13; no statistics seat. Drop from Later after Oct 13.
- Out-of-metro exceptions: Merck Biostatistics, BCBSM, J&J Peds. No more without a yes.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.
- Actuarial seats this cycle (Blue Shield, Centene) want a passed exam or an undergraduate;
  profile row asks her whether she plans to sit one.
- No day counts in prose; dates only. Titles under 60 characters.

## Proposed core changes

- Decide Detroit scope: BCBS Michigan is listed last as an exception. Keep, widen, or remove.
- Standing dates are stale: Edwards C&R runs Sep to Oct (Req-49745 closes Nov 1); RAND excludes
  biostat MS students; Amgen grad DS has no deadline; Analysis Group Generalist deadline passed.
- `sweep_boards.py`: add Stryker, Denali (`dnli.wd1`, 5 sites), Corcept (greenhouse
  `corcepttherapeutics`), BCBSM (oraclehcm `ejko.fa.us2.oraclecloud.com|CX_3|intern`),
  Cytokinetics (`cytokinetics.wd1|cytokinetics|Cytokinetics`), Blue Shield (oraclehcm
  `ecge.fa.us2.oraclecloud.com|CX_1003|intern`), Centene (`centene.wd5|centene|centene_external`);
  make `--help` print and exit.
- `fetch_posting_text.py`: skip writing when a fetch fails, so saved bodies are not lost.
- Bind the `APPS` KV namespace on the Pages project so ticks reach the nightly run.
