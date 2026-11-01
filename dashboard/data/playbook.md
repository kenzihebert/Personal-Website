# Research playbook

**v32, 2026-11-01.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Unsent rows in Open now (10 on 11-01, 2 in her metros or remote) and sends in the last 7 days
(2 on 11-01; store holds 18 sent, 14 waiting, 4 rejected, nothing new since 10-28). Read the store with
`curl -s https://mckenziehebert.com/api/apps`. Diagnosis 11-01: Gilead Biomarker closed 10-31 unsent
(Merck went 10-30). Lead is J&J C&SP (closes Nov 9); dated seats vanish early. Asked again whether the
Northeast location is why she holds back. Do not repeat on 11-02; watch for a send or a reply.

## Sunday review (11-01; next 11-08)

- Metro order still right; the thin spot is in-metro MS statistics seats (2 of 10 unsent rows, 0 biostat).
- Underused skill: R Shiny app against Regeneron and J&J SDS "software for statistical analyses".
- Biggest gap: no sends since 10-28 and eight of ten open rows are out of metro; tonight touched it by naming one dated seat and a day to send.
- Produced nothing for 16+ runs: Xencor, Denali, CHLA browser reads. Move to every other Sunday.
- Strategy-changing observables: a US CRO biostat intern (H3); an in-metro device MS stats seat (H11); sends per week below 2.

## What is working (last confirmed 2026-11-01)

- Workday `cxs` search by tenant finds employers the sweep lacks: Regeneron (10-29), Moderna (10-28).
  Tenant/site names must be exact; guessed names for Lilly, Takeda, Bayer, Incyte, BMS, Alnylam return nothing.
  Sanofi (`sanofi`/wd3/`SanofiCareers`), GSK, AstraZeneca, Abbott, Thermo, IQVIA, Parexel, Fortrea, Labcorp answer.
  Use `MSYS_NO_PATHCONV=1` for path args in Git Bash.
- Sweep diff by URL against the backup (`kdiff.py`). Back up `sweep-latest.json`, `kenzie.json`,
  `ledger.json`, `apply-archive.json` first. Helpers (`live.py`, `kdiff.py`) are in recent scratchpads; copy to /tmp/kb.
- Liveness via Workday `cxs` with curl (`live.py <kenzie.json>`). Gone rows show GONE or a 403.
- Web search finds seats before the board: compbiojobs.com lists Bayer (10-31), Moderna, Amgen.

## What is not working

- `sweep_boards.py` takes about 25 min; run `py -3 -u` to a log in the background, wait for `^wrote`.
- Python `urllib` fails on an expired certificate. Use curl via subprocess; `py -3 -X utf8`.
- Browser pane returns blank for Workday search pages; use the `cxs` API instead.
- `fetch_posting_text.py` stubs AG x2 and BCBSM; skip it unless a new ranked row needs a body.
- Long bash heredocs break; write scripts with the Write tool. Git Bash `/tmp` is not the Windows temp for `py`: use relative paths from /tmp/kb.
- Carried text goes stale. Grep kenzie.json for last night's date before writing.
- Web searches for LA/SD seats: 4 dry runs in a row. Stop repeating it; try employer boards by name.

## Targets

- Nov 9 J&J C&SP; Nov 26 BMS PS; Jan 8 J&J Market Access; Feb 15 Jefferson. Moderna, Regeneron, BSC rolling.
- Watch: Corcept biostat (by Jan), Kite grad, Pfizer list (Jan 31), Kaiser R&E (Feb), MannKind (Q4),
  Penumbra (Feb), Stryker RWE virtual re-post, J&J MedTech RWE & Modeling re-post, Bayer re-post.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H14: big-pharma graduate seats beyond J&J, Merck, Gilead, Amgen, Moderna, Regeneron are MBA, commercial or undergrad only. Kill: one posts an MS statistics seat before Dec 1.
- H16: east-coast biotechs post MS biostat interns Sept to Oct. Kill: Alnylam, Lilly show none by Nov 10 (Lilly web search 11-01: 2026 only).
- H17: dated seats vanish before the close date (J&J, Merck x3; Gilead closed on time 10-31). Kill: J&J C&SP lasts to Nov 9.

## Exploration queue (never empty)

1. Other Workday tenants with exact names: find via a job URL from web search (Lilly, Bayer, Takeda, Incyte, Vir, Ultragenyx).
2. MannKind Paycor; Bayer re-post watch on jobs.bayer.com; compbiojobs.com pharma stats listings.
3. Kaiser Pasadena master's intern seats, Cedars-Sinai board body read, City of Hope.
4. Mayo Arizona research intern bodies (graduate-level?).
- Done: Denali, Xencor browser (11-01); Exponent iCIMS, Weill Cornell, Bayer web (10-31); Sanofi/GSK/AZ/Thermo/Labcorp/Abbott cxs (10-30).

## Notes to self

- Out-of-metro rows in Open now (8): Moderna x2, J&J CSP, BMS PS, Jefferson, BSC, Regeneron x2.
- RAND and BRG are in not-a-fit; do not carry their dates.
- Mueller: no pronouns on the page; name only.
- `/api/apps` is live: state counts as fact; ticks and manual rows count as sent; drop those rows from Open now.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite and Henry Ford Oct 16 passed; AG Generalist passed).
- Decide out-of-metro scope: eight rows sit in Open now.
- Let long-dry BLOCKED boards (Xencor, CHLA, Denali) move to every other Sunday.
- `sweep_boards.py`: add Moderna (`modernatx`/`M_tx`), Regeneron, Sanofi, Vertex, Biogen, Alnylam.
