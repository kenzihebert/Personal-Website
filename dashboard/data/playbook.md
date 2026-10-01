# Research playbook

**v2, 2026-10-01.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## What is working (last confirmed 2026-10-01)

- Workday `cxs` job endpoint gives `endDate` and the full body for every Workday req. Use it to
  date-check and read quals for every ranked row. It caught 3 things tonight: two closed reqs,
  Gilead Data Sciences re-posted with Oct 30, and Amgen's "no application deadline".
- iCIMS boards (Analysis Group, Pfizer) read cleanly in the browser via the
  `icims_content_iframe` contentDocument. Use that, not WebFetch.
- Searching the employer's own Workday by phrase (`searchText`) found Stryker R572769, which
  no board in the sweep covers. Device companies outside the sweep are the best exploration vein.

## What is not working

- Runs on 09-29 and 09-30 left no commit and no log line. If this repeats, the schedule is
  broken, not the research.
- 0 applications recorded while 9 rows close Oct 16. `kenzie-done.json` was last edited
  09-16, so either nothing is sent or nothing is reported. Cannot tell which from here.
- Named people: zero. Web search does not surface recruiters; it needs a different approach.
- Titles mislead: Gilead HEOR is qualitative work, J&J RDLDP is engineering-only, RAND does not
  take biostat MS students. Always rank on the body.

## Targets

- Gilead/Kite batch (Oct 16), Analysis Group HC (Oct 28), Stryker Irvine (rolling).
- Watch for posting: Kite stats grad (Oct to Jan), Amgen R&D biostat, Edwards (Jan), Pfizer
  stats listings, BMS San Diego, Kaiser R&E (Feb).

## Hypotheses

- H1: the long Gilead list reads as 9 separate jobs and stalls action. Kill: an application
  recorded within 7 days of framing it as one sitting.
- H2: SoCal device companies post MS statistics seats in fall outside the sweep. Kill: three more
  device boards searched by phrase with nothing.
- H3: CRO US summer interns post after November. Kill: a US biostat intern at a CRO before Nov 15.

## Exploration queue (never empty)

1. Phrase-search Workday at Abbott (Sylmar), Boston Scientific (Valencia), BD, Intuitive,
   Becton, Baxter, Bausch: "statistical programming intern", "biostatistics intern".
2. Michigan SPH biostatistics internship list or past-employer page, for named recruiters.
3. Cytel and Certara career pages directly (sweep sees 0 to 1 rows).
4. Health plans with actuarial or analytics grad interns in CA: Blue Shield, L.A. Care is public
   (out), Kaiser Health Plan analytics.
5. Exponent student page re-check after Oct 15.

## Notes to self

- RAND is now in not-a-fit; do not carry its Dec date.
- Medtronic master's window closes Oct 13; no CA or AZ seat to apply to.
- Stryker remote Data Science is commercial; do not re-surface.

## Proposed core changes

- Standing dates in the core instructions are stale: RAND Dec 2 cannot be confirmed (its page still shows
  the 2026 cycle and excludes biostat MS students); Amgen grad DS says no deadline, not Nov 7.
  Suggest removing both from the standing list.
- Add Stryker to `sweep_boards.py` (`stryker.wd1.myworkdayjobs.com|stryker|StrykerCareers|intern`).
