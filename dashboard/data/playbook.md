# Research playbook

**v34, 2026-11-03.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent 7+ runs in Open now: 4 on 11-03 (AG Generalist 36 runs, J&J C&SP 21, J&J Market Access 12,
BSC 11). Sends in the last 7 days: 1 (store: 18 sent, 14 waiting, 4 rejected, nothing new since 10-28).
Read the store with `curl -s https://mckenziehebert.com/api/apps`.
Diagnosis 11-03: send rate fell to 1 in 7 days; 8 of 10 open rows are out of metro; asked her to decide
the East Coast question once, else prep the Shiny link for January. Do not repeat 11-04; escalate once
11-05 only if the store is still unchanged, then watch.
Used and dropped: unsent seats vanishing (10-30 to 11-01), Northeast location question, record outcomes (11-02).

## Sunday review (11-01; next 11-08)

- Metro order still right; the thin spot is in-metro MS statistics seats (1 of 10 unsent rows is in-metro).
- Underused skill: R Shiny app; now in the 11-03 diagnosis as January prep.
- Strategy-changing observables: a US CRO biostat intern (H3); an in-metro device MS stats seat (H11); an interview recorded in the store.

## What is working (last confirmed 2026-11-03)

- Workday `cxs` search by tenant finds employers the sweep lacks: Regeneron (10-29), Moderna (10-28).
  Tenant/site names must be exact. Answer: Sanofi, GSK, AZ, Abbott, Thermo, IQVIA, Parexel, Fortrea,
  Labcorp, Insulet, BeOne, Baxter. Guessed names that return nothing: Lilly, Takeda, Bayer, Incyte,
  Alnylam, BioMarin, Intuitive, Masimo, Jazz, Glaukos, BD, Zimmer, Hologic. `probe.py` takes `tenant|wd|site|query`.
- Browser pane reads sites that refuse curl (Ultragenyx Cloudflare, 11-03): found a Jan to Mar window.
- Sweep diff by URL (`kdiff.py`); liveness via `live.py <kenzie.json>`. Back up the data files first;
  helpers are in the 11-03 scratchpad (6b2677c6).

## What is not working

- `sweep_boards.py` takes about 25 min. In Git Bash pass `--out` with forward slashes.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- Browser pane is blank for Workday search pages and for eightfold bodies; use `cxs`, or `find "Apply"`.
- `fetch_posting_text.py` stubs AG x2 and BCBSM; skip unless a new ranked row needs a body.
- Web searches for 2027 seats return 2026 pages; Takeda posts on jobs.takeda.com, not Workday (11-03).
- Blocked boards (Denali, Xencor, CHLA, TGen): 18 dry runs. Read anyway per core; takes 2 minutes.

## Targets

- Nov 9 J&J C&SP; Nov 26 BMS PS; Jan 8 J&J Market Access; Jan 31 Pfizer Stats; Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Pfizer list, Kaiser R&E (Feb),
  MannKind (Q4), Penumbra (Feb), Stryker RWE re-post, J&J MedTech RWE re-post.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H14: big-pharma graduate seats beyond J&J, Merck, Gilead, Amgen, Moderna, Regeneron are MBA, commercial or undergrad only. Kill: one posts an MS statistics seat before Dec 1.
- H17: dated seats vanish before the close date. Kill: J&J C&SP lasts to Nov 9.
- H18: early September applications get decisions in November. Kill: no outcome change in the store by Nov 20.
- H19: sends slowed because remaining seats are out of metro. Kill: an out-of-metro row ticked by Nov 10.

## Exploration queue (never empty)

1. jobs.takeda.com search for 2027 statistics interns (Takeda is not on Workday).
2. MannKind Paycor; compbiojobs.com pharma stats listings for new seats.
3. Kaiser Pasadena master's intern seats; Cedars-Sinai board.
4. Mayo Arizona research intern bodies (graduate-level?).
5. Intuitive careers site (careers.intuitive.com) for 2027 clinical or data interns.
- Done: Ultragenyx (Jan to Mar window), City of Hope (no seat) (11-03); Insulet/BeOne/Baxter, Bayer (11-02).

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
- `sweep_boards.py`: add Moderna, Regeneron, Sanofi, Vertex, Biogen, Alnylam, Insulet, BeOne, Ultragenyx.
