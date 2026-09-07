// Generated from practice/paradigm-fp/fp-cheatsheet-pdf.py — re-run scratchpad/gen_fp_cheatsheet.py to resync after the source changes.
export interface CheatItem { label: string | null; text: string }
export interface CheatSub { title: string; items: CheatItem[] }
export interface CheatArea { name: string; color: string; subs: CheatSub[] }

export const fpAreas: CheatArea[] = [
	{
		"name": "Functional Programming",
		"color": "#1a4d7a",
		"subs": [
			{
				"title": "The three commitments",
				"items": [
					{
						"label": "functions are values",
						"text": "you pass them, return them, and build big ones out of small ones — composition becomes the main tool instead of inheritance or mutation"
					},
					{
						"label": "data doesn't change",
						"text": "you make new values instead of updating old ones — once you can't mutate, most FP techniques stop being style choices and become necessities"
					},
					{
						"label": "effects are visible, pushed to the edges",
						"text": "I/O, throwing, the clock — the interesting parts, kept out of the middle of the program; some languages/libraries name this in the type system, plain TS does it by convention (a pure core, an effectful shell)"
					}
				]
			},
			{
				"title": "Foundations",
				"items": [
					{
						"label": "expressions vs statements",
						"text": "prefer a form that hands back a value (a ternary, a lookup table) over one that requires mutating an outer variable in each branch to observe the result"
					},
					{
						"label": "pure function — the two conditions",
						"text": "same input always gives the same output, and the call touches nothing outside itself (no I/O, no mutation, no hidden state)"
					},
					{
						"label": "referential transparency",
						"text": "a call can be replaced by its result without changing the program — the reason a pure call's result can be safely cached or hoisted"
					},
					{
						"label": "hoisting a call out of a loop",
						"text": "safe only when the call's inputs and output never change between iterations — no dependency on the loop variable, and no hidden randomness/clock"
					},
					{
						"label": "idempotence vs purity",
						"text": "different axes — idempotent means repeat calls leave the resource in the same end state; purity means the call touches nothing outside itself. Neither implies the other"
					},
					{
						"label": "which HTTP verbs are idempotent by convention",
						"text": "GET, HEAD, PUT, DELETE, OPTIONS are idempotent by convention; POST is not, and PATCH isn't guaranteed either"
					},
					{
						"label": "structural sharing",
						"text": "the reason immutable updates are cheap — the new object reuses the untouched subtrees, so cost is proportional to the path changed, not the data size"
					},
					{
						"label": "recursion in place of loops; accumulators; tail calls",
						"text": "a loop with a mutable counter becomes a recursive function passing the running total as a parameter; a tail call is a recursive call in return position — V8 has no tail-call elimination, so this is a style idea in JS, not a performance guarantee"
					}
				]
			},
			{
				"title": "Functions as building blocks",
				"items": [
					{
						"label": "higher-order function",
						"text": "a function that takes or returns a function"
					},
					{
						"label": "closures",
						"text": "a function remembers the variables from the scope it was created in, even after that scope has returned — the mechanism behind partial application, currying, memoization, and private state without a class"
					},
					{
						"label": "currying vs partial application",
						"text": "currying turns an n-ary function into n unary ones; partial application fixes some arguments and returns a function of the rest — `bind` is partial application, not currying"
					},
					{
						"label": "`compose` vs `pipe` — direction",
						"text": "`pipe(f,g)(x)` is `g(f(x))`, left to right; `compose(f,g)(x)` is `f(g(x))`, right to left"
					},
					{
						"label": "argument order is a design decision",
						"text": "data-last (`filter(pred)(list)`) makes a pipeline composable; data-first (`filter(list, pred)`) makes it readable standalone — FP libraries put the data last"
					},
					{
						"label": "point-free, and when it stops paying",
						"text": "`users.map(getName)` over `users.map(u => getName(u))` is a win; a long combinator chain with no named intermediate is not"
					},
					{
						"label": "the combinators worth naming",
						"text": "`identity`, `constant`, `tap` (run an effect, return the input untouched), `once`, `negate`"
					},
					{
						"label": "`reduce` is the general fold",
						"text": "`map` and `filter` are both expressible as a `reduce`; the reverse is not true — but a `reduce` that mutates its accumulator for the whole array should just be a loop instead"
					}
				]
			},
			{
				"title": "Types and data modeling",
				"items": [
					{
						"label": "sum type vs product type",
						"text": "a product holds all of its fields at once (a record, a tuple); a sum holds exactly one of several alternatives (a tagged/discriminated union)"
					},
					{
						"label": "where `never` exhaustiveness belongs",
						"text": "a closed set of cases argues for an exhaustive union; an open set (e.g. plugin kinds arriving at runtime) argues for an open/registry shape instead"
					},
					{
						"label": "the expression problem",
						"text": "a union + a match makes adding an OPERATION cheap and a CASE expensive; a class hierarchy with virtual methods is the exact mirror — cheap case, expensive operation"
					},
					{
						"label": "modelling state as a union, not booleans",
						"text": "make illegal states unrepresentable — a tagged union of loading/ok/error rules out the boolean-flags version's impossible combinations (e.g. `loading:true` with both `data` and `error` set)"
					},
					{
						"label": "optional field vs union member",
						"text": "three optional fields on one type = eight possible states, most of them nonsense — a union of only the valid shapes allows just the real ones"
					},
					{
						"label": "generic functions and what a signature alone tells you",
						"text": "parametricity (\"theorems for free\") — a function typed `<T>(x: T) => T` can only be identity (or loop/throw), because it has to work for every possible `T`"
					},
					{
						"label": "how type inference works, at a high level",
						"text": "the compiler assigns each expression the most general type consistent with how it's used; this is far easier to do well over expression-oriented code than over code full of mutation and control-flow statements"
					}
				]
			},
			{
				"title": "Values that hold other values",
				"items": [
					{
						"label": "`Result<T,E>` vs `throw`",
						"text": "expected failures are values (`Result`), bugs are throws — a return type makes failure visible in the signature and forces the caller to handle it"
					},
					{
						"label": "`Option`/`Maybe` vs `T | undefined`",
						"text": "TS's union plus strict null checks already does most of what `Option` does, without a wrapper — an `Option` class is usually not worth it in TS"
					},
					{
						"label": "the conversion boundary",
						"text": "pick one layer (usually the transport/handler edge) and convert once between throw-style and `Result`-style — mixing both styles everywhere is the real failure mode"
					},
					{
						"label": "functor = something with a lawful `map`",
						"text": "`Array`, `Promise`, `Result`, and `Option` all have one — a container you can `map` over without unwrapping it first"
					},
					{
						"label": "applicative: combining several independent values",
						"text": "combines several independent wrapped values with a plain multi-argument function (e.g. two validated fields into one `Result<Person,E>`, collecting every failure) — unlike monad, the values don't depend on each other"
					},
					{
						"label": "monad = `of` plus `flatMap`",
						"text": "`flatMap` over `map` when the callback itself returns the container, so nesting doesn't accumulate — unlike applicative, each step can depend on the previous one's result"
					},
					{
						"label": "why `Promise` is not quite a monad",
						"text": "`.then` auto-flattens whether or not you return a promise, so it's both `map` and `flatMap` at once — and it makes `Promise<Promise<T>>` unrepresentable"
					},
					{
						"label": "`flat`/`flatMap` as the practical half",
						"text": "the one place the functor/monad vocabulary pays off in ordinary code — depth argument defaults to 1"
					},
					{
						"label": "railway-oriented / short-circuit chains",
						"text": "a chain of steps where the first failure skips the rest — what `Promise` rejection and monadic `flatMap` already give for free"
					},
					{
						"label": "the laws, and why the laws are the point",
						"text": "functor: mapping identity changes nothing, two maps compose into one. Monad: left/right identity, associativity. The laws are what let you refactor a chain — split it, reorder, extract a helper — without re-testing the whole pipeline"
					},
					{
						"label": "`traverse` and `sequence`",
						"text": "`sequence` flips `Result<T,E>[]` into `Result<T[],E>` — success only if every item succeeded; `traverse` is `map` then `sequence` in one pass"
					}
				]
			},
			{
				"title": "Effects and the real world",
				"items": [
					{
						"label": "what counts as a side effect",
						"text": "anything besides computing the return value from the inputs — I/O, the console, mutating something outside its own scope, throwing, reading the clock or a random source"
					},
					{
						"label": "functional core, imperative shell",
						"text": "pure decisions in the middle, I/O at the boundary — keep the testable logic separate from where it touches the outside world"
					},
					{
						"label": "describing work as a value; eager vs lazy",
						"text": "a plain function call runs immediately; wrapping the same work as a value (a thunk, an `IO`/`Task`) lets you build it up, pass it around, and decide when — or whether — to run it"
					},
					{
						"label": "async as just another effect; `Promise` vs `Task`",
						"text": "a `Promise` starts running the moment it's created and caches its one result; a `Task` (`() => Promise<T>`) is a lazy description of the same work — nothing runs until invoked, so it composes, retries, and cancels like any other value"
					},
					{
						"label": "error handling without exceptions",
						"text": "an effect that can fail is exactly the case `Result` is for"
					},
					{
						"label": "the Reader idea",
						"text": "a function shaped `(config) => result` composes with the others and the config gets supplied once, at the edge — instead of threading it through every function by hand"
					},
					{
						"label": "the State idea",
						"text": "each step is a pure function `(state) => [result, newState]`, and the next step receives the state the previous one produced — the state changes, nothing is mutated"
					}
				]
			},
			{
				"title": "Structure and laws",
				"items": [
					{
						"label": "Semigroup and Monoid",
						"text": "a Semigroup is a type plus an associative combine operation (order of grouping doesn't matter); a Monoid is a Semigroup with an identity element too (`0` for `+`, `\"\"` for concat, `[]` for arrays) — `reduce` needs exactly a Monoid"
					},
					{
						"label": "equality and ordering as values you pass around",
						"text": "instead of a type's built-in `===` or `<`, equality/ordering become ordinary values — a comparator function, an `{equals}`/`{compare}` object — passed as a parameter"
					},
					{
						"label": "type classes / traits vs interfaces",
						"text": "an interface is declared by the type itself upfront; a type class (Haskell) / trait (Rust) attaches behavior to a type from the outside, after the fact, without owning its source — ad-hoc polymorphism instead of inheritance"
					},
					{
						"label": "property-based testing",
						"text": "assert that a LAW holds for hundreds of randomly generated inputs (associativity, identity, functor/monad laws) instead of asserting specific examples — `fast-check` in TS, `QuickCheck` in Haskell"
					},
					{
						"label": "the law count for each structure",
						"text": "the same two ideas (identity, associativity) all the way down, monad just splits identity in two. Category: 2 (identity, associativity). Monoid: 2 (identity, associativity). Functor: 2 (identity, composition). Monad: 3 (two identity laws, one associativity)"
					}
				]
			},
			{
				"title": "In the large",
				"items": [
					{
						"label": "data-first design and module boundaries",
						"text": "model the data first, write functions over it second — a module's boundary should export a data shape plus plain functions over it, not a class hiding mutable state"
					},
					{
						"label": "eager chain vs lazy pipeline",
						"text": "`arr.filter(...).map(...).slice(0,3)` builds two full intermediate arrays to return three items; a generator pipeline (or iterator helpers) computes three"
					},
					{
						"label": "generator as a lazy sequence",
						"text": "an infinite sequence is only expressible lazily"
					},
					{
						"label": "a thunk",
						"text": "`() => expensive()` — a value wrapped in a function so it isn't computed until needed"
					},
					{
						"label": "short-circuit as laziness",
						"text": "`&&`, `||`, `??` don't evaluate the right side unless they must"
					},
					{
						"label": "state over time as a fold over events",
						"text": "current state = `events.reduce(reducer, initialState)` — a pure function over the full history; exactly what a Redux-style reducer is, and the same idea as event sourcing"
					},
					{
						"label": "why immutability makes concurrency easier",
						"text": "a value that can never change can be read by multiple threads/workers at once with no lock and no race condition — shared MUTABLE state is what makes concurrency hard"
					},
					{
						"label": "the real costs",
						"text": "every immutable update allocates (structural sharing keeps this cheap, not zero); deep recursion without a trampoline risks a stack overflow; unfamiliar style slows a team down before it speeds them up"
					},
					{
						"label": "living alongside imperative code",
						"text": "most real codebases are mixed — a pure functional core surrounded by imperative frameworks; the skill is knowing where to draw the boundary, not rewriting everything functional"
					}
				]
			},
			{
				"title": "Optional deep work",
				"items": [
					{
						"label": "lenses / optics",
						"text": "composable immutable get/set at depth"
					},
					{
						"label": "effect systems",
						"text": "the \"effects as values\" idea taken all the way — a type like `Effect<R,E,A>` tracks dependencies, possible errors, and result all in the type; Task + Reader + Result fused into one"
					},
					{
						"label": "free monads",
						"text": "separate DESCRIBING a sequence of effectful steps (build a data structure representing the program) from INTERPRETING them (run one or more interpreters over it later)"
					},
					{
						"label": "dependent types",
						"text": "a type that depends on a VALUE, not just another type — e.g. a vector type parameterized by its own length; TS doesn't have these"
					},
					{
						"label": "category theory",
						"text": "the branch of math functor/monad/applicative borrow their vocabulary and laws from — objects and structure-preserving maps (morphisms), composed associatively with an identity"
					},
					{
						"label": "transducers",
						"text": "composing `map`/`filter` steps into one pass with no intermediate arrays"
					},
					{
						"label": "trampolining, and why",
						"text": "V8 has no tail-call elimination, so deep recursion throws `RangeError` — a trampoline (or a loop) is the fix"
					},
					{
						"label": "immutable-data libraries",
						"text": "Immer's draft-mutate-produce shape, and where a persistent-collection library earns its weight"
					}
				]
			},
			{
				"title": "Vocabulary",
				"items": [
					{
						"label": "total function vs partial function",
						"text": "a total function is defined for every input in its domain; a partial one isn't — array `head` on an empty array, integer division by zero"
					},
					{
						"label": "referential opacity",
						"text": "the opposite of referential transparency — a call that can't be replaced by its result without changing the program (reading the clock, a counter)"
					},
					{
						"label": "arity",
						"text": "the number of arguments a function takes — unary, binary, n-ary; a variadic function takes any number"
					},
					{
						"label": "bifunctor",
						"text": "a functor with two independent type parameters you can map over separately — e.g. `Result<T,E>` having both `map` (over `T`) and `mapErr` (over `E`)"
					},
					{
						"label": "desugaring",
						"text": "rewriting convenient syntax (a `for` loop, `async`/`await`) into the more primitive form it's shorthand for (a fold, a chain of `.then`s)"
					},
					{
						"label": "composition (the general word)",
						"text": "combining two things into one bigger thing of the same kind, without either needing to know about the other — `compose`/`pipe` is the function-level case, Semigroup/Monoid is the value-level case"
					},
					{
						"label": "record of functions",
						"text": "bundles related pure functions into a plain record instead of an OOP object holding hidden state — the standard FP shape for dependency injection, decoupling logic from the infrastructure it calls"
					}
				]
			},
			{
				"title": "Vocab: Intro",
				"items": [
					{
						"label": "functional programming",
						"text": "programming built around pure functions, immutable data, and composition, instead of step-by-step commands that change state"
					},
					{
						"label": "imperative programming",
						"text": "programming as a sequence of commands that change state one step at a time"
					},
					{
						"label": "object-oriented programming",
						"text": "organizing code around objects that bundle state and behavior together"
					},
					{
						"label": "mutable state",
						"text": "data that can be changed in place after it's created, rather than replaced with a new value"
					},
					{
						"label": "assignment-based programming",
						"text": "programming where progress is tracked by reassigning variables as you go — the imperative default FP moves away from"
					},
					{
						"label": "side effects",
						"text": "anything a function does besides computing its return value from its inputs — I/O, mutating something outside itself, throwing, reading the clock or randomness"
					},
					{
						"label": "DRY",
						"text": "avoid duplicating the same logic in more than one place"
					},
					{
						"label": "YAGNI",
						"text": "don't build for a requirement you don't actually have yet"
					},
					{
						"label": "loose coupling, high cohesion",
						"text": "modules should depend on each other as little as possible, while what's inside one module should belong together"
					},
					{
						"label": "principle of least surprise",
						"text": "a design should behave the way someone would reasonably expect it to, given its name and shape"
					},
					{
						"label": "single responsibility",
						"text": "a unit of code should have one reason to change"
					},
					{
						"label": "associativity",
						"text": "grouping doesn't matter: `(a+b)+c` equals `a+(b+c)`"
					},
					{
						"label": "commutativity",
						"text": "order doesn't matter: `a+b` equals `b+a`"
					},
					{
						"label": "identity (property)",
						"text": "a value that combines with anything and leaves it unchanged — `0` for `+`, `1` for `×`"
					},
					{
						"label": "distributivity",
						"text": "one operation spreads over another: `a×(b+c)` equals `a×b + a×c`"
					},
					{
						"label": "composable parts",
						"text": "small pieces built so they combine into bigger pieces without needing to know about each other's internals"
					},
					{
						"label": "set theory",
						"text": "the math of collections and membership; underlies \"a type is the set of values that satisfy it\""
					},
					{
						"label": "reasoning about code",
						"text": "predicting what code does by reading it alone, without running it or tracking hidden state — the actual payoff FP is chasing"
					}
				]
			},
			{
				"title": "Vocab: First Class Functions",
				"items": [
					{
						"label": "first class functions",
						"text": "functions can be stored in variables, passed as arguments, and returned from other functions, just like any other value"
					},
					{
						"label": "callable",
						"text": "anything invokable with `()` — a plain function, a bound function, an object with a call signature"
					},
					{
						"label": "callback",
						"text": "a function passed into another function to be invoked later, usually when some event or step completes"
					},
					{
						"label": "delayed evaluation",
						"text": "wrapping work in a function so it doesn't run until that function is actually called"
					},
					{
						"label": "indirection",
						"text": "adding a layer between a caller and the real work so the caller doesn't need to know the concrete implementation"
					},
					{
						"label": "wrapper function",
						"text": "a function that calls another function, adding behavior around it (logging, timing, validation) without changing the original"
					},
					{
						"label": "leaky abstraction",
						"text": "an abstraction meant to hide details that forces the caller to know about them anyway"
					},
					{
						"label": "this binding",
						"text": "what `this` refers to depends on how a function is called, not where it's defined — except arrow functions, which capture it lexically"
					},
					{
						"label": "generic vs. specific code",
						"text": "generic code works across many types/shapes at the cost of doing less per-case; specific code does more but only for one shape"
					},
					{
						"label": "reusability",
						"text": "writing something once so it applies in more than one place without being copied"
					},
					{
						"label": "naming / misnomers",
						"text": "a name that no longer matches what the thing actually does, misleading anyone reading it"
					},
					{
						"label": "micro-optimization",
						"text": "tuning a small, rarely-hot piece of code for performance, usually not worth the readability cost"
					}
				]
			},
			{
				"title": "Vocab: Pure Functions",
				"items": [
					{
						"label": "pure function",
						"text": "same output for the same input, and no observable effect outside itself"
					},
					{
						"label": "impure function",
						"text": "depends on or affects something outside its own inputs/outputs — state, I/O, randomness, the clock"
					},
					{
						"label": "mutation",
						"text": "changing a value in place rather than creating a new one"
					},
					{
						"label": "immutability (Object.freeze)",
						"text": "preventing a value from being changed after creation; `Object.freeze` is JS's shallow, runtime version of it"
					},
					{
						"label": "system state",
						"text": "the sum of all mutable data a program currently holds, spread across variables, objects, and external stores"
					},
					{
						"label": "cognitive load",
						"text": "how much a reader has to hold in their head to understand code; pure functions lower it because nothing hidden can affect the result"
					},
					{
						"label": "system complexity",
						"text": "how hard a system is to reason about as a whole, driven up by hidden state and interactions between parts"
					},
					{
						"label": "mathematical function",
						"text": "a pure function models exactly this: one input always maps to the same one output, nothing else involved"
					},
					{
						"label": "caching",
						"text": "storing a computed result so a repeated call can reuse it instead of recomputing"
					},
					{
						"label": "memoization",
						"text": "caching keyed by a function's arguments; only safe when the function is pure"
					},
					{
						"label": "portability",
						"text": "pure code doesn't depend on its ambient environment, so it can be moved or reused elsewhere unchanged"
					},
					{
						"label": "self-documenting code",
						"text": "code whose behavior is clear from its own names and shape, without needing external comments"
					},
					{
						"label": "explicit dependencies",
						"text": "everything a function needs arrives through its parameters, not through hidden globals or ambient state"
					},
					{
						"label": "dependency injection",
						"text": "supplying a function/object what it needs from outside, rather than it reaching out to construct or fetch it itself"
					},
					{
						"label": "parameterization",
						"text": "turning something that was hardcoded or reached-for into a parameter instead"
					},
					{
						"label": "testability",
						"text": "how easy code is to test in isolation; pure functions are trivially testable since there's no hidden state to set up or tear down"
					},
					{
						"label": "property-based testing",
						"text": "testing that a general law holds for many randomly generated inputs, rather than checking specific examples — `fast-check` in TS, `jqwik` in Java"
					},
					{
						"label": "referential transparency",
						"text": "a call can be replaced by its result without changing the program's behavior"
					},
					{
						"label": "equational reasoning",
						"text": "treating code like algebra, substituting equals for equals — safe only because referential transparency guarantees it"
					},
					{
						"label": "inlining / substitution",
						"text": "replacing a call site with the function's body — only valid to do freely under referential transparency"
					},
					{
						"label": "parallel code",
						"text": "code split to run at the same time across cores, threads, or workers"
					},
					{
						"label": "shared memory",
						"text": "memory more than one thread/worker can read and write — the source of most concurrency bugs"
					},
					{
						"label": "race condition",
						"text": "a bug where the outcome depends on timing between concurrent operations touching shared mutable state"
					}
				]
			},
			{
				"title": "Vocab: Currying",
				"items": [
					{
						"label": "currying",
						"text": "turning an n-ary function into a chain of n unary functions, each taking one argument and returning the next"
					},
					{
						"label": "closure",
						"text": "a function that remembers the variables from the scope it was created in, even after that scope has returned"
					},
					{
						"label": "partial application",
						"text": "fixing some of a function's arguments now and getting back a function of the rest"
					},
					{
						"label": "higher order function",
						"text": "a function that takes another function as an argument, returns one, or both"
					},
					{
						"label": "argument ordering (data last)",
						"text": "putting the data being operated on as the last parameter, so earlier arguments can be fixed first to build a reusable step"
					},
					{
						"label": "unary function",
						"text": "a function that takes exactly one argument"
					}
				]
			},
			{
				"title": "Vocab: Coding by Composing",
				"items": [
					{
						"label": "function composition (compose)",
						"text": "combining two functions into one, feeding one's output into the other's input; `compose(f,g)(x)` is `f(g(x))`"
					},
					{
						"label": "variadic function",
						"text": "a function that accepts any number of arguments"
					},
					{
						"label": "right-to-left data flow",
						"text": "`compose`'s reading order: the rightmost function runs first, matching mathematical `f(g(x))` order"
					},
					{
						"label": "associativity of composition",
						"text": "grouping doesn't matter when composing more than two functions: `compose(f, compose(g,h))` equals `compose(compose(f,g), h)`"
					},
					{
						"label": "extract function (refactoring)",
						"text": "pulling a piece of logic out into its own named function, usually to make it reusable or composable"
					},
					{
						"label": "pointfree style",
						"text": "defining a function without naming its arguments, built purely by composing other functions"
					},
					{
						"label": "identity function (id)",
						"text": "`x => x` — the do-nothing function that acts as composition's identity element"
					},
					{
						"label": "trace / debugging composition",
						"text": "inserting a `tap`-like logging step into a composed pipeline to see an intermediate value without changing the result"
					},
					{
						"label": "types as sets",
						"text": "treating a type as the set of all values that satisfy it, so type relationships mirror set relationships (subset, union, etc.)"
					}
				]
			},
			{
				"title": "Vocab: Declarative Coding",
				"items": [
					{
						"label": "declarative coding",
						"text": "describing WHAT the result should be, leaving HOW to compute it to the underlying implementation"
					},
					{
						"label": "imperative coding",
						"text": "describing HOW to get the result, step by step, in the order things should happen"
					},
					{
						"label": "expression vs. step-by-step instruction",
						"text": "an expression evaluates to a value; a statement just performs an action and moves on"
					},
					{
						"label": "specification (what, not how)",
						"text": "declarative code as a spec of the desired outcome, decoupled from the mechanism that produces it"
					},
					{
						"label": "order of evaluation",
						"text": "the sequence in which a language actually evaluates subexpressions; imperative code depends on this being predictable"
					},
					{
						"label": "parallel / concurrent computing",
						"text": "parallel runs work at the same literal time across cores; concurrent structures independent tasks that may or may not run simultaneously"
					},
					{
						"label": "JIT optimization",
						"text": "a just-in-time compiler watches a program as it runs and compiles hot paths to faster machine code on the fly"
					},
					{
						"label": "isolating impure actions (namespacing)",
						"text": "keeping impure code (I/O, mutation) grouped and named separately from pure logic, so the boundary is visible"
					},
					{
						"label": "universal getter (prop)",
						"text": "a generic `prop(key)(obj)` function that reads any field off any object, instead of writing a getter per field"
					},
					{
						"label": "map's composition law",
						"text": "mapping `f` then `g` gives the same result as mapping the single composed function `g∘f` — justifies fusing multiple `.map()`s into one"
					},
					{
						"label": "principled refactor",
						"text": "a refactor justified by an algebraic law holding, not just \"it looks the same\""
					}
				]
			},
			{
				"title": "Vocab: Type Signatures",
				"items": [
					{
						"label": "type signature",
						"text": "a function's declared shape: the types of its parameters and its return type"
					},
					{
						"label": "type inference",
						"text": "the compiler working out a value's type from how it's used, without an explicit annotation"
					},
					{
						"label": "type annotation",
						"text": "writing a type explicitly instead of relying on inference"
					},
					{
						"label": "compile-time type checking",
						"text": "catching type errors before the program runs, by checking code against its declared/inferred types"
					},
					{
						"label": "dynamic language",
						"text": "a language that checks types at runtime instead of compile time — JS without TS"
					},
					{
						"label": "type variable",
						"text": "a placeholder standing in for \"any type,\" used in generics — the `T` in `<T>(x: T) => T`"
					},
					{
						"label": "polymorphic type",
						"text": "a type that works over more than one concrete type via a type variable"
					},
					{
						"label": "parametricity",
						"text": "a function typed generically enough can't inspect or special-case its type parameter — \"theorems for free\""
					},
					{
						"label": "free theorem",
						"text": "a property you get for free purely from a generic signature, without looking at the implementation"
					},
					{
						"label": "rewrite rule",
						"text": "a compiler optimization that replaces one expression with an equivalent one it knows is safe, e.g. fusing two `map`s into one"
					},
					{
						"label": "type constraint",
						"text": "restricting a type variable to only types that satisfy some capability, e.g. `<T extends Comparable>`"
					},
					{
						"label": "domain restriction",
						"text": "narrowing which inputs a function accepts, often to make it total instead of partial"
					}
				]
			},
			{
				"title": "Vocab: Tupperware",
				"items": [
					{
						"label": "container",
						"text": "a value that wraps another value, giving you a context to operate in — `Array`, `Maybe`, `Result`, `Promise`"
					},
					{
						"label": "functor",
						"text": "a container with a lawful `map`"
					},
					{
						"label": "map",
						"text": "apply a function to the value(s) inside a container without unwrapping it first"
					},
					{
						"label": "of (constructor / lifting)",
						"text": "putting a plain value into a container, minimally wrapped — `Array.of`, `Promise.resolve`"
					},
					{
						"label": "Maybe",
						"text": "a container representing a value that might be absent, without using `null`/`undefined` directly"
					},
					{
						"label": "Just / Nothing",
						"text": "Haskell's two cases of `Maybe`: `Just x` holds a value, `Nothing` holds none"
					},
					{
						"label": "Some / None",
						"text": "Rust/Scala's names for the same two cases as Just/Nothing"
					},
					{
						"label": "Option / Optional",
						"text": "Scala/Java's name for the Maybe type — Java's `java.util.Optional`"
					},
					{
						"label": "null check / type safety",
						"text": "TS's union `T | undefined` plus strict-null-checks does most of what Maybe/Option gives, checked at compile time"
					},
					{
						"label": "short-circuiting",
						"text": "a chain of operations on Nothing/None skips the rest and returns Nothing/None immediately"
					},
					{
						"label": "Either",
						"text": "a container with two possible cases, conventionally used for success-or-failure"
					},
					{
						"label": "Left / Right",
						"text": "Either's two cases; by convention Left holds an error/failure, Right holds a success value"
					},
					{
						"label": "pure error handling",
						"text": "using a container type like Either/Result instead of throwing, so failure is visible in the return type"
					},
					{
						"label": "throw / catch",
						"text": "the exception mechanism Either/Result is offered as an alternative to"
					},
					{
						"label": "lifting",
						"text": "taking a plain value or function and wrapping it to work inside a container"
					},
					{
						"label": "sum type",
						"text": "a type holding exactly one of several alternatives"
					},
					{
						"label": "deferred effect",
						"text": "an effect represented as a value/description, not run until something explicitly executes it"
					},
					{
						"label": "command pattern",
						"text": "OOP's version of the same idea: wrapping a request/action as an object so it can be queued, logged, or undone"
					},
					{
						"label": "queue",
						"text": "a sequence of pending items processed in order, often used to hold deferred effects/commands until they're run"
					},
					{
						"label": "Task / Future",
						"text": "a lazy description of an asynchronous computation (fp-ts's `Task`); Java's `Future`/`CompletableFuture` is the eager cousin"
					},
					{
						"label": "fork",
						"text": "starting a `Task`/`Future`'s execution — the point where the lazy description actually begins running"
					},
					{
						"label": "asynchronous actions",
						"text": "work that completes at some later time rather than immediately"
					},
					{
						"label": "promises",
						"text": "JS's built-in eager, cached async value"
					},
					{
						"label": "callbacks",
						"text": "a function passed in to be called when async work completes — the mechanism `Promise`/`Task` replace"
					},
					{
						"label": "functor laws: identity, composition",
						"text": "mapping `identity` changes nothing; mapping `f` then `g` equals mapping the composed function `g∘f`"
					},
					{
						"label": "nested / stacked functors",
						"text": "one functor inside another, e.g. `Promise<Result<T,E>>` — handling requires mapping \"through\" both layers"
					},
					{
						"label": "event streams",
						"text": "a sequence of values arriving over time, instead of all at once — the async analogue of an array"
					},
					{
						"label": "observables",
						"text": "a library type (RxJS) representing an event stream you can `map`/`filter`/combine like a lazy, push-based collection"
					}
				]
			},
			{
				"title": "Vocab: Monadic Onions",
				"items": [
					{
						"label": "monad",
						"text": "a pointed functor with `chain`/`flatMap` — `of` plus flattening"
					},
					{
						"label": "join (flatten)",
						"text": "collapsing one level of nesting: `M<M<T>>` to `M<T>`"
					},
					{
						"label": "chain / bind / flatMap",
						"text": "map then join in one step: run a function that itself returns a wrapped value, without ending up double-wrapped"
					},
					{
						"label": "nested monads",
						"text": "the `M<M<T>>` shape that `join`/`chain` exists to collapse"
					},
					{
						"label": "sequencing of effects",
						"text": "running one effectful step after another, where each may depend on the previous one's result"
					},
					{
						"label": "algebraic data types",
						"text": "types built by combining sums and products — TS discriminated unions are exactly this"
					},
					{
						"label": "monad transformers",
						"text": "a way to stack two monads together (e.g. handle both \"might fail\" and \"is async\" at once) without hand-rolling the combined type each time"
					},
					{
						"label": "callback hell / pyramid of doom",
						"text": "deeply nested callbacks from sequencing async steps without composition — the practical problem monadic chaining and `async`/`await` solve"
					}
				]
			},
			{
				"title": "Vocab: Applicative Functors",
				"items": [
					{
						"label": "applicative functor",
						"text": "a functor that also has `ap`, letting you combine several wrapped values with a plain multi-argument function"
					},
					{
						"label": "ap",
						"text": "apply a wrapped function to a wrapped value: `Container<a→b>` applied to `Container<a>` gives `Container<b>`"
					},
					{
						"label": "concurrent vs. sequential evaluation",
						"text": "applicative combines independent values so order doesn't matter and they could run concurrently; monad's `chain` is inherently sequential"
					},
					{
						"label": "principle of least power",
						"text": "use the weakest abstraction that gets the job done — functor if you only need `map`, applicative if values are independent, monad only if a step depends on a prior result"
					}
				]
			},
			{
				"title": "Vocab: Natural Transformations",
				"items": [
					{
						"label": "principled type conversion",
						"text": "converting between container types (e.g. `Maybe` to `Either`) in a lawful, uniform way rather than ad hoc"
					},
					{
						"label": "isomorphism",
						"text": "a pair of conversions between two types that are exact inverses of each other — converting there and back always returns the original value"
					},
					{
						"label": "fusion / optimization by law",
						"text": "merging multiple operations (e.g. two `map`s) into one pass, justified by a law guaranteeing the result is identical"
					}
				]
			},
			{
				"title": "Vocab: Traversing the Stone",
				"items": [
					{
						"label": "sequence",
						"text": "flip a list of wrapped values into one wrapped list — e.g. a list of `Result`s to a `Result` of a list"
					},
					{
						"label": "traverse",
						"text": "`map` then `sequence` in one pass: run an effectful function over every element and combine the results into one wrapped structure"
					},
					{
						"label": "type constructor",
						"text": "a type that takes a type parameter to produce a concrete type — `Array` isn't a type by itself, `Array<T>` is"
					},
					{
						"label": "effect ordering",
						"text": "whether traversing runs effects one at a time (sequential) or all at once (concurrent) depends on the effect type"
					},
					{
						"label": "predicate",
						"text": "a function returning `boolean`, used to test each element — the shape `filter`/`find` take"
					},
					{
						"label": "partitioning vs. validating",
						"text": "splitting a list into successes and failures keeps both; validating fails the whole batch on the first failure (or collects all)"
					},
					{
						"label": "reduce / accumulator / seed value",
						"text": "`reduce`'s three parts: the combining function, the running total, and its starting value"
					},
					{
						"label": "laws as code guarantees",
						"text": "laws are what let you refactor a pipeline without re-testing it by hand, because the guarantee is structural, not empirical"
					},
					{
						"label": "encapsulation",
						"text": "hiding a value's internal representation behind an interface, so callers interact with it only through defined operations"
					}
				]
			},
			{
				"title": "Vocab: Monoids",
				"items": [
					{
						"label": "monoid",
						"text": "a type plus an associative combine operation plus an identity element"
					},
					{
						"label": "semigroup",
						"text": "a type plus an associative combine operation, no identity required"
					},
					{
						"label": "concat (associative binary operation)",
						"text": "the conventional method name for a semigroup/monoid's combine operation"
					},
					{
						"label": "empty (identity element)",
						"text": "the conventional method name for a monoid's identity value — combines with anything and changes nothing"
					},
					{
						"label": "binary operation",
						"text": "an operation taking exactly two inputs of the same type and producing one output of that type"
					},
					{
						"label": "closed under an operation",
						"text": "combining two values of a type always produces another value of the same type, never escaping it"
					},
					{
						"label": "domain / codomain",
						"text": "a function's domain is the set of valid inputs; its codomain is the set the outputs are drawn from"
					},
					{
						"label": "program to an interface, not an implementation",
						"text": "depend on what an operation can do (e.g. \"this has a `concat`\"), not on a specific concrete type"
					},
					{
						"label": "Sum, Product, Min, Max",
						"text": "common numeric monoids: combine is `+`/`×`/`Math.min`/`Math.max`, identity is `0`/`1`/`+Infinity`/`-Infinity`"
					},
					{
						"label": "Any, All",
						"text": "boolean monoids: combine is `||`/`&&`, identity is `false`/`true`"
					},
					{
						"label": "First",
						"text": "a monoid that keeps the first non-empty value it sees and discards the rest"
					},
					{
						"label": "fold",
						"text": "collapsing a structure down to a single value using a combining operation — the general case `reduce` implements for arrays"
					},
					{
						"label": "reduce with initial value",
						"text": "supplying the seed explicitly instead of assuming the first element is it — required whenever the array might be empty"
					}
				]
			}
		]
	}
];
