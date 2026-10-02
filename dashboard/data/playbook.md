# Research playbook

**v4, 2026-10-02.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## What is working (last confirmed 2026-10-02)

- Workday `cxs` job endpoint: `endDate`, body and liveness for every Workday row in one pass.
  Use curl; Python's urllib fails certificate checks here.
- Phrase search on device boards. "summer 2027" on Edwards found Clinical & Regulatory
  Req-49745 (statistics named, closes Nov 1), which the sweep's `intern,biostatistics` filter
  missed for a month. Run the phrase pass on all Workday boards weekly; device boards nightly.
- Reading the employer's own program page beats the standing dates: Edwards' Clinical track
  is Sep to Oct, not Jan to Apr.
- iCIMS boards (Analysis Group, Pfizer program) read in the browser via the
  `icims_content_iframe` contentDocument.
- University-side contacts are findable: the SPH career fairs page names its coordinator.

## What is not working

- 0 applications recorded while 9 rows close Oct 16. Diagnosis given 10-01, escalated with the
  cost 10-02. Drop it now; watch `kenzie-done.json`. Do not repeat it on 10-03.
- `fetch_posting_text.py` overwrites the Analysis Group files with "could not fetch" stubs every
  run. Restore the body by hand from the browser after running it, or skip iCIMS rows.
- Employer-side named people: zero. Web search for recruiters returns LinkedIn only.
- Small LA biotechs (Puma 403, Capsida LinkedIn-only, Arcutis portal error, Xencor, ImmunityBio,
  Denali): six reads, nothing. Check weekly, not nightly.
- Titles mislead (Gilead Research Data Sciences, Gilead HEOR, Kite Project Management). Rank on
  the body.

## Targets

- Gilead/Kite batch (Oct 16), BRG (Oct 16), Analysis Group HC (Oct 28), Edwards C&R (Nov 1),
  Stryker Irvine (rolling).
- Watch for posting: Kite stats grad (Oct to Jan), Pfizer stats positions list (empty 10-02),
  Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb), Blue Shield (no 2027 yet).

## Hypotheses

- H1: framing the Gilead rows as one sitting gets an application out. Kill: nothing recorded
  in `kenzie-done.json` by Oct 8.
- H2: SoCal device companies post MS statistics seats in fall outside the sweep. Count: Edwards
  confirms (1 hit), Danaher nothing. Kill: next two device boards (BD, Intuitive, Masimo)
  phrase-searched with nothing.
- H3: CRO US summer interns post after November. Kill: a US biostat intern at a CRO before Nov 15.
- H4: a university contact produces an employer name faster than web search. Kill: no
  employer-side name on file by Oct 31.

## Exploration queue (never empty)

1. Masimo, BD, Intuitive, Baxter, Insulet: find Workday hosts from their own careers pages,
   then phrase-search "summer 2027" and "clinical".
2. Amgen, Kite, J&J, Dexcom: phrase-search "clinical" and "statistic" (Edwards lesson).
3. Health plans: Kaiser Health Plan analytics, Molina actuarial, Blue Shield Oracle portal.
4. Exponent student page re-check after Oct 15.
5. Cytel and Certara careers pages directly (sweep sees 0 to 1 rows).

## Notes to self

- RAND is in not-a-fit; do not carry its Dec date.
- Medtronic master's window closes Oct 13 (confirmed 10-02); no CA or AZ seat to apply to.
- Merck rule: one out-of-metro exception (Biostatistics). Outcomes Research and Clinical Trial
  Data Management are NJ/PA; not-a-fit.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.
- Contacts section added 10-02 (`people`). Renderer handles it.

## Proposed core changes

- Standing dates are stale: "Edwards opens Jan to Apr" is wrong for its Clinical & Regulatory
  track (Sep to Oct, Req-49745 closes Nov 1). RAND Dec 2 cannot be confirmed (its page excludes
  biostat MS students). Amgen grad DS says no deadline, not Nov 7. Suggest removing all three.
- Add `summer 2027` and `clinical` to the Edwards row's search terms in `sweep_boards.py`.
- Add Stryker (`stryker.wd1.myworkdayjobs.com|stryker|StrykerCareers|intern`) and Denali
  (`dnli.wd1.myworkdayjobs.com|dnli|Development|intern`) to `sweep_boards.py`.
- Have `fetch_posting_text.py` skip writing when a fetch fails, so saved bodies are not lost.
