# Research playbook

**v37, 2026-11-06.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent 7+ runs in Open now, counted from `apply-archive.json` `first_listed`: 10 of 18 on 11-06
(AG Generalist since 09-28, J&J C&SP 10-13, J&J Market Access 10-22, BSC 10-23, BMS 10-27, Moderna x2 and
Jefferson 10-28, Regeneron x2 10-29). Sends in the last 7 days: 0; last 14: 2 (store: 18 sent, 14 waiting,
4 rejected, nothing new since 10-28). Read the store with `curl -s https://mckenziehebert.com/api/apps`.
Diagnosis 11-06: Pfizer Statistics open and in metro; tests H19. Next diagnosis on a change only: a send,
an outcome, a close, or Nov 19 passing. If Pfizer is unticked by 11-08, say once what rolling review costs.
Used and dropped: unsent seats vanishing (10-30 to 11-01), Northeast question, record outcomes (11-02),
send rate / East Coast decision (11-03), four dated East Coast seats (11-04, escalated 11-05).

## Sunday review (11-01; next 11-08)

- Metro order still right; the thin spot is in-metro MS statistics seats (Pfizer San Diego and AG now).
- Underused skill: R Shiny app; Genmab C&SP names it as preferred.
- Strategy-changing observables: a US CRO biostat intern (H3); an in-metro device MS stats seat (H11); an interview in the store.

## What is working (last confirmed 2026-11-06)

- compbiojobs tracker (`/bioinformatics-internships-2027`, split rows on `href="/companies/`): found Genmab x3 and Insmed
  that the sweep and guessed tenants missed; updated daily. Screen it for US summer rows every run, then read the body on
  the employer's board. Its status lags: Bayer shows open after closing.
- Pfizer iCIMS list: `.../jobs/search?ss=1&in_iframe=1`; iCIMS bodies read with curl and `in_iframe=1` (AG too).
- Liveness pass in under a minute: Workday `cxs` `/job/<path>` gives `endDate` and `canApply`; eightfold
  `/api/apply/v2/jobs/<id>?domain=<co>.com` (AZ close date in body as `Closing Date`).
- Cedars-Sinai Oracle REST finder `siteNumber=CX_1,keyword=intern` (11-05). Browser pane reads MannKind Paycor, Ultragenyx, Intuitive.

## What is not working

- A Coming up row with a readable board went unread for 16 days (Pfizer: list last read 10-21, posted 10-26). Re-read
  every such row each run: Kite, Corcept, Henry Ford, MannKind, Ultragenyx, Penumbra, Edwards.
- Guessing Workday tenants is low yield. Dry or wrong: Lilly, Takeda, Bayer, Incyte, Alnylam, BioMarin, Intuitive, Masimo,
  Jazz, Glaukos, BD, Zimmer, Hologic, Astellas, Daiichi, Otsuka, Boehringer, Novo, Eisai. Stop; use the tracker.
- `sweep_boards.py` takes about 25 min and prints nothing until done. In Git Bash pass `--out` with forward slashes.
- Python `urllib` fails on an expired certificate. Use curl; `py -3 -X utf8`. Long Bash heredocs failed 11-06; use Write.
- Browser pane is blank for Workday search pages and eightfold bodies. Genmab cxs search returns 0; read by job path.
- Web searches for 2027 seats return 2026 pages.
- Blocked boards (Denali, Xencor, CHLA, TGen): 21 dry runs. Read anyway per core.

## Targets

- Nov 9 J&J C&SP; Nov 16 BMS PS, AZ Lung, Henry Ford opens; Nov 19 AZ Epidemiology; Jan 8 J&J Market Access; Jan 31 Pfizer Stats, Ferguson; Feb 15 Jefferson.
- Watch: Corcept biostat (by Jan), Kite grad, Ultragenyx (Jan to Mar), Kaiser R&E (Feb), MannKind (Q4), Penumbra (Feb), Stryker RWE re-post, J&J MedTech RWE re-post.

## Hypotheses

- H3: CRO US summer interns post after November. Kill: a US CRO biostat intern before Nov 15.
- H4: a peer inside a target team beats recruiters. Kill: no second alum lead by Nov 15.
- H11: device makers post MS clinical-data seats outside her metros first. Kill: none in-metro by Dec 1.
- H12: small LA biotechs (MannKind, Arrowhead) post Q4 to January. Kill: none by Jan 31.
- H17: dated seats close early or move earlier. Kill: J&J C&SP lasts to Nov 9.
- H18: early September applications get decisions in November. Kill: no outcome change by Nov 20.
- H19: sends slowed because remaining seats are out of metro. Kill: Pfizer unticked by Nov 15, or an out-of-metro row ticked by Nov 10.
- H14 retired 11-06: Pfizer and Genmab post MS statistics seats.

## Exploration queue (never empty)

1. Michigan SPH alumni at Amgen, Gilead, Edwards biostatistics (one named lead for H4).
2. Mayo Arizona research intern bodies (Radancy endpoint gave nothing 11-06; use browser).
3. Kaiser Northern California Division of Research (Pleasanton) graduate intern postings.
4. Other trackers for pharma statistics seats.
- Done 11-06: compbiojobs (found Genmab), Kaiser "master's intern" (dry), Arrowhead (dry).

## Notes to self

- Out-of-metro rows in Open now (13): Genmab x3, Moderna x2, Regeneron x2, AZ x2, J&J CSP, BMS PS, Jefferson, BSC.
- RAND and BRG are in not-a-fit; do not carry their dates. Mueller: name only.
- `/api/apps` is live: counts are fact. Write scripts in the scratchpad; back up data files first.

## Proposed core changes

- Standing dates in the task file are stale (Gilead/Kite, Henry Ford Oct 16, AG Generalist passed).
- Decide out-of-metro scope: 13 rows sit in Open now.
- Let long-dry BLOCKED boards move to Sundays.
- Task file sweep command: forward slashes in `--out` for Git Bash.
- `sweep_boards.py`: add Genmab, Moderna, Regeneron, Sanofi, Biogen, Insulet, BeOne, Ultragenyx, Labcorp, Pfizer iCIMS.
