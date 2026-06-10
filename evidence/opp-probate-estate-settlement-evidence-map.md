# Probate & estate settlement — opportunity evidence map

Crawled 2026-06-10 via claude-in-chrome (logged-out). First-party where possible (EstateExec's own study, Alix's own site, vendor homepages); market/volume figures from named research bodies (Cerulli, NCSC) captured via Google result snippets + secondary citations and tiered accordingly.
Tiers: VERIFIED (stated on a public page) · INFERRED (reasoned from a cited signal, incl. secondary citation of a primary body) · SPECULATIVE (best-practice fill-in, hedged).

## Source keys
- [cerulli] https://www.cerulli.com/press-releases/cerulli-anticipates-84-trillion-in-wealth-transfers-through-2045 (figure captured via Google result snippet; direct nav declined in session)
- [estateexec-stats] https://www.estateexec.com/Docs/General_Statistics
- [alix] https://www.meetalix.com/
- [alix-bizjournals] https://www.bizjournals.com/ "Alix raises $20 million for AI solution to estate settlement" (Aug 4 2025)
- [alix-yahoo] https://finance.yahoo.com/news/ "Alix Secures $20M Series A to Transform Estate Settlement" (Jul 21 2025)
- [alix-digwatch] https://dig.watch/ "Democratising inheritance: AI tool handles estate…" (Jul 26 2025)
- [swiftprobate-alix] https://www.swiftprobate.com/compare "SwiftProbate vs Alix" (Apr 2026)
- [ncsc-via] https://www.probatecourtbond.com/ probate statistics (cites NCSC Annual Report 2023) — secondary
- [findlaw-steps] https://www.findlaw.com/ "Probate Process and Timeline"
- [ca-fees-flas] https://flasllp.com/ "How Much Does Probate Cost in California in 2025?"
- [ca-fees-catalina] https://www.catalinastructuredfunding.com/ "California Probate Fees: What an Estate Actually Pays"
- [ca-rule] https://courts.ca.gov/ Rule 7.705 — Calculation of statutory compensation
- [atticus] https://www.weareatticus.com/
- [clearestate] https://www.clearestate.com/
- [estateably] https://www.estateably.com/

---

## MARKET / VOLUME

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Wealth transferred through 2045 will total $84.4T; $72.6T to heirs, $11.9T to charity | VERIFIED | [cerulli] | "Cerulli projects that wealth transferred through 2045 will total $84.4 trillion—$72.6 trillion in assets will be transferred to heirs, while $11.9 trillion will [be donated to charity]" |
| ~2.6M probate cases filed annually in US state courts | INFERRED | [ncsc-via] | "Approximately 2.6 million probate cases are filed annually in state courts across the U.S. (NCSC Annual Report, 2023)." (secondary citation of NCSC) |
| 15–40% of all deaths result in probate | INFERRED | [ncsc-via] (academic, via Bogleheads quote in search) | "previous studies determined that between 15 and 40% of all deaths resulted in probate" |
| Typical estate at settlement worth $50–250K; 11% <$10K, 11% >$1M | VERIFIED | [estateexec-stats] | "The typical estate at the time of settlement is worth between $50-$250K, with 11% under $10K, and 11% over $1M." |
| Only estates >$13M owe US estate tax; <0.1% of estates | VERIFIED | [estateexec-stats] | "In 2024, only estates worth >$13M are subject to US estate tax … very few are subject to federal estate tax (some estimates place this at <0.1%)." |

## TIME / EFFORT / COST (EstateExec study, n>1,200, ±3%)

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| ~16 months avg to settle an estate; ~80% within 18 months | VERIFIED | [estateexec-stats] | "On average, it takes almost 16 months to settle an estate … Roughly 80% of all estates are settled within 18 months." |
| ~570 hours of executor effort on average | VERIFIED | [estateexec-stats] | "It takes an executor roughly 570 hours of effort on average to settle an estate." |
| Avg $12.4K on legal and accounting fees | VERIFIED | [estateexec-stats] | "The average estate spent $12.4K on legal and accounting fees, with more spending at the high end of estate values." |
| Avg reported executor compensation $18K | VERIFIED | [estateexec-stats] | "The average reported executor compensation was $18K…" |
| Over 44% experienced or aware of family conflict during settlement | VERIFIED | [estateexec-stats] | "Over 44% of respondents had experienced or were aware of such family conflict." |
| Total probate cost typically 4–7% of gross estate (national) | VERIFIED | [ca-fees-flas], Estate & Probate Legal Group (search) | "Total California probate costs typically range from 4 to 7 percent of the gross estate"; "The cost to settle an estate is on average 4% to 7% of the estate value" |
| CA statutory fee: 4% first $100K, 3% next $100K, 2% next $800K of GROSS estate | VERIFIED | [ca-fees-catalina], [ca-fees-flas], [ca-rule] | "on a graduated percentage of the estate's gross value. The schedule is 4 percent of the first $100,000, 3 percent…"; FLAS: "First $100,000 / 4% / $4,000; Next $100,000 / 3% / $3,000; Next $800,000 / 2% / $16,000" |
| CA statutory fee is paid to BOTH attorney and personal representative (each) | INFERRED | [ca-rule], [ca-fees-flas] | Rule 7.705 governs "statutory commissions or attorney fees"; both the PR's commission and the attorney's fee use the same schedule — so a $1M estate ≈ $23K each, ~$46K total |

## WORKFLOW (how it works today)

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| Process = file petition → court appoints PR / issues Letters → notify creditors & beneficiaries → inventory & appraise → pay debts & taxes → final accounting & distribution / close | VERIFIED | [findlaw-steps], Racine Olson & NY firms (search) | Racine: "1. Petition for Probate · 2. Obtaining the Appointment of a Personal Representative · 3. Notifying Creditors · 4. Inventorying the Estate · 5. [pay] · [distribute]"; FindLaw: "Once the probate court determines the will's validity, the executor receives testamentary letters." |
| Court forms and process are county/jurisdiction-specific | INFERRED | [estateexec-stats], [estateably] | EstateExec sells "state-specific guidance"; Estateably is "the first cloud-based platform for estate administrators in Canada" — both productize per-jurisdiction variance, implying no standard |

## INCUMBENTS / WHITESPACE

| Claim | Tier | Source | Quote |
| --- | --- | --- | --- |
| EstateExec = DIY executor software, $199 one-time per estate, AI guidance, "TurboTax for executors" | VERIFIED | [estateexec-stats] | "EstateExec, the #1 Software for Estate Executors"; "Think of EstateExec as something like TurboTax®, but for estate executors"; "pay a one-time $199 licensing fee (per estate)"; "state-specific guidance with AI software" |
| Atticus = "#1 DIY software for executors," software guidance + in-house experts | VERIFIED | [atticus], [swiftprobate-alix] | atticus: "The #1 DIY software for executors dealing with probate or estate settlement"; swift: "combines personalized software guidance with access to an in-house team of industry experts — tax…" |
| ClearEstate = platform + experts handling the entire settlement | VERIFIED | [clearestate] | "ClearEstate is a one-stop-shop for all your estate planning and settlement needs. Our platform and experts will handle the entire settlement process." |
| Estateably = B2B cloud platform for professional estate administrators (Canada), fiduciary accounting + "intelligent automation" | VERIFIED | [estateably] | "Estateably is the first cloud-based platform for estate administrators in Canada"; "reduce administrative burden through intelligent automation" |
| Alix = AI-native estate settlement; Settlement Specialists + AI; estates $20K–$20M; backed by Charles Schwab & Edward Jones | VERIFIED | [alix] | "Alix is a service that helps families after loss, taking care of estate settlement"; "Proven across estates from $20K to $20M"; "Backed by Charles Schwab & Edward Jones"; "Our Settlement Specialists handle the legal, financial, and personal details" |
| Alix raised $20M Series A (Jul 2025), Acrew + Charles Schwab + Edward Jones Ventures | VERIFIED | [alix-yahoo], [alix-bizjournals] | yahoo: "Alix Secures $20M Series A…New financing from Acrew, Charles Schwab, and Edward Jones Ventures"; bizjournals: "Alix raises $20 million to develop AI software that can help settle estates" |
| Alix AI agents scan documents, extract data, pre-populate legal forms | VERIFIED | [alix-digwatch] | "Using AI agents, Alix automates tedious elements of the estate process, including scanning documents, extracting data, pre-populating legal [forms]" |
| Alix pricing ~1% of estate value, ~$9K minimum | INFERRED | [swiftprobate-alix] | "Alix charges 1% of estate value with a $9,000 minimum — so a $500K estate pays $9,000 and a $1.5M estate pays around $15,000." (third-party comparison site) |

## NOTE
EstateExec time/effort/cost figures come from a single vendor's own survey (n>1,200, self-reported, ±3%); treated as VERIFIED-as-stated, with the vendor-survey caveat carried in-text. Cerulli figure captured from the Google result snippet of Cerulli's own press release (direct navigation to cerulli.com was declined in-session); the wording matches Cerulli's published release as echoed by CNBC, Rockefeller, Fiducient et al.
