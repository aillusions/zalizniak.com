// Generated from practice/ cheat-sheet TSVs — re-run scratchpad/gen_cheatsheet_data.py to resync after the source changes.
export interface CheatItem { label: string | null; text: string }
export interface CheatSub { title: string; items: CheatItem[] }
export interface CheatArea { name: string; color: string; subs: CheatSub[] }

export const mathAreas: CheatArea[] = [
	{
		"name": "Common",
		"color": "#1a4d7a",
		"subs": [
			{
				"title": "Percentages & rates",
				"items": [
					{
						"label": "percent change",
						"text": "(next-prev)/prev*100 — denominator is the START value: 80->100=+25%, 100->80=-20% (not symmetric)"
					},
					{
						"label": "percentage points vs percent",
						"text": "40%->50% = +10 points, +25% relative (10/40) — subtract for points, divide by start for percent"
					},
					{
						"label": "relative change, small base",
						"text": "1->3 = +200% — tiny denominator, treat as noise not signal"
					},
					{
						"label": "3x vs +300%",
						"text": "3x = +200%; +300% = 4x"
					},
					{
						"label": "percentages compound, not add",
						"text": "-10% then +10% = 0.99 (net loss), not back to original (1.1*0.9=0.99). General form, multiply the factors: final = start*(1+p1)*(1+p2)*..."
					},
					{
						"label": "reversing a percentage",
						"text": "write the forward equation first: price 80 after 20% off -> old*0.8=80 -> old=100"
					},
					{
						"label": "gross vs net (VAT)",
						"text": "VAT is charged on the net: net*1.2=gross. Recover net: gross/1.2 (never gross*0.8). 1.2 is the factor/multiplier, 20% is the rate"
					},
					{
						"label": "markup vs margin",
						"text": "cost 80, price 100: markup=25% (over cost, 20/80), margin=20% (of price, 20/100). Which to use: setting a price from cost -> markup; reporting profitability -> margin (what investors/accountants use). The trap: a 30% markup is NOT 30% margin — cost 100, price 130, margin is 30/130=23%"
					},
					{
						"label": "chained rates multiply",
						"text": "a pipeline where each stage keeps a fraction of what entered: 1000 people, stage1 keeps 50%->500, stage2 keeps 40% of those->200. Overall 20% (multiply fractions 0.5*0.4)"
					},
					{
						"label": "new value from percent change",
						"text": "decrease: price*(1-percent/100); increase: price*(1+percent/100)"
					},
					{
						"label": "compound growth",
						"text": "(1+r)^n — 5%/month x12 = 1.05^12 = 1.796 (80% rise, not 60%)"
					},
					{
						"label": "rule of 72",
						"text": "doubling time ~ 72/growthPercent"
					}
				]
			},
			{
				"title": "Combinatorics — Definitions",
				"items": [
					{
						"label": "combinatorics",
						"text": "the study of the number of different ways of combining objects"
					},
					{
						"label": "power set",
						"text": "the set of all possible subsets of a given set, including both the empty set and the set itself. No duplicates (not a multiset)"
					},
					{
						"label": "multiset",
						"text": "a set that allows duplicates: each element has a multiplicity, and order doesn't matter"
					},
					{
						"label": "arrangement",
						"text": "the specific linear or positional placement of elements where order matters"
					},
					{
						"label": "selection",
						"text": "picking elements where only membership, not position, matters"
					},
					{
						"label": "cardinality",
						"text": "the number of elements contained in a set"
					},
					{
						"label": "factorial (n!)",
						"text": "n!=n*(n-1)*...*1; 0!=1; 5!=120, 10!=3,628,800. A factorial function overtakes an exponential. No closed form — must loop/recurse: let result=1; for(i=2;i<=n;i++) result*=i (or n<=1?1:n*factorial(n-1))"
					}
				]
			},
			{
				"title": "Combinatorics — Counting techniques",
				"items": [
					{
						"label": "Rule of Sums",
						"text": "If task A can be done n ways and task B m ways, and they can't both happen, there are n + m ways to do either. Formula: n + m. Use cases: Picking one dessert: 4 cakes or 3 pies -> 7"
					},
					{
						"label": "Rule of Products",
						"text": "If task A can be done n ways and task B m ways, and both must be done, there are n * m ways. Formula: n * m. Use cases: Outfits: 3 shorts x 4 tops -> 12, Menu: 4 mains x 3 drinks -> 12"
					},
					{
						"label": "Permutation",
						"text": "An ordered arrangement of all elements from a set. AKA: full permutation. Formula: n! Use cases: seating people at a table, shuffling a deck of cards, delivery route planning, ordering a playlist. Seating at a round table is a circular permutation, (n-1)!. Straight row is n!."
					},
					{
						"label": "Variation without repetitions",
						"text": "An ordered arrangement of a subset of k elements from a set of n elements. AKA: k-permutation, partial permutation. Formula: n! / (n-k)!. Use cases: podium — gold/silver/bronze from 10 runners; 302 neurons, directed connections: k-permutations P(n, k), so P(302, 2) = pick 2 from 302, in order = 302!/300! = 302x301."
					},
					{
						"label": "Variations with repetition",
						"text": "An ordered arrangement of a subset of k elements from a set of n elements with duplications. Formula: n^k. Use cases: fixed-length codes, keyspaces, password combinations, PIN numbers, dice rolls (6^k), binary strings of length k (2^k)."
					},
					{
						"label": "Combination without repetitions (subset)",
						"text": "An unordered selection of k elements from a set of n elements. Formula: n! / (k!(n-k)!). Use cases: choosing a team/committee (e.g. 3 of 10 people group), card hands (e.g. 5 of 52 cards)"
					},
					{
						"label": "Combination with repetition (multiset)",
						"text": "is a unordered selection of size k from a set of n elements with duplications. AKA: multiset coefficient, stars and bars. Formula: (n+k-1)! / (k!(n-1)!). Use cases: choosing 3 scoops of ice cream from 5 flavors. Stars and bars"
					},
					{
						"label": "Power sets",
						"text": "power set cardinality / total subsets. Formula: (2^n): Use cases: bitmasking, include/exclude decisions"
					}
				]
			},
			{
				"title": "Estimation & orders of magnitude",
				"items": [
					{
						"label": "multiply by hand",
						"text": "lead x 10^exp, multiply leads, add exponents: 2e5*3e3=6e8; carry when lead>=10: 4e5*5e3=20e8=2e9"
					},
					{
						"label": "dividing by hand",
						"text": "scale both sides to kill the decimal (4.5/1.5 -> 45/15=3), strip trailing zeros (2400/12 -> 24/12=2, restore to 200), or factor the divisor and divide twice (2400/4=600, 600/3=200)"
					},
					{
						"label": "log2 = how many halvings",
						"text": "binary search over 1000 items ~ ceil(log2(1000))=10 probes. Base 10 version: every multiply by 10 increases log by 1 — log10 of a number is roughly its digit count minus one"
					},
					{
						"label": "node count of a perfect binary tree by height",
						"text": "2^(h+1)-1 nodes total, 2^h leaves at height h; run backwards: n nodes -> height ~ log2(n)"
					},
					{
						"label": "1+2+...+n",
						"text": "n*(n+1)/2 (n=100 -> 5050); unordered pairs in n items = n*(n-1)/2"
					},
					{
						"label": "fencepost counting",
						"text": "inclusive range day3-day7 = 7-3+1=5 days; half-open [3,7) = 4"
					},
					{
						"label": "growth reflexes",
						"text": "n doubles: linear=2x, nlogn~just over 2x, quadratic=4x, exponential=squared"
					}
				]
			},
			{
				"title": "Statistics",
				"items": [
					{
						"label": "mean",
						"text": "the average: sum divided by count. {1,2,3,4,100} has mean 22 — one outlier drags it far from where most data sits, why percentiles exist"
					},
					{
						"label": "average of averages",
						"text": "wrong unless weighted: total/total, never the mean of per-group means. Example: server A 900 reqs @10ms, B 100 reqs @100ms. Wrong: (10+100)/2=55ms. Right: (900*10+100*100)/(900+100)=19ms"
					},
					{
						"label": "median",
						"text": "the middle value of sorted data, or the average of the two middle values. {1,2,3,4,100} has median 3 — unlike the mean, one extreme value barely moves it"
					},
					{
						"label": "mode",
						"text": "the most frequently occurring value. Rarely useful for continuous data (latencies, prices) since ties are common; more useful for categorical data (most common error code, most common browser)"
					},
					{
						"label": "percentile",
						"text": "the value below which a given percentage of the data falls, p50 is the median, p95 means 95% of values are at or below it. Array formula and worked example: see average vs p95 below"
					},
					{
						"label": "variance",
						"text": "the average of the squared differences from the mean — squaring makes it always positive and penalizes big deviations more than small ones"
					},
					{
						"label": "standard deviation",
						"text": "the square root of variance, back in the same units as the data (variance is squared units, rarely reported directly). Ties to z-score below"
					},
					{
						"label": "expected value",
						"text": "the average outcome over many repeats: for each outcome, multiply probability x payoff, sum them. Coin flip: 50%x$10+50%x$0=$5. Engineering: 1% chance of 10hr outage per deploy = 0.01*10=6 min expected downtime per deploy"
					},
					{
						"label": "average vs p95",
						"text": "latencies 1..100: mean=50.5, p95=95, p99=99 — mean hides the tail"
					},
					{
						"label": "prob. of at least one failure",
						"text": "1-(1-p)^n — p=1%, n=100 -> 63.4%"
					},
					{
						"label": "probability, one-off",
						"text": "rolling a standard 6-sided die: the chance of rolling a duplicate \"4\" on your next turn is always 1/6 (approx 16.7%)"
					},
					{
						"label": "tail latency under fanout",
						"text": "per-server p99 becomes the median user experience at scale (1-0.99^100=63%)"
					},
					{
						"label": "collision intuition (birthday)",
						"text": "~50% collision after ~1.18*sqrt(m) draws from m — 32-bit ids collide by ~77,000 draws"
					},
					{
						"label": "skewed / long-tail distributions",
						"text": "most engineering data (latencies, request sizes) is right-skewed, not a bell curve: a long tail of rare huge values drags the mean above where most data sits. Why percentiles matter more than the mean for latency"
					},
					{
						"label": "correlation vs causation",
						"text": "two things moving together doesn't prove one causes the other, a third factor could drive both. Dashboard trap: \"errors rose right after the deploy\" could be a coincident traffic spike, not the deploy — check a control group or a deploy-free period before concluding cause"
					},
					{
						"label": "regression to the mean",
						"text": "an extreme reading tends to be followed by a more typical one from randomness alone, even with no real change. Trap: restarting a server after a latency spike gets credited for a recovery that would've happened anyway"
					},
					{
						"label": "sample size / signal vs noise",
						"text": "a rate over a small sample swings wildly and means little (same shape as the relative-change-on-a-small-base row in Percentages & rates, applied to experiments). A/B test with 10 visitors per variant proves nothing; 10,000 per variant might"
					},
					{
						"label": "survivorship bias",
						"text": "analyzing only cases that survived a filter, missing the ones filtered out, skews the conclusion. Latency dashboards from completed-request logs miss timed-out requests (looks faster than reality); satisfaction surveys miss churned users (looks happier than reality)"
					},
					{
						"label": "z-score / anomaly threshold",
						"text": "z=(value-mean)/stddev, how many std devs from the mean. \"3-sigma\" alerting flags values >3 std devs out as anomalous (~0.3% of readings for a normal distribution). Breaks down for skewed metrics like latency — use percentile thresholds there instead"
					}
				]
			}
		]
	},
	{
		"name": "System Design",
		"color": "#a3121a",
		"subs": [
			{
				"title": "Powers of 2 → powers of 10 (2¹⁰ ≈ 10³ approximation)",
				"items": [
					{
						"label": "2¹⁰ ≈ 10³",
						"text": "thousand, KB"
					},
					{
						"label": "2²⁰ ≈ 10⁶",
						"text": "million, MB"
					},
					{
						"label": "2³⁰ ≈ 10⁹",
						"text": "billion, GB"
					},
					{
						"label": "2⁴⁰ ≈ 10¹²",
						"text": "trillion, TB"
					},
					{
						"label": "2⁵⁰ ≈ 10¹⁵",
						"text": "quadrillion, PB"
					}
				]
			},
			{
				"title": "Powers of 10 (K/M/B/T/P)",
				"items": [
					{
						"label": null,
						"text": "1 = 10⁰"
					},
					{
						"label": null,
						"text": "10 = 10¹"
					},
					{
						"label": null,
						"text": "100 = 10²"
					},
					{
						"label": null,
						"text": "1 K = 10³"
					},
					{
						"label": null,
						"text": "10 K = 10⁴"
					},
					{
						"label": null,
						"text": "100 K = 10⁵"
					},
					{
						"label": null,
						"text": "1 M = 10⁶"
					},
					{
						"label": null,
						"text": "10 M = 10⁷"
					},
					{
						"label": null,
						"text": "100 M = 10⁸"
					},
					{
						"label": null,
						"text": "1 B = 10⁹"
					},
					{
						"label": null,
						"text": "10 B = 10¹⁰"
					},
					{
						"label": null,
						"text": "100 B = 10¹¹"
					},
					{
						"label": null,
						"text": "1 T = 10¹²"
					},
					{
						"label": null,
						"text": "10 T = 10¹³"
					},
					{
						"label": null,
						"text": "100 T = 10¹⁴"
					},
					{
						"label": null,
						"text": "1 P = 10¹⁵"
					}
				]
			},
			{
				"title": "Powers of 2",
				"items": [
					{
						"label": null,
						"text": "2⁰ = 1"
					},
					{
						"label": null,
						"text": "2¹ = 2"
					},
					{
						"label": null,
						"text": "2² = 4"
					},
					{
						"label": null,
						"text": "2³ = 8"
					},
					{
						"label": null,
						"text": "2⁴ = 16"
					},
					{
						"label": null,
						"text": "2⁵ = 32"
					},
					{
						"label": null,
						"text": "2⁶ = 64"
					},
					{
						"label": null,
						"text": "2⁷ = 128"
					},
					{
						"label": null,
						"text": "2⁸ = 256"
					},
					{
						"label": null,
						"text": "2⁹ = 512"
					},
					{
						"label": null,
						"text": "2¹⁰ = 1024"
					}
				]
			},
			{
				"title": "Little's Law — L = λ × W",
				"items": [
					{
						"label": null,
						"text": "things in the system = arrival rate × time each one stays"
					},
					{
						"label": "in flight = rate × handling time",
						"text": "1.6k/s × 8 s = 12.8k"
					},
					{
						"label": "max rate = ceiling / handling time",
						"text": "120k / 30 s = 4k/s"
					},
					{
						"label": "wait time = backlog / service rate",
						"text": "200 / 0.08/s = 40 min"
					},
					{
						"label": "same one law, solved for each variable",
						"text": "works for anything with a queue in front: SQS in-flight, thread pools, connection pools, Lambda concurrency"
					}
				]
			},
			{
				"title": "Known scale numbers",
				"items": [
					{
						"label": null,
						"text": "big social net DAU ≈ 1 B"
					},
					{
						"label": null,
						"text": "read:write (read-heavy) ≈ 100:1 → scale READS"
					},
					{
						"label": null,
						"text": "32-bit int = 4 B values"
					},
					{
						"label": null,
						"text": "64-bit int = 1.8×10¹⁹ values"
					},
					{
						"label": null,
						"text": "URL shortener writes/day ≈ 10M-100M (bit.ly-ish; 1B/day = too high unless told \"massive scale\")"
					},
					{
						"label": null,
						"text": "Twitter/X posts/day ≈ 500M (~5-6k QPS avg, ~10x peak)"
					},
					{
						"label": null,
						"text": "generic big consumer app ≈ 100M-1B DAU (pick DAU, derive the rest)"
					},
					{
						"label": null,
						"text": "Netflix streaming-hours/day ≈ 100M"
					},
					{
						"label": null,
						"text": "Google searches/sec ≈ 100k"
					},
					{
						"label": null,
						"text": "Wikipedia total storage ≈ 100 GB"
					},
					{
						"label": null,
						"text": "Twitter/X daily active users ≈ 250M"
					}
				]
			},
			{
				"title": "Known server sizes (AWS) — so an estimate can be checked against something real",
				"items": [
					{
						"label": null,
						"text": "general-purpose instance ≈ 512 GiB RAM, 128 vCPUs (e.g. M6i.32xlarge)"
					},
					{
						"label": null,
						"text": "memory-optimized instance ≈ 4 TB RAM (e.g. X1e.32xlarge), up to 24 TB RAM (e.g. U-24tb1.metal)"
					},
					{
						"label": null,
						"text": "local SSD storage on one instance ≈ 60 TB (e.g. i3en.24xlarge)"
					},
					{
						"label": null,
						"text": "local HDD storage on one instance ≈ 336 TB (e.g. D3en.12xlarge)"
					},
					{
						"label": null,
						"text": "object storage (S3-style) ≈ no practical limit, petabyte-scale is normal"
					},
					{
						"label": null,
						"text": "network speed inside one datacenter ≈ 25 Gbps on standard instances, 50-100+ Gbps on high-performance instances"
					}
				]
			},
			{
				"title": "Storage sizing recipe",
				"items": [
					{
						"label": null,
						"text": "storage = item count × bytes per item × replication factor × retention"
					},
					{
						"label": null,
						"text": "typical byte sizes: 1 char ≈ 1 B, URL row ≈ 500 B, tweet ≈ 300 B, UUID ≈ 16 B, timestamp ≈ 8 B, thumbnail ≈ 10 KB, photo ≈ 1 MB, minute of video ≈ 10-50 MB"
					},
					{
						"label": "example: 10M users × 2 KB each × 3 replicas = 60 GB",
						"text": "small enough for one node, and knowing that it's small is the answer. Classic omissions: the replication factor, and indexes (rule of thumb: double the total)"
					}
				]
			},
			{
				"title": "Type sizes (bytes)",
				"items": [
					{
						"label": null,
						"text": "char/ASCII = 1"
					},
					{
						"label": null,
						"text": "boolean = 1"
					},
					{
						"label": null,
						"text": "int = 4"
					},
					{
						"label": null,
						"text": "bigint/long = 8"
					},
					{
						"label": null,
						"text": "float = 4"
					},
					{
						"label": null,
						"text": "double = 8"
					},
					{
						"label": null,
						"text": "timestamp = 8"
					},
					{
						"label": null,
						"text": "UUID = 16 raw / 36 string"
					},
					{
						"label": null,
						"text": "decimal/numeric ≈ 2 B per ~4 digits + overhead"
					},
					{
						"label": null,
						"text": "row overhead ≈ 20–40"
					}
				]
			},
			{
				"title": "Latency",
				"items": [
					{
						"label": null,
						"text": "L1 cache ref = 1 ns"
					},
					{
						"label": null,
						"text": "RAM = 100 ns"
					},
					{
						"label": null,
						"text": "SSD = 100 µs"
					},
					{
						"label": null,
						"text": "disk = 10 ms"
					},
					{
						"label": null,
						"text": "same-DC RTT = 0.5 ms"
					},
					{
						"label": null,
						"text": "cross-country RTT = 80 ms"
					},
					{
						"label": null,
						"text": "CA <-> Netherlands RTT = 150 ms"
					},
					{
						"label": null,
						"text": "memory trick: RAM 100ns -> SSD 100µs -> disk 10ms (each ~100-1000x the last)"
					},
					{
						"label": null,
						"text": "read 1 MB from memory ≈ 10 µs"
					},
					{
						"label": null,
						"text": "read 1 MB from SSD ≈ 100 µs-1 ms"
					},
					{
						"label": null,
						"text": "read 1 MB over 1 Gbps net ≈ 10 ms"
					}
				]
			},
			{
				"title": "Short-code / keyspace sizing",
				"items": [
					{
						"label": "62^L via 62~2^6 chain",
						"text": "62^5~2^30~900M, 62^6~2^36~57B, 62^7~2^42~3.5T, 62^8~2^48~200T"
					},
					{
						"label": "code length",
						"text": "pick smallest 62^L >= demand; demand = new/day x 365 x years"
					},
					{
						"label": "horizon barely moves length",
						"text": "each extra char is x62 capacity; extra years only multiply demand a little — x10 can't cross a x62 gap"
					},
					{
						"label": "headroom",
						"text": "keyspace >= ~10x demand so random codes rarely collide"
					}
				]
			},
			{
				"title": "QPS & scaling direction",
				"items": [
					{
						"label": "read QPS from R:W ratio",
						"text": "100:1 means far more reads than writes -> scale READS"
					}
				]
			},
			{
				"title": "Storage & bandwidth",
				"items": [
					{
						"label": "bytes for a row",
						"text": "int=4, bigint/double=8, +20-40B/row overhead (Postgres)"
					},
					{
						"label": "chars vs bytes",
						"text": "Twitter's 280 is code points, not bytes on disk"
					}
				]
			},
			{
				"title": "Capacity & units",
				"items": [
					{
						"label": "availability multiplies",
						"text": "5 services at 99.9% each = 0.999^5 = 99.5%"
					},
					{
						"label": "requests/sec from daily total",
						"text": "total/86400 (86400 = seconds/day, memorize)"
					},
					{
						"label": "MB vs MiB",
						"text": "1024^2 vs 1e6 (4.9% apart); 1024^3 vs 1e9 (7.4% apart) — gap grows with each step up"
					},
					{
						"label": "bits vs bytes",
						"text": "divide by 8 — a \"100 Mbps\" link moves 12.5 MB/s"
					},
					{
						"label": "string bytes depend on runtime",
						"text": "UTF-8/disk: per-char (A + CJK = 1+3=4B). UTF-16(JS/Java): flat 2B/char. Python3: whole string widens to widest char"
					},
					{
						"label": "transfer time",
						"text": "size/bandwidth: 50GB over 100Mbps = size*8/bandwidth ~ 67 min"
					},
					{
						"label": "bandwidth needed",
						"text": "requests/sec x payload size (x8 to convert bytes to bits)"
					},
					{
						"label": "availability -> downtime budget",
						"text": "99.9%=43.2min/mo, 99.99%=4.3min, 99.999%=26s — each extra nine divides by 10"
					},
					{
						"label": "time-unit ladder",
						"text": "1ms=1000us=1e6ns"
					}
				]
			}
		]
	},
	{
		"name": "TypeScript",
		"color": "#1a6b3a",
		"subs": [
			{
				"title": "Operators & precedence",
				"items": [
					{
						"label": "** right-associative",
						"text": "2**3**2 = 512 (groups right); ** binds tighter than *, no parens needed for 100*2**n"
					},
					{
						"label": "% sign follows the dividend",
						"text": "-7 % 3 = -1, 7 % -3 = 1. Non-negative form: ((n%m)+m)%m"
					},
					{
						"label": "safe cyclic wraparound",
						"text": "((i % n) + n) % n — previous index in a ring buffer"
					},
					{
						"label": "trunc vs floor vs |0 (negatives)",
						"text": "-7/2: trunc=-3, floor=-4, |0=-3. floor keeps %,/ consistent; |0 also clips to 32 bits"
					},
					{
						"label": "prefix vs suffix ++/--",
						"text": "arr[i++] reads then increments; arr[++i] increments then reads"
					}
				]
			},
			{
				"title": "Closed forms instead of loops",
				"items": [
					{
						"label": "exponential backoff",
						"text": "base*2**attempt; capped: Math.min(base*2**attempt,maxDelay); jitter goes OUTSIDE the cap"
					},
					{
						"label": "why base**attempt is wrong",
						"text": "units flip between ms/s (100**3 vs 0.1**3) — base is a duration, 2 is the dimensionless growth factor"
					},
					{
						"label": "total time of N retries",
						"text": "geometric series: base*(2**N - 1)"
					},
					{
						"label": "page/chunk count",
						"text": "Math.ceil(total/size), or Math.floor((total+size-1)/size) — never floor(n/size)+1"
					},
					{
						"label": "digit count",
						"text": "Math.floor(Math.log10(n))+1 — breaks at 0 and negatives"
					}
				]
			},
			{
				"title": "Divide & remainder",
				"items": [
					{
						"label": "1D index to 2D grid",
						"text": "row=Math.floor(i/cols), col=i%cols; back: row*cols+col"
					},
					{
						"label": "ms to h:m:s",
						"text": "floor(ms/3600000), floor(ms/60000)%60, floor(ms/1000)%60 — divide for unit, % strips larger units"
					},
					{
						"label": "bucketing a value",
						"text": "Math.floor(value/bucketSize)*bucketSize"
					},
					{
						"label": "distributing a remainder",
						"text": "floor(total/n) each, + (total%n) extras to the first (total%n) shares"
					},
					{
						"label": "hashing into buckets",
						"text": "hash % bucketCount — changing bucketCount moves nearly every key"
					}
				]
			},
			{
				"title": "Rounding, clamping, comparing",
				"items": [
					{
						"label": "Math.round on halves/negatives",
						"text": "round(2.5)=3, round(-2.5)=-2, round(-0.5)=0 (=== 0, distinct as -0) — halves go toward +infinity"
					},
					{
						"label": "rounding to 2dp for JSON",
						"text": "Math.round(n*100)/100 (toFixed returns a string). (1.005).toFixed(2)='1.00', (2.675).toFixed(2)='2.67'"
					},
					{
						"label": "clamp",
						"text": "Math.min(max, Math.max(min, v))"
					},
					{
						"label": "empty-array seeds",
						"text": "Math.min(...[])=Infinity, Math.max(...[])=-Infinity — seed a reduce with these. Math.max(...arr) throws past ~1e5 elements, use reduce"
					}
				]
			},
			{
				"title": "Randomness & sampling",
				"items": [
					{
						"label": "random int in [min,max]",
						"text": "min + Math.floor(Math.random()*(max-min+1))"
					},
					{
						"label": "Fisher-Yates shuffle",
						"text": "for(i=len-1;i>0;i--){j=floor(random()*(i+1)); swap i,j} — sort(()=>random()-0.5) is measurably biased"
					},
					{
						"label": "crypto-safe random",
						"text": "Math.random is not cryptographic — crypto.randomUUID() or crypto.getRandomValues() for tokens/ids"
					},
					{
						"label": "jitter",
						"text": "full: random()*delay; equal: delay/2 + random()*delay/2 — avoids thundering herd"
					},
					{
						"label": "reservoir sampling",
						"text": "unknown-length stream: keep the nth item seen with probability 1/n"
					}
				]
			},
			{
				"title": "Integers, bits & limits",
				"items": [
					{
						"label": "there's only one number type",
						"text": "JS numbers are all 64-bit IEEE 754 doubles: 1 sign bit, 11 exponent bits, 52 fraction bits, exponent -1022 to +1023"
					},
					{
						"label": "MAX_SAFE_INTEGER",
						"text": "2**53-1 = 9007199254740991, 16 digits ~9e15. 2**53+1===2**53 (true) — above it only even integers exist"
					},
					{
						"label": "the integer-skipping problem",
						"text": "the gap between representable integers doubles at every power-of-2 threshold: spacing 2 above 2**53, spacing 4 above 2**54, spacing 8 above 2**55. You lose whole integers, not gradual precision"
					},
					{
						"label": "Number.MAX_VALUE",
						"text": "1.7976931348623157e+308, the largest representable double; past it math overflows silently to Infinity, not a throw. Big and rough (physics, ratios) -> MAX_VALUE is your ceiling; big and exact (ids, counters, cents) -> MAX_SAFE_INTEGER is your ceiling, past it use BigInt"
					},
					{
						"label": "the four extremes",
						"text": "smallest positive: Number.MIN_VALUE=5e-324 (not the same as EPSILON, the smallest gap vs the smallest value). Most negative: -Number.MAX_VALUE=-1.8e308"
					},
					{
						"label": "Infinity / -Infinity",
						"text": "a real value, typeof is 'number'; 1/0=Infinity, -1/0=-Infinity, no exception. Infinity+1===Infinity, but Infinity-Infinity=NaN"
					},
					{
						"label": "large ids over JSON",
						"text": "18-19 digit ids (snowflake) must be sent as strings — JSON.parse already rounded, client-side fix is too late"
					},
					{
						"label": "bigint",
						"text": "10n, typeof 'bigint', never mix with number. 2n**64n = 18446744073709551616n. Only fixes integers (10n/3n=3n, truncated, no decimals) — for exact fractions use decimal.js"
					},
					{
						"label": "Decimal (decimal.js)",
						"text": "a number stored in base 10 instead of base 2, arbitrary-precision via a library not a primitive. new Decimal(0.1).plus(0.2).equals(0.3) -> true. Slower, so for money/exact totals, not hot-path math"
					}
				]
			},
			{
				"title": "Bitwise operators",
				"items": [
					{
						"label": "32-bit truncation",
						"text": "(2**31)|0 = -2147483648, -1>>>0 = 4294967295. Safe midpoint: Math.floor((lo+hi)/2), never (lo+hi)>>1"
					},
					{
						"label": ">> vs >>>",
						"text": "13>>1=6 (floor div by 2). >> keeps sign (-8>>1=-4), >>> does not (-8>>>1=2147483644)"
					},
					{
						"label": "n & 1 odd test",
						"text": "1=odd, 0=even — correct for negatives too (-3&1=1)"
					},
					{
						"label": "flags & masks",
						"text": "set f|=FLAG, clear f&=~FLAG, test (f&FLAG)!==0"
					},
					{
						"label": "a^a / a^0",
						"text": "a^a=0, a^0=a — XOR cancels pairs, finds the one unpaired element"
					},
					{
						"label": "n & (n-1)",
						"text": "clears the lowest set bit; ===0 tests power of two (n>0)"
					}
				]
			},
			{
				"title": "Grid, intervals & distance",
				"items": [
					{
						"label": "4-neighbour offsets",
						"text": "[[-1,0],[1,0],[0,-1],[0,1]] added to [row,col]; up=[-1,0] since row 0 is the top"
					},
					{
						"label": "interval overlap (half-open)",
						"text": "aStart<bEnd && bStart<aEnd"
					},
					{
						"label": "Manhattan vs Euclidean distance",
						"text": "two ways to measure the distance between two points: Math.abs(dx)+Math.abs(dy) for 4-directional grid moves, Math.hypot(dx,dy) (straight line) otherwise"
					},
					{
						"label": "compare distances w/o sqrt",
						"text": "dx*dx+dy*dy orders identically for ranking, costs less"
					},
					{
						"label": "prefix sums",
						"text": "a is the array, pre[i] is the sum of a's first i elements (pre[0]=0): pre[i+1]=pre[i]+a[i]; sum from lo to hi = pre[hi+1]-pre[lo]"
					},
					{
						"label": "midpoint index",
						"text": "a,b are the two bounds (e.g. binary search's lo/hi): Math.floor((a+b)/2)"
					}
				]
			},
			{
				"title": "Heaps, union-find & search-space patterns",
				"items": [
					{
						"label": "binary heap array indexing",
						"text": "children of i: 2i+1, 2i+2; parent: floor((i-1)/2); build-heap starts at floor(n/2)-1"
					},
					{
						"label": "median of a sorted array",
						"text": "n odd: sorted[floor(n/2)]; n even: (sorted[n/2-1]+sorted[n/2])/2 — this even/odd split is why a running median needs two heaps"
					},
					{
						"label": "union-find complexity",
						"text": "path compression + union by rank -> amortized ~O(1) (inverse-Ackermann). naive chain is O(n)/op"
					},
					{
						"label": "binary exponentiation (fast pow)",
						"text": "x**n by squaring is O(log n): halve n, square base, fold in result when n is odd"
					},
					{
						"label": "binary search on the answer",
						"text": "monotonic yes/no predicate over a value range (not an array) -> binary search the range directly"
					},
					{
						"label": "sum without + or -",
						"text": "sum = a^b (no carry), carry = (a&b)<<1; repeat until carry===0"
					}
				]
			},
			{
				"title": "Floats & precision",
				"items": [
					{
						"label": "landmark values",
						"text": "0.1+0.2 = 0.30000000000000004 (small end, decimal notation); 1e16+1===1e16 = true (large end, exponential notation) — both memorized, not derived"
					},
					{
						"label": "exponent notation",
						"text": "3e-4 puts the 3 in the 4th decimal place"
					},
					{
						"label": "float tolerance compare",
						"text": "Math.abs(a-b) < 1e-9 (domain-derived), never === after arithmetic. Number.EPSILON ~ 2.2e-16 (2**-52), only the gap at magnitude 1, not universal"
					},
					{
						"label": "float + not associative",
						"text": "(0.1+0.2)+0.3 !== 0.1+(0.2+0.3); never assert exact equality between two recomputed totals, sum small-to-large"
					},
					{
						"label": "money as integer cents",
						"text": "convert in: Math.round(dollars*100) (floor loses a cent: 19.99*100=1998.9999999999998); display: (cents/100).toFixed(2). This is fixed-point (decimal spot implied by the scale factor), vs floating-point where each value stores its own exponent"
					},
					{
						"label": "boundary guard on Number(x)",
						"text": "Number.isFinite(n) is accept-test, Number.isNaN(n) is reject-test. Number('')===0, Number('   ')===0"
					},
					{
						"label": "NaN poisons silently",
						"text": "convert first, then validate with isFinite/isNaN — never regex the raw string first"
					}
				]
			}
		]
	},
	{
		"name": "Vocabulary",
		"color": "#6a3d9a",
		"subs": [
			{
				"title": "",
				"items": [
					{
						"label": "numerator",
						"text": "top number of a fraction, the part being divided"
					},
					{
						"label": "denominator",
						"text": "bottom number of a fraction, what you're dividing by (never 0)"
					},
					{
						"label": "dividend",
						"text": "the number being divided (in a / b, a is the dividend)"
					},
					{
						"label": "divisor",
						"text": "the number you're dividing by (in a / b, b is the divisor)"
					},
					{
						"label": "denominator vs divisor",
						"text": "same number, different context. Divisor: division, 10/2, the 2. Denominator: fractions, 3/4, the 4 (bottom)"
					},
					{
						"label": "quotient",
						"text": "the result of a division"
					},
					{
						"label": "remainder",
						"text": "what's left over after integer division (a % b)"
					},
					{
						"label": "factor",
						"text": "generally, one of the things multiplied in a product, not just whole numbers (1.5 is a factor of 6=1.5x4). In number theory specifically it narrows to a whole number that divides another exactly — the sense used elsewhere on this board"
					},
					{
						"label": "to factor",
						"text": "breaking something into the pieces that multiply back to it, a number (12=4x3) or a polynomial (x^2-1=(x-1)(x+1)). Whole-number version used in dividing by hand: 2400/12 becomes 2400/4=600, then 600/3=200"
					},
					{
						"label": "multiple",
						"text": "a number you get by multiplying another by an integer"
					},
					{
						"label": "coefficient",
						"text": "the constant multiplied onto a variable, the 2 in 2x"
					},
					{
						"label": "exponent",
						"text": "the small raised number showing repeated multiplication, the n in x^n"
					},
					{
						"label": "base",
						"text": "the number being raised to a power (x in x^n); also the radix in base-2/base-10/base-62"
					},
					{
						"label": "polynomial",
						"text": "an expression made of variables raised to whole-number powers, multiplied by coefficients, added together: 3x^2+2x-5. Named by its highest exponent (the degree): degree 1=linear, 2=quadratic, 3=cubic"
					},
					{
						"label": "reciprocal",
						"text": "1 divided by a number, flips numerator and denominator"
					},
					{
						"label": "logarithm",
						"text": "inverse of exponentiation: what power do I raise the base to, to get this number. base 2 = binary log (log2/lg, halvings), base 10 = common log (log10, digit count), base e~2.71828 = natural log (ln, continuous growth)"
					},
					{
						"label": "monotonic",
						"text": "always increasing, or always decreasing, never both"
					},
					{
						"label": "magnitude",
						"text": "the size of a number ignoring sign; order of magnitude is the power of 10 it's closest to (100 and 400 are the same order, 100 and 4000 aren't)"
					},
					{
						"label": "fixed-point",
						"text": "a number stored as a plain integer at an implied, constant decimal position, e.g. money as integer cents (150 = $1.50)"
					},
					{
						"label": "floating-point",
						"text": "a number whose decimal position is stored per-value as an exponent, huge dynamic range but uneven precision (IEEE 754 double, what JS numbers are)"
					},
					{
						"label": "sampling",
						"text": "picking a subset of a population or stream to stand in for the whole, instead of processing everything; reservoir sampling picks one item fairly from a stream you can't buffer"
					},
					{
						"label": "hypotenuse /haɪˈpɒtənjuːs/",
						"text": "the longest side of a right triangle, opposite the right angle, length sqrt(dx*dx+dy*dy). Math.hypot(dx,dy) computes it directly, avoiding overflow from squaring large values yourself"
					},
					{
						"label": "Fibonacci number",
						"text": "each number is the sum of the two before it: 0,1,1,2,3,5,8,13,21,...; F(n)=F(n-1)+F(n-2). Canonical example for recursion vs memoization: naive is exponential, caching makes it linear"
					},
					{
						"label": "pi (π)",
						"text": "ratio of a circle's circumference to its diameter, ~3.14159, irrational. Shows up on this board as a memorization trick, not geometry: seconds/year ~ pi x 10^7"
					},
					{
						"label": "mantissa",
						"text": "the fraction/significand part of a float, the digits scaled by the exponent; in a 64-bit double this is the 52 fraction bits"
					},
					{
						"label": "single-precision",
						"text": "32-bit float format: 1 sign, 8 exponent, 23 mantissa bits; C/Java's float"
					},
					{
						"label": "double-precision",
						"text": "64-bit float format: 1 sign, 11 exponent, 52 mantissa bits; C/Java's double, and the only numeric type JS has. Float is used colloquially as the umbrella term for any float format, which is why JS still says float even though every JS number is a double"
					},
					{
						"label": "multiplier",
						"text": "the factor you multiply by to apply a percent change in one step: 1+p, p is the percent as a decimal. +10% -> multiplier 1.1. -10% -> multiplier 0.9"
					},
					{
						"label": "rate",
						"text": "a ratio comparing two quantities, usually across different units or over time (speed, interest, error rate). Meaningless without its denominator stated — \"500 errors\" is not a rate, \"500 errors per 2M requests\" is. Two forms: 20% is the percentage form, 0.2 is the decimal form (what goes into a formula)"
					},
					{
						"label": "arithmetic progression sum",
						"text": "n terms from a, step d: n/2*(2a+(n-1)d), or n*(first+last)/2; 1+2+...+n is the a=1,d=1 case. This is LINEAR growth: each term adds a fixed amount, nth term = a+(n-1)*d"
					},
					{
						"label": "geometric progression sum",
						"text": "n terms from a, ratio r: a*(r^n-1)/(r-1); backoff total (a=base,r=2) and tree node count (a=1,r=2) are both this. This is EXPONENTIAL growth: each term multiplies by r, nth term = a*r^(n-1)"
					}
				]
			}
		]
	}
];
