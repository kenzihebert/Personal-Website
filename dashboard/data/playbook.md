# Research playbook

**v38, 2026-11-07.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent 7+ runs in Open now, counted from `apply-archive.json` `first_listed`: 10 of 20 on 11-07
(AG Generalist since 09-28, J&J C&SP 10-13, J&J Market Access 10-22, BSC 10-23, BMS 10-27, Moderna x2 and
Jefferson 10-28, Regeneron x2 10-29). Sends in the last 7 days: 2; last 14: 4 (store: 20 sent, 16 waiting,
4 rejected, no interview). Read the store with `curl -s https://mckenziehebert.com/api/apps`.
Diagnosis 11-07: Pfizer sent the same day it topped the page; page finding seats is the limit; send Highmark next.
Next diagnosis on a change only: a send, an outcome, a close, or Nov 19 passing.
Used and dropped: unsent seats vanishing (10-30 to 11-01), Northeast question, record outcomes (11-02),
send rate / East Coast decision (11-03), four dated East Coast seats (11-04, 11-05), Pfizer late (11-06).

## Sunday review (11-01; next 11-08)

- Metro order still right; the thin spot is in-metro MS statistics seats. Remote health plan seats help (Highmark).
- Underused skill: R Shiny app; Genmab C&SP names it as preferred.
- Strategy-changing observables: a US CRO biostat intern (H3); an in-metro device MS stats seat (H11); an interview in the store.

## What is working (last confirmed 2026-11-07)

- Simplify tracker (`raw.githubusercontent.com/SimplifyJobs/Summer2027-Internships/dev/README.md`, HTML table rows): found
  Highmark x2 and CVS that the sweep and compbiojobs missed. Screen health employers and analytics roles every run, then read the body on the employer's board.
- compbiojobs tracker (`/bioinformatics-internships-2027`, split rows on `href="/companies/`): found Genmab x3 and Insmed 11-06; dry 11-07. Status lags.
- Same-day Pfizer send: a first row in or near her metros gets acted on.
- Pfizer iCIMS list: `.../jobs/search?ss=1&in_iframe=1`; iCIMS bodies read with curl and `in_iframe=1` (AG too).
- Liveness pass in under a minute: Workday `cxs` `/job/<path>` gives `endDate` and `canApply`; eightfold
  `/api/apply/v2/jobs/<id>?domain=<co>.com` (AZ close date in body as `Closing Date`).
- Cedars-Sinai Oracle REST finder `siteNumber=CX_1,keyword=intern`. Browser pane reads MannKind Paycor, Ultragenyx, Intuitive, Mayo.

## What is not working

- Sweep misses employers not in its list: Highmark's remote seats reached her 9 and 18 days late.
- Re-read Coming up rows every run: Kite, Corcept (slug `corcepttherapeutics`), Henry Ford, MannKind, Ultragenyx, Penumbra, Edwards.
- Guessing Workday tenants is low yield. Stop; use the trackers for tenant links.
- `sweep_boards.py` takes about 25 min and prints little until done. Rows sit under `boards[name].intern`.
- Python `urllib` fails on an expired certificate. Use curl; `py -3 -X utf8`. Long Bash heredocs failed 11-06; use Write.
- Browser pane is blank for Workday search pages and eightfold bodies. Genmab cxs search returns 0; read by job path.
- Web searches for 2027 seats return 2026 pages.
- Blocked boards (Denali, Xencor, CHLA, TGen): 22 dry runs. Read anyway per core.

## Targets

- Nov 9 J&J C&SP; Nov 16 BMS PS, AZ Lung, Henry Ford opens; Nov 19 AZ Epidemiology; Dec 1 Highmark CPH; Jan 8 J&J Market Access; Jan 31 Ferguson; Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb), Stryker RWE re-post, J&J MedTech RWE re-post.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H17: dated seats close early or move earlier. Kill: J&J C&SP lasts to Nov 9.
- H18: early September applications get decisions in November. Kill: no outcome change by Nov 20.
- H19: sends slowed because remaining seats are out of metro. Supported by Pfizer 11-06. Kill: an out-of-metro row ticked by Nov 10.
- H20: remote and graduate seats at health plans post late October onward. Kill: no new one by Dec 1.

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
2. Other health plans' graduate seats through the trackers (Kaiser, Blue Shield, Oscar, Devoted).
3. Kaiser Northern California Division of Research (Pleasanton) graduate intern postings.
4. ASA Biopharmaceutical Section internship listings.
- Done 11-07: Simplify tracker (found 3), Mayo Arizona (dry).

## Notes to self

- Out-of-metro rows in Open now (14): CVS, Genmab x3, Moderna x2, Regeneron x2, AZ x2, J&J CSP, BMS PS, Jefferson, BSC.
- RAND and BRG are in not-a-fit; do not carry their dates. Mueller: name only. Federal Reserve statistics intern: public sector, excluded.
- `/api/apps` is live: counts are fact. Write scripts in the scratchpad; back up data files first.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite, Henry Ford Oct 16, AG Generalist passed).
- Decide out-of-metro scope: 14 rows sit in Open now.
- Let long-dry BLOCKED boards move to Sundays.
- `sweep_boards.py`: add Highmark, CVS grad, Genmab, Moderna, Regeneron, Sanofi, Biogen, Insulet, BeOne, Ultragenyx, Labcorp, Pfizer iCIMS.
- `kenzie-done.json` is empty while the store holds 20; decide whether the hand file still matters.
