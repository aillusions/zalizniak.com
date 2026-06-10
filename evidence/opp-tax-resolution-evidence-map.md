# Tax resolution / IRS-notice response — opportunity evidence map

Crawled 2026-06-10 via claude-in-chrome (logged-out). Notice volume from US Treasury / IRS publications; deadlines + process from the Taxpayer Advocate Service (.gov); back-taxes and OIC figures from tax-firm pages citing IRS data; the predatory-industry record from FTC (.gov) + Tax Notes; incumbents from vendors' own pages. Tiered accordingly.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal) · SPECULATIVE (best-practice fill-in, hedged).

## Source keys
- [irspub] https://www.irs.gov/pub/irs-pdf/p4054.pdf — IRS Publication 4054, quoting "the IRS sends about 170 million notices to individual taxpayers every year" (origin: Treasury Simple Notice Initiative, Jan 23, 2024)
- [treasury] https://home.treasury.gov/news/press-releases — US Treasury "FACT SHEET: IRS Launches Simple Notice Initiative" (Jan 23, 2024): "around 170 million notices to individual taxpayers every year"
- [tas] https://www.taxpayeradvocate.irs.gov/notices/90-day-notice-of-deficiency/ — TAS: Letter 3219 Notice of Deficiency = "90-Day Letter"
- [tasme] https://www.taxpayeradvocate.irs.gov — TAS on "math error" notices that "often do not [describe the reason]"
- [hrblock] https://www.hrblock.com/tax-center/irs/audits-and-tax-notices/ — H&R Block: 1 in 3 CP2000s result in no additional tax; CP2000 acts as a 30-day letter
- [jh] https://www.jacksonhewitt.com/tax-help/back-taxes/ — Jackson Hewitt: 2019 back-taxes population and OIC numbers; CP2000 = 30-day letter
- [ftc] https://www.ftc.gov/news-events/news/press-releases — FTC enforcement against tax-relief scams (American Tax Relief, 2013; Optima, 2022 reported)
- [taxnotes] https://www.taxnotes.com — "Bigger IRS Role Urged to Protect Taxpayers From OIC 'Mills'" (Oct 2024)
- [canopy] https://www.getcanopy.com/tax-resolution — Canopy tax-resolution software + "Canopy Coworker" AI notice automation
- [cpapilot] https://www.cpapilot.com — "How AI is Transforming IRS Notice Response" (AI copilots for tax firms)
- [omni] https://www.omnitaxhelp.com — OIC FY2024 acceptance 21.4% (7,199 of 33,591)

---

## VOLUME / THE MESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| IRS sends ~170 million notices to individual taxpayers a year | VERIFIED | [irspub], [treasury] | "the IRS sends about 170 million notices to individual taxpayers every year" (Pub 4054, quoting Treasury Simple Notice Initiative) |
| The IRS itself concedes its notices are long and confusing | VERIFIED | [treasury], [tasme] | Treasury launched a "Simple Notice Initiative" to make "often confusing notices … shorter and simpler"; TAS: math-error notices "often do not [explain the reason]" |
| ~4 million CP2000 underreporter notices issued per year | VERIFIED | [hrblock] | EA Journal/Beancount corroborate "over 4 million"; IRS AUR program issues them on income mismatches |
| 1 in 3 CP2000 notices result in NO additional tax owed | VERIFIED | [hrblock] | "IRS statistics show that one out of every three CP2000 notices … doesn't result in the taxpayer owing more taxes" |

## DEADLINES / PROCESS

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| CP2000 gives ~30 days to respond / request appeal | VERIFIED | [jh], [hrblock] | "the CP2000 letter serves as your 30-day letter, meaning you have 30 days to respond and request an appeal" |
| Ignoring it leads to a Notice of Deficiency (Letter 3219), the "90-Day Letter" | VERIFIED | [tas] | "Letter 3219, Notice of Deficiency (also referred to as a 90-Day Letter), is a taxpayer's legal notice that the IRS is proposing a deficiency" |
| 90 days to petition the U.S. Tax Court, else tax/penalties/interest are assessed | VERIFIED | [tas], [jh] | TAS 90-Day Notice page; "gives you 90 days to petition the U.S. Tax Court" before assessment |

## MARKET / MONEY

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| ~20 million taxpayers owed ~$539 billion in back taxes (2019) | VERIFIED | [jh] | "In 2019, of 20 million taxpayers who owed $539 billion in back taxes, only 54,225 of them applied for an OIC, and the IRS accepted only 17,890" |
| The advertised remedy (OIC) is rarely used and rarely accepted | VERIFIED | [jh], [omni] | 2019: 17,890 accepted of 54,225 applied (of 20M who owed); FY2024: "21.4% of OIC applications … 7,199 out of 33,591 submitted" ([omni]) |

## PREDATORY INCUMBENTS / WHITESPACE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| The "tax relief" industry has a documented fraud record | VERIFIED | [ftc] | FTC (2013): "Tax Relief Scammers Agree to Pay More Than $15 Million … bilked consumers out of more than $100 million by falsely claiming they could reduce their tax debts" (American Tax Relief) |
| Regulators warn of OIC "mills" selling "pennies on the dollar" | VERIFIED | [taxnotes] | "Bigger IRS Role Urged to Protect Taxpayers From OIC 'Mills'"; "advertisements proclaim you can settle IRS tax debt for 'pennies on the dollar'" |
| The largest firm (Optima) faces FTC action + class suits | INFERRED | [ftc] | FTC's 2022 action against Optima Tax Relief reportedly settled for $12M (secondary); class actions allege upfront fees with undelivered results |
| AI tooling exists but targets tax PROS, not the taxpayer | VERIFIED | [canopy], [cpapilot] | canopy: "Canopy Coworker automates tax notice workflows and summarizes IRS transcripts"; cpapilot: "AI tools streamline IRS notice handling … helping tax firms stay fast" |
| The open slot is an autonomous, taxpayer-facing notice→response agent | INFERRED | [canopy], [cpapilot], [ftc] | Incumbents are predatory/high-fee human firms, DIY consumer prep, or AI copilots for firms → no honest, low-cost agent that reads the taxpayer's own notice, computes the right response/remedy, and drafts+files it |
