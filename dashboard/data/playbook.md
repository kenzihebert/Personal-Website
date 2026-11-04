# Research playbook

**v35, 2026-11-04.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent 7+ runs in Open now: 4 on 11-04 (AG Generalist 37 runs, J&J C&SP 22, J&J Market Access 13,
BSC 12). Sends in the last 7 days: 0 (store: 18 sent, 14 waiting, 4 rejected, nothing new since 10-28).
Read the store with `curl -s https://mckenziehebert.com/api/apps`.
Diagnosis 11-04: four dated East Coast seats close by Nov 19 (J&J C&SP Nov 9, BMS Nov 16 cut from Nov 26,
AZ Lung Evidence Nov 16, AZ Epidemiology Nov 19); asked for J&J and AZ Epi by Nov 8. 11-05: escalate once only if the store is still unchanged
(cost: J&J gone in 4 days), then watch. After Nov 19 stop raising out-of-metro dated seats.
Used and dropped: unsent seats vanishing (10-30 to 11-01), Northeast location question, record outcomes
(11-02), send rate / East Coast decision (11-03).

## Sunday review (11-01; next 11-08)

- Metro order still right; the thin spot is in-metro MS statistics seats (only AG of 13 unsent rows is in-metro).
- Underused skill: R Shiny app; now a January prep line in `start`.
- Strategy-changing observables: a US CRO biostat intern (H3); an in-metro device MS stats seat (H11); an interview recorded in the store.

## What is working (last confirmed 2026-11-04)

- AstraZeneca eightfold `/api/apply/v2/jobs/<id>?domain=astrazeneca.com` gives full body and closing date (11-04).
- Workday `cxs` liveness catches date moves: BMS re-posted 11-03 with end 11-16 (11-04). Check `endDate` on every dated row nightly.
- Workday `cxs` search by tenant finds employers the sweep lacks: Regeneron (10-29), Moderna (10-28).
  Tenant names must be exact. Dry guesses: Lilly, Takeda, Bayer, Incyte, Alnylam, BioMarin, Intuitive,
  Masimo, Jazz, Glaukos, BD, Zimmer, Hologic.
- Browser pane reads sites that refuse curl: Ultragenyx (11-03), Intuitive (11-04, fetch all 38 pages via JS in the page).
- Takeda Radancy board answers curl with `X-Requested-With` at `/search-jobs/results?Keywords=intern&RecordsPerPage=100` (11-04).

## What is not working

- `sweep_boards.py` takes about 25 min and prints nothing until done. In Git Bash pass `--out` with forward slashes.
- Python `urllib` fails on an expired certificate. Use curl; `py -3 -X utf8`.
- Browser pane is blank for Workday search pages and for eightfold bodies; use `cxs` or eightfold `/api/apply/v2/jobs/<id>`.
- `fetch_posting_text.py` stubs AG x2 and BCBSM; skip unless a new ranked row needs a body.
- Web searches for 2027 seats return 2026 pages.
- Blocked boards (Denali, Xencor, CHLA, TGen): 19 dry runs. Read anyway per core; takes 2 minutes.

## Targets

- Nov 9 J&J C&SP; Nov 16 BMS PS and AZ Lung Evidence; Nov 19 AZ Epidemiology; Jan 8 J&J Market Access; Jan 31 Pfizer Stats; Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Pfizer list, Kaiser R&E (Feb),
  MannKind (Q4), Penumbra (Feb), Stryker RWE re-post, J&J MedTech RWE re-post.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H14: big-pharma graduate seats beyond J&J, Merck, Gilead, Amgen, Moderna, Regeneron are MBA, commercial or undergrad only (Takeda confirms, 11-04). Kill: one posts an MS statistics seat before Dec 1.
- H17: dated seats close early or move earlier (BMS 11-03 supports). Kill: J&J C&SP lasts to Nov 9.
- H18: early September applications get decisions in November. Kill: no outcome change in the store by Nov 20.
- H19: sends slowed because remaining seats are out of metro. Kill: an out-of-metro row ticked by Nov 10.

## Exploration queue (never empty)

1. MannKind Paycor; compbiojobs.com pharma stats listings for new seats.
2. Kaiser Pasadena master's intern seats; Cedars-Sinai board.
3. Mayo Arizona research intern bodies (graduate-level?).
4. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
5. Kaiser Northern California Division of Research (Pleasanton) graduate intern postings.
- Done: Takeda (no stats intern), Intuitive (engineering intern only), Kaiser board "intern" (pharmacy and clinical only; Radancy curl works) (11-04); Ultragenyx, City of Hope (11-03).

## Notes to self

- Out-of-metro rows in Open now (10): Moderna x2, J&J CSP, BMS PS, Jefferson, BSC, Regeneron x2, AZ x2.
  Remote: J&J Market Access, Amgen Target Safety (genomics tag, last).
- RAND and BRG are in not-a-fit; do not carry their dates.
- Mueller: no pronouns on the page; name only.
- `/api/apps` is live: counts are fact; ticks and manual rows count as sent.
- Write scripts each night in the scratchpad; back up data files first (old scratchpads do not survive).

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite and Henry Ford Oct 16 passed; AG Generalist passed).
- Decide out-of-metro scope: ten rows sit in Open now.
- Let long-dry BLOCKED boards move to Sundays.
- Task file sweep command: use forward slashes in `--out` for Git Bash.
- `sweep_boards.py`: add Moderna, Regeneron, Sanofi, Vertex, Biogen, Alnylam, Insulet, BeOne, Ultragenyx.
