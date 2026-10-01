# Research playbook

**v3, 2026-10-01 (second run of the day).** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## What is working (last confirmed 2026-10-01)

- Workday `cxs` job endpoint gives `endDate` and the full body for every Workday req. Call it
  with curl; Python's urllib fails certificate checks on this machine.
- Phrase search with no intern filter across all 35 Workday boards (six phrases, about two
  minutes). It surfaced Merck Outcomes Research, and showed Gilead Data Sciences now carries
  req id R0055524. Run it weekly, not nightly.
- iCIMS boards (Analysis Group, Pfizer) read in the browser via the `icims_content_iframe`
  contentDocument. `fetch_posting_text.py` cannot fetch them (2 MISS every run); expected.
- Searching an employer's own Workday by phrase found Stryker R572769.

## What is not working

- Scheduling. 09-29 and 09-30 left no trace, then 10-01 fired twice a minute apart. A second
  run on the same day should do delta work only: re-sweep, diff, body-read anything ranked on
  its title, then the exploration queue.
- 0 applications recorded while 9 rows close Oct 16. `kenzie-done.json` was last edited 09-16,
  so either nothing is sent or nothing is reported. Cannot tell which from here.
- Named people: zero. Michigan's placement and internship pages list employers only.
- Titles mislead. Gilead Research Data Sciences sat in Open now on its title; the body is
  functional genomics with PhD preferred. Gilead HEOR is qualitative work. Rank on the body.
- Small LA biotechs: Capsida posts only on LinkedIn, Arcutis's portal errors. Low yield.

## Targets

- Gilead/Kite batch (Oct 16), Analysis Group HC (Oct 28), Stryker Irvine (rolling).
- Watch for posting: Kite stats grad (Oct to Jan), Amgen R&D biostat, Edwards (Jan), Pfizer
  stats listings, BMS San Diego, Kaiser R&E (Feb).

## Hypotheses

- H1: the long Gilead list reads as separate jobs and stalls action. Kill: an application
  recorded within 7 days of framing it as one sitting (by Oct 8).
- H2: SoCal device companies post MS statistics seats in fall outside the sweep. Kill: three more
  device boards searched by phrase with nothing. Count so far: Danaher/Beckman nothing (1 of 3).
- H3: CRO US summer interns post after November. Kill: a US biostat intern at a CRO before Nov 15.
- H4: a department introduction produces a named contact faster than web search. Kill: no name
  on file by Oct 15.

## Exploration queue (never empty)

1. Phrase-search BD, Intuitive, Baxter, Bausch, Insulet once their Workday hosts are confirmed
   from their own careers pages.
2. SPH Career Services employer-engagement page and its events calendar: which target
   employers visit campus this fall, and who is named as the contact.
3. Cytel and Certara career pages directly (sweep sees 0 to 1 rows; Certara's one is UK).
4. Health plans with actuarial or analytics grad interns in CA: Blue Shield, Kaiser Health
   Plan analytics.
5. Exponent student page re-check after Oct 15.
6. Puma (it has a statistical programming group in LA) and ImmunityBio official careers pages.

## Notes to self

- RAND is in not-a-fit; do not carry its Dec date.
- Medtronic master's window closes Oct 13; no CA or AZ seat to apply to.
- Stryker remote Data Science is commercial; do not re-surface.
- Merck rule: one out-of-metro exception (Biostatistics). Outcomes Research R413998 is MS
  eligible but New Jersey or Pennsylvania; it sits in not-a-fit with an offer to list it.
- Boston Scientific R&D Research Data Science: ECG deep learning, no site named. Not a fit.
- Diagnosis was given 10-01. Next night escalate once with the cost, then drop it.

## Proposed core changes

- Standing dates in the core instructions are stale: RAND Dec 2 cannot be confirmed (its page
  excludes biostat MS students); Amgen grad DS says no deadline, where the core says Nov 7.
  Suggest removing both.
- Add Stryker to `sweep_boards.py` (`stryker.wd1.myworkdayjobs.com|stryker|StrykerCareers|intern`).
- Say what a second run on the same date should do, or have the scheduler skip it.
