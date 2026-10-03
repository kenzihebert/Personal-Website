# Research playbook

**v5, 2026-10-03.** Rewritten every run. Hard cap 6 KB.

## Who this is for

MS Biostatistics, Michigan, May 2028. Summer 2027 internship with a return offer. Master's only.
Private sector only. Trials, devices, health analytics; genomics last.

## Governing metric

Rows unsent for 7+ runs. Tonight: 4 logged runs since 10-01, 0 sent, 18 open. The Oct 16
Gilead/Kite/BRG rows hit 7 runs on about 10-06. If none is recorded by then, the page is failing
her: change its shape (fewer rows, one action), not its volume.

## What is working (last confirmed 2026-10-03)

- Workday `cxs` job endpoint: `endDate`, body and liveness for every Workday row in one pass.
  Use curl; Python's urllib fails certificate checks here.
- Reading the body kills title traps. Tonight: Gilead "Clinical Data Management, Technology" is
  AI-agent engineering, CS preferred. Confirmed again 10-03.
- iCIMS boards (Analysis Group, Pfizer program) read in the browser via the
  `icims_content_iframe` contentDocument. Medtronic's early careers page refuses curl; the
  browser reads it.
- Backing up the Analysis Group postings-text files before `fetch_posting_text.py` and restoring
  any "could not fetch" stub. Worked 10-03.

## What is not working

- 0 applications recorded across 4 runs. Diagnosed 10-01, escalated 10-02, dropped 10-03 as
  planned (tonight's Start item was supply, not the count). Watch `kenzie-done.json` and the
  page's ticks; do not restate the cost.
- `/api/apps` answers 501 (no KV binding). Ticks stay per-device until it is bound.
- Employer-side named people: zero after 3 runs of trying. Postings name nobody.
- Device boards beyond Edwards and Stryker: 8 boards phrase-searched 10-03 (Abbott, ResMed,
  Tandem, Alcon, Danaher, Medtronic, Insulet, Baxter), nothing. H2 is dead.
- Small LA biotechs: weekly only (next 10-09).

## Targets

- Gilead/Kite batch and BRG (Oct 16), Analysis Group HC (Oct 28), Edwards C&R (Nov 1),
  Stryker Irvine (rolling).
- Watch for posting: Kite stats grad (Oct to Jan), Pfizer stats positions list (empty 10-03),
  Amgen R&D biostat, BMS San Diego, Kaiser R&E (Feb), Blue Shield (no 2027 yet).

## Hypotheses

- H1: framing the Gilead rows as one sitting gets an application out. Kill: nothing recorded
  in `kenzie-done.json` by Oct 8.
- H3: CRO US summer interns post after November. Kill: a US biostat intern at a CRO before Nov 15.
- H4: a university contact produces an employer name faster than web search. Kill: no
  employer-side name on file by Oct 31.
- H5 (new): the fall supply is fixed; no new fitting row appears before Oct 16. Kill: a new
  fitting req in her metros before Oct 16.

## Exploration queue (never empty)

1. Exponent student page re-check after Oct 15.
2. Health plans: Kaiser Health Plan analytics, Molina actuarial, Blue Shield Oracle portal.
3. Cytel and Certara careers pages directly (sweep sees 0 to 1 rows).
4. Pharma with SoCal/Bay statistics sites not yet on the sweep: Otsuka, AbbVie South SF
   biostatistics, Jazz (Palo Alto), BioMarin. Find their own boards first.
5. Takeda San Diego: find the real board from takeda.com (wd3 guess did not answer).

## Notes to self

- Phrase pass: all Workday boards weekly (next 10-08); device boards weekly now, not nightly.
- RAND is in not-a-fit; do not carry its Dec date.
- Medtronic master's window closes Oct 13 (confirmed 10-03 in browser); no CA or AZ seat.
- Merck: one out-of-metro exception (Biostatistics). Others are NJ/PA; not-a-fit.
- Pfizer program: move to Open now only when its positions list shows a Statistics req.
- J&J Jacksonville Biostatistics reposted 10-03 (closes Oct 23); still PhD. Not a fit.

## Proposed core changes

- Standing dates are stale: "Edwards opens Jan to Apr" is wrong for its Clinical & Regulatory
  track (Sep to Oct, Req-49745 closes Nov 1). RAND Dec 2 cannot be confirmed (its page excludes
  biostat MS students). Amgen grad DS says no deadline, not Nov 7. Suggest removing all three.
- Add `summer 2027` and `clinical` to the Edwards row's search terms in `sweep_boards.py`.
- Add Stryker (`stryker.wd1.myworkdayjobs.com|stryker|StrykerCareers|intern`) and Denali
  (`dnli.wd1.myworkdayjobs.com|dnli|Development|intern`) to `sweep_boards.py`.
- Have `fetch_posting_text.py` skip writing when a fetch fails, so saved bodies are not lost.
- Bind the `APPS` KV namespace on the Pages project so her ticks reach this task.
