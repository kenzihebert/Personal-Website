# Research playbook

**v31, 2026-10-31.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Unsent rows in Open now (11 on 10-31, 3 in her metros or remote) and sends in the last 7 days
(2 on 10-31; store holds 18 sent, 14 waiting, 4 rejected, nothing new since 10-28). Read the store with
`curl -s https://mckenziehebert.com/api/apps`. Diagnosis 10-31: Merck Biostatistics (only big-pharma
MS biostat seat) came down unsent a day early. Lead is Moderna Oncology Biostatistics (listed since 10-05, oldest).
Hypothesis: the three no-clock biostat rows are on-site Northeast, so they slip. Asked her to say if location is the reason.
Do not repeat this on 11-01; watch for a send or a reply.

## Sunday review (10-25; next 11-01)

- Metro order still right; the thin spot is in-metro MS statistics seats (3 of 12 unsent rows).
- Underused skill: R Shiny app against J&J SDS's "building software for statistical analyses".
- Biggest gap was the page not knowing what she had sent; fixed 10-28. Next: no warm contact used.
- Nightly work that produced nothing: Xencor, CHLA, Denali browser reads (15+ dry); Sundays only.
- Strategy-changing observables: a US CRO biostat intern (H3); an in-metro device MS stats seat (H11); sends per week below 2.

## What is working (last confirmed 2026-10-30)

- Workday `cxs` search by tenant finds employers the sweep lacks: Regeneron (10-29), Moderna (10-28).
  Tenant/site names must be exact; guessed names for Lilly, Takeda, Bayer, Incyte, BMS, Alnylam return nothing.
  Sanofi (`sanofi`/wd3/`SanofiCareers`), GSK, AstraZeneca, Abbott, Thermo, IQVIA, Parexel, Fortrea, Labcorp answer.
  Use `MSYS_NO_PATHCONV=1` for path args in Git Bash.
- Sweep diff by URL against the backup (`kdiff.py`). Back up `sweep-latest.json`, `kenzie.json`,
  `ledger.json`, `apply-archive.json` first. Helpers (`live.py`, `kdiff.py`, `expl.py`, `body2.py`, `up<date>.py`)
  live in recent scratchpads.
- Liveness via Workday `cxs` with curl (`live.py`). A 403 on a job page plus absence from search means taken down.
- Web search "summer 2027 biostatistics intern master's" (Moderna, Amgen); aggregators (compbiojobs.com) list seats before the employer board does (Bayer 10-31), so confirm on the employer page.

## What is not working

- `sweep_boards.py` takes about 25 min and prints per tier; run `py -3 -u` to a log in the background, wait for `^wrote`.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- Browser pane returns blank for Workday search pages; use the `cxs` API instead.
- `fetch_posting_text.py` stubs AG x2 and BCBSM; skip it unless a new ranked row needs a body.
- Long bash heredocs break; write scripts with the Write tool.
- Carried text goes stale. Grep kenzie.json for last night's date before writing.

## Targets

- Oct 31 Gilead Biomarker; Nov 9 J&J C&SP;
  Nov 26 BMS PS; Jan 8 J&J Market Access; Feb 15 Jefferson. Moderna, Regeneron, BSC rolling.
- Watch: Corcept biostat (by Jan), Kite grad, Pfizer list, Kaiser R&E (Feb), MannKind (Q4),
  Penumbra (Feb), Stryker RWE virtual re-post (404 on 10-30), J&J MedTech RWE & Modeling re-post.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 1.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H14: big-pharma graduate seats beyond J&J, Merck, Gilead, Amgen, Moderna, Regeneron are MBA, commercial or undergrad only.
  Sanofi, GSK, AstraZeneca supported it 10-30. Kill: one posts an MS statistics seat before Dec 1.
- H16: mid-size east-coast biotechs post MS biostat summer interns in Sept to Oct. Kill: Alnylam, Lilly show none by Nov 10.
- H17: dated seats vanish before the close date (J&J, Merck x3; 10-30, 10-31). Supported 3 times. Kill: next dated seat lasts to its date (J&J C&SP Nov 9).

## Exploration queue (never empty)

1. Other Workday tenants with exact names: find via a job URL from web search (Lilly, Bayer, Takeda, Incyte, Vir, Ultragenyx).
2. MannKind Paycor 11-01; Bayer re-post watch on jobs.bayer.com (11-03); compbiojobs.com pharma stats listings.
3. Kaiser Pasadena master's intern seats, Cedars-Sinai board body read (11-02). City of Hope not searched yet.
4. Mayo Arizona research intern bodies (graduate-level?) (11-03).
- Done: Exponent iCIMS, Weill Cornell (undergrad), Bayer web search (10-31); Sanofi/GSK/AZ/Thermo/Labcorp/Abbott cxs (10-30); Regeneron/Vertex/Biogen (10-29); Medtronic, Moderna, Jefferson (10-28).

## Notes to self

- Out-of-metro rows in Open now (9): Moderna x2, Merck, J&J CSP, BMS PS, Jefferson, BSC, Regeneron x2.
- RAND and BRG are in not-a-fit; do not carry their dates.
- Mueller: no pronouns on the page; name only.
- `/api/apps` is live: state counts as fact; ticks and manual rows count as sent; drop those rows from Open now.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite and Henry Ford Oct 16 passed; RAND excludes biostat MS; AG Generalist passed).
- Decide out-of-metro scope: nine rows sit in Open now.
- Let long-dry BLOCKED boards (Xencor, CHLA, Denali) move to weekly.
- `sweep_boards.py`: add Moderna (`modernatx`/`M_tx`), Regeneron, Sanofi, Vertex, Biogen, Alnylam; fix TGen browser_url.
- `fetch_posting_text.py`: skip writing on a failed fetch; `?in_iframe=1` for iCIMS.
