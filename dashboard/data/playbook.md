# Research playbook

**v33, 2026-11-02.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent 7+ runs in Open now: 4 on 11-02 (AG Generalist 35 runs, J&J C&SP 20, J&J Market Access 11,
BSC 10). Sends in the last 7 days: 2 (store: 18 sent, 14 waiting, 4 rejected, nothing new since 10-28).
Read the store with `curl -s https://mckenziehebert.com/api/apps`.
Diagnosis 11-02: eight applications sent by 10-05 have no outcome; asked her to check portals and set
outcomes. Do not repeat on 11-03; escalate once on 11-04 only if still unchanged, then watch.
Diagnoses already used and dropped: unsent seats vanishing (10-30 to 11-01), Northeast location question.

## Sunday review (11-01; next 11-08)

- Metro order still right; the thin spot is in-metro MS statistics seats (2 of 10 unsent rows, 0 biostat).
- Underused skill: R Shiny app against Regeneron and J&J SDS "software for statistical analyses".
- Strategy-changing observables: a US CRO biostat intern (H3); an in-metro device MS stats seat (H11); an interview recorded in the store.

## What is working (last confirmed 2026-11-02)

- Workday `cxs` search by tenant finds employers the sweep lacks: Regeneron (10-29), Moderna (10-28).
  Tenant/site names must be exact. Answer: Sanofi, GSK, AZ, Abbott, Thermo, IQVIA, Parexel, Fortrea,
  Labcorp, Insulet (`insulet`/wd5/`insuletcareers`), BeOne (`beigene`/wd5/`BeiGene`), Baxter (`baxter`/wd1/`baxter`).
  Guessed names that return nothing: Lilly, Takeda, Bayer, Incyte, BMS-alt, Alnylam, BioMarin, Intuitive,
  Masimo, Jazz, Glaukos, BD, Zimmer, Hologic. `probe.py` (scratchpad) takes `tenant|wd|site|query` args.
- Sweep diff by URL against the backup (`kdiff.py`); liveness via `live.py <kenzie.json>`. Back up the
  four data files first; helpers are in recent scratchpads.
- Re-checking a "down" page finds closures: Bayer statistician intern confirmed closed 11-02.

## What is not working

- `sweep_boards.py` takes about 25 min. In Git Bash pass `--out` with forward slashes
  (`C:/Users/...`); backslashes were eaten on 11-02 and the file landed in the dashboard repo root.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- Browser pane is blank for Workday search pages; use `cxs`.
- `fetch_posting_text.py` stubs AG x2 and BCBSM; skip unless a new ranked row needs a body.
- Long bash heredocs break; write scripts with the Write tool.
- Carried text goes stale: grep kenzie.json for "open now", passed dates and sent reqs before writing.
- Web searches for LA/SD seats: dry 4 runs running. Stopped.
- Blocked boards (Denali, Xencor, CHLA, TGen): 17 dry runs. Read anyway per core; takes 2 minutes.

## Targets

- Nov 9 J&J C&SP; Nov 26 BMS PS; Jan 8 J&J Market Access; Jan 31 Pfizer Stats; Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Pfizer list, Kaiser R&E (Feb), MannKind (Q4),
  Penumbra (Feb), Stryker RWE virtual re-post, J&J MedTech RWE re-post.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H14: big-pharma graduate seats beyond J&J, Merck, Gilead, Amgen, Moderna, Regeneron are MBA, commercial or undergrad only. Kill: one posts an MS statistics seat before Dec 1.
- H17: dated seats vanish before the close date. Kill: J&J C&SP lasts to Nov 9.
- H18: early September applications get decisions in November. Kill: no outcome change in the store by Nov 20.

## Exploration queue (never empty)

1. Exact Workday names via a job URL from web search: Takeda, Incyte, Vir, Ultragenyx, Intuitive, Masimo.
2. MannKind Paycor; compbiojobs.com pharma stats listings for new seats.
3. Kaiser Pasadena master's intern seats; Cedars-Sinai and City of Hope boards.
4. Mayo Arizona research intern bodies (graduate-level?).
- Done: Insulet/BeOne/Baxter cxs, Bayer page (11-02); Denali, Xencor (11-01); Exponent, Weill Cornell (10-31).

## Notes to self

- Out-of-metro rows in Open now (8): Moderna x2, J&J CSP, BMS PS, Jefferson, BSC, Regeneron x2.
- RAND and BRG are in not-a-fit; do not carry their dates.
- Mueller: no pronouns on the page; name only.
- `/api/apps` is live: counts are fact; ticks and manual rows count as sent.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite and Henry Ford Oct 16 passed; AG Generalist passed).
- Decide out-of-metro scope: eight rows sit in Open now.
- Let long-dry BLOCKED boards move to Sundays.
- Task file sweep command: use forward slashes in `--out` for Git Bash.
- `sweep_boards.py`: add Moderna, Regeneron, Sanofi, Vertex, Biogen, Alnylam, Insulet, BeOne.
