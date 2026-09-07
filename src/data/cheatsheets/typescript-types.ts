// Generated from practice/ cheat-sheet TSVs — re-run scratchpad/gen_cheatsheet_data.py to resync after the source changes.
export interface CheatItem { label: string | null; text: string }
export interface CheatSub { title: string; items: CheatItem[] }
export interface CheatArea { name: string; color: string; subs: CheatSub[] }

export const typescriptTypesAreas: CheatArea[] = [
	{
		"name": "TypeScript",
		"color": "#1a6b3a",
		"subs": [
			{
				"title": "Foundations",
				"items": [
					{
						"label": "three declaration spaces",
						"text": "value (const/let/var/function/params), type (interface/type/type params), namespace (dotted access A.B.C) — one name can occupy more than one space at once, e.g. a class is both value and type"
					},
					{
						"label": "structural typing",
						"text": "TS compares shapes, not declared names — but two same-shape classes with private members are NOT interchangeable"
					},
					{
						"label": "type erasure",
						"text": "types exist compile-time only; instanceof works against a class (real JS value) but errors (TS2693) against an interface"
					},
					{
						"label": "keyof T",
						"text": "union of T's key names; keyof(A|B) = shared keys only, keyof(A&B) = all keys"
					},
					{
						"label": "generic constraints <T extends U>",
						"text": "bounds what T must satisfy — a method spec { length(): number } differs from a property spec length: number"
					},
					{
						"label": "generic defaults <T = X>",
						"text": "a required type parameter may never follow a defaulted one"
					},
					{
						"label": "<K extends keyof T>",
						"text": "typed key parameter — the derived value T[K] goes in the value slot, not the header"
					},
					{
						"label": "indexed access T['k'] / T[number]",
						"text": "pulls a property's/element's type out; a union key T['a'|'b'] gives the union of those value types"
					},
					{
						"label": "typeof type query",
						"text": "value -> type, e.g. ReturnType<typeof fn> — distinct from runtime typeof narrowing below"
					},
					{
						"label": "generic class Box<T>",
						"text": "the call site is the spec; constructors and methods must honor the T it fixes"
					},
					{
						"label": "enum vs literal union",
						"text": "no = ever follows the enum name (only members use =); a literal union usually beats a numeric enum"
					},
					{
						"label": "typeof narrowing (values)",
						"text": "runtime typeof checks narrow a union at the value level — distinct from the type-space typeof query above; typeof returns one of: \"string\", \"number\", \"boolean\", \"undefined\", \"object\", \"function\", \"symbol\", \"bigint\""
					},
					{
						"label": "string -> number conversion",
						"text": "canonical is Number(x); parseInt/parseFloat parse only a leading prefix, ignoring trailing garbage"
					},
					{
						"label": "checking if a string is numeric",
						"text": "!isNaN(Number(x)) — global isNaN(x) alone coerces first, so isNaN(\"\") is false and isNaN(\"abc\") is true"
					},
					{
						"label": "generics <T> on a function",
						"text": "keeps a signature value-agnostic instead of hardcoding one type"
					},
					{
						"label": "union types A | B",
						"text": "the value could be either — narrow before using members not common to both"
					},
					{
						"label": "assignability direction",
						"text": "narrower assigns to wider, never the reverse — string | undefined is not assignable to string"
					},
					{
						"label": "intersection A & B",
						"text": "combines members; a property with conflicting types across A and B collapses to never"
					},
					{
						"label": "interface vs type",
						"text": "interface X = {...} is illegal (interfaces never use =); interfaces merge by declaration, type aliases never do"
					},
					{
						"label": "literal types",
						"text": "a single exact value as a type; let widens to the general type (string), not assignable back to the literal"
					},
					{
						"label": "union of literals",
						"text": "'a' | 'b' | 'c' — keep every member with |"
					},
					{
						"label": "rest vs spread — same ..., opposite directions",
						"text": "a new name next to ... is gathering (rest); an existing value next to ... is spreading"
					}
				]
			},
			{
				"title": "Type erasure",
				"items": [
					{
						"label": "which declarations emit JS",
						"text": "const / class / enum / namespace emit real runtime code; type, interface, and pure type syntax erase completely"
					},
					{
						"label": "instanceof needs a value",
						"text": "works against a class (real constructor); errors TS2693 against an interface (no runtime representation)"
					},
					{
						"label": "what a runtime check CAN interrogate",
						"text": "typeof / instanceof / in can only test real JS values and shapes, never a type"
					},
					{
						"label": "a generic type parameter at runtime",
						"text": "T itself is not a value — new T() and instanceof T both fail; pass a real constructor in instead"
					},
					{
						"label": "enum emits a real object",
						"text": "numeric enums map both directions (name<->value); string enums map name->value only"
					},
					{
						"label": "discriminated union tag is a real property",
						"text": "no type exists at runtime, so a switch can only branch on an actual property, never a type"
					},
					{
						"label": "namespace emits a value",
						"text": "a namespace compiles to a real runtime object"
					},
					{
						"label": "private/protected/readonly vs #",
						"text": "private/protected/readonly are compile-time only (still a readable JS property); # is the one real runtime-private mechanism"
					},
					{
						"label": "as and ! perform no check",
						"text": "both are purely compile-time — neither runs code nor verifies anything at runtime"
					},
					{
						"label": "declare and .d.ts describe, never create",
						"text": "referencing an absent declared value throws ReferenceError, not a silent undefined"
					},
					{
						"label": "emitDecoratorMetadata",
						"text": "the deliberate partial de-erasure that lets NestJS-style DI resolve classes (never interfaces) as tokens at runtime"
					}
				]
			},
			{
				"title": "Nominal behavior",
				"items": [
					{
						"label": "instanceof behaves nominally",
						"text": "walks the real prototype chain (actual constructor identity) — a structurally-identical plain object fails it even though it satisfies the class's shape"
					},
					{
						"label": "branded / nominal types",
						"text": "string & {__brand} or unique symbol — not assignable from the plain type; a brand does not survive serialization"
					},
					{
						"label": "private/protected members",
						"text": "a class with a private/protected member is only assignable from that exact declaration — the one exception structural typing carves out for classes"
					},
					{
						"label": "string enums",
						"text": "TS's one genuinely nominal built-in type — a plain string literal like 'active' is not assignable to the enum type"
					}
				]
			},
			{
				"title": "any / unknown / never",
				"items": [
					{
						"label": "unknown (safe top type)",
						"text": "accepts anything in, blocks all use until narrowed — even typeof === 'object' has a null hole"
					},
					{
						"label": "any (escape hatch, also a top type)",
						"text": "unchecked in both directions; unknown is the safer default — narrow before use"
					},
					{
						"label": "never (bottom type)",
						"text": "the type of a value that can't exist; T | never = T, T & never = never"
					},
					{
						"label": "exhaustiveness check (const _: never = x)",
						"text": "assigning the leftover branch to a never-typed variable fails to compile if a union case was missed"
					},
					{
						"label": "{} — the non-nullish top type",
						"text": "accepts everything except null/undefined; object rejects primitives"
					}
				]
			},
			{
				"title": "Narrowing & discriminated unions",
				"items": [
					{
						"label": "tagged union + narrow on the tag",
						"text": "switch/if on the shared literal tag; only members common to every branch are readable before narrowing"
					},
					{
						"label": "narrowing via switch + exhaustiveness",
						"text": "falling off the end yields undefined; the error only appears if the declared return type rejects it"
					},
					{
						"label": "instanceof / in as guards",
						"text": "'key' in x narrows by property presence — no tag needed"
					},
					{
						"label": "checking if a value is an array",
						"text": "Array.isArray(x) — typeof x on an array is just \"object\", it can't tell arrays apart"
					},
					{
						"label": "user-defined guard x is T",
						"text": "a function returning x is T; narrows the caller's variable after a truthy check — the key in x is T must be quoted"
					},
					{
						"label": "type guard inside .filter",
						"text": "TS 5.5+ infers the predicate automatically — no x is T annotation needed"
					},
					{
						"label": "narrow unknown in catch",
						"text": "catch bindings are unknown under strict mode; a throw can deliver a non-Error, so guard before use"
					}
				]
			},
			{
				"title": "Assertions",
				"items": [
					{
						"label": "as type assertion",
						"text": "legal only either-direction between the two types; compiles but lies at runtime — a as Dog still has no real .breed"
					},
					{
						"label": "as const",
						"text": "deep readonly at every depth; value-space only — illegal on the right of type X = ..."
					},
					{
						"label": "non-null assertion x!",
						"text": "emits nothing at runtime; a wrong ! just fails later at the property read"
					},
					{
						"label": "satisfies operator",
						"text": "checks the value against a type but keeps the narrower inferred type — no widening"
					},
					{
						"label": "double assertion as unknown as T",
						"text": "bypasses the overlap check entirely; nothing is checked or converted at runtime"
					}
				]
			},
			{
				"title": "Utility types",
				"items": [
					{
						"label": "Partial<T> / Required<T>",
						"text": "make every property optional / make every property required"
					},
					{
						"label": "Pick<T,K> / Omit<T,K>",
						"text": "select or drop named keys — usable as a return type, not just inline"
					},
					{
						"label": "Record<K,V>",
						"text": "a literal-union key makes every key required; a plain string key stays open (partial)"
					},
					{
						"label": "Readonly<T> / readonly T[] / tuples",
						"text": "shallow only — one level deep, not recursive"
					},
					{
						"label": "ReturnType<T>",
						"text": "extracts a function type's return type; needs typeof on a value first to get its type"
					},
					{
						"label": "Parameters<T>",
						"text": "extracts a function type's parameter list as a tuple"
					},
					{
						"label": "Awaited<T>",
						"text": "recursively unwraps nested Promises"
					},
					{
						"label": "Exclude / Extract / NonNullable",
						"text": "Exclude removes matching union members, Extract keeps only matching ones, NonNullable drops null/undefined"
					}
				]
			},
			{
				"title": "Mapped types",
				"items": [
					{
						"label": "{ [K in keyof T]: ... }",
						"text": "rebuilds an object type by iterating its keys; the homomorphic form passes modifiers through unchanged"
					},
					{
						"label": "modifiers ? / readonly / -? / -readonly",
						"text": "add or strip optional/readonly per key"
					},
					{
						"label": "key remapping as in mapped types",
						"text": "{ [K in keyof T as NewKey]: ... } renames keys, or filters one out entirely when the as clause resolves to never"
					}
				]
			},
			{
				"title": "Conditional types",
				"items": [
					{
						"label": "T extends U ? X : Y",
						"text": "a type-level if/else based on assignability"
					},
					{
						"label": "distributive over unions",
						"text": "a naked type parameter in the check position distributes over each union member; over never it collapses to never"
					},
					{
						"label": "distribution needs a NAKED type parameter",
						"text": "wrapping it in a tuple, [T] extends [U], turns distribution off"
					},
					{
						"label": "recursive conditional & mapped types",
						"text": "a conditional/mapped type can recurse to transform nested structures, e.g. DeepReadonly<T>"
					},
					{
						"label": "infer — placement & multiple sites",
						"text": "introduces a type variable inside the extends clause to capture part of the matched type"
					},
					{
						"label": "infer (extract a type)",
						"text": "the standard way to pull one piece — an element, a return type — out of a larger type"
					}
				]
			},
			{
				"title": "Template-literal types",
				"items": [
					{
						"label": "`${A}-${B}` template-literal types",
						"text": "build string literal types like template strings; distributes over unions in each slot (cross product)"
					},
					{
						"label": "Uppercase / Lowercase / Capitalize / Uncapitalize",
						"text": "the built-in intrinsic type-level string transforms"
					}
				]
			},
			{
				"title": "Function types",
				"items": [
					{
						"label": "function overloads — resolution",
						"text": "first matching signature (declaration order) wins; return types never merge or union"
					},
					{
						"label": "call signature — the braces form",
						"text": "type F = { (x: string): number } — a callable value type; add named members for a callable object"
					},
					{
						"label": "construct signature",
						"text": "new (...args) => T types a constructor itself; abstract new (...) => T types an abstract class"
					},
					{
						"label": "the match-all function type",
						"text": "(...args: never[]) => unknown accepts any function; the unknown[] version rejects typed-parameter functions by contravariance"
					},
					{
						"label": "type parameter position with a callback",
						"text": "a shared <T> can sit outside, in the callback's return, or in the callback's own parameter — the parameter slot is easiest to miss"
					},
					{
						"label": "generic wrapper around a function — where the hole goes",
						"text": "put <T> on the piece that should vary, not the whole shape — <T extends (...args: any[]) => any> only proves 'is a function'"
					},
					{
						"label": "inference through a contravariant callback parameter",
						"text": "candidates from a callback parameter intersect, not union — string and number there infers T = string & number"
					},
					{
						"label": "overloads collapsing into one generic — a verified exception",
						"text": "a rest-parameter generic over a union of tuple shapes, <T extends [Date,Date]|[number]>(...args: T), can legally replace overloads that looked irreducible"
					},
					{
						"label": "composing functions — typing pipe/compose",
						"text": "a generic pipe/compose signature threads one type variable through every stage"
					}
				]
			},
			{
				"title": "Classes",
				"items": [
					{
						"label": "readonly / param properties",
						"text": "readonly blocks reassignment at compile time only — it never freezes the value at runtime"
					},
					{
						"label": "public / private / #",
						"text": "private/protected are compile-time only and still ordinary readable JS properties; # is genuinely private at runtime"
					},
					{
						"label": "implements",
						"text": "a pure compile-time contract check — zero runtime effect, and a mismatch errors at the class name"
					},
					{
						"label": "method vs arrow-function field",
						"text": "m() {} binds this at the call site (detachable, can lose it); m = () => {} binds this once per instance (safe as a passed-around callback, costs one field per instance) — prefer the arrow field for event handlers"
					},
					{
						"label": "get/set accessors",
						"text": "get x(): T / set x(v: U) — a getter with no setter is externally readonly; TS 4.3+ allows the setter's parameter type to differ from the getter's return type; the pair counts as one member for an interface"
					}
				]
			},
			{
				"title": "Runtime validation",
				"items": [
					{
						"label": "excess-property check (literal vs parsed)",
						"text": "only fires on a fresh object literal assigned directly — a variable or already-parsed value skips it"
					},
					{
						"label": "parse, don't validate",
						"text": "return the narrowed value itself from a parser, not just a boolean — a guard alone strips/transforms nothing"
					},
					{
						"label": "derive the type from the schema",
						"text": "type X = z.infer<typeof schema> — infer needs typeof on the schema value, and it's a generic <>, never a call ()"
					},
					{
						"label": "throw vs result (parse / safeParse)",
						"text": ".parse throws on failure; .safeParse returns a discriminated Result instead"
					},
					{
						"label": "unknown-key policy",
						"text": "a schema library must decide: strip, reject, or keep keys it didn't declare"
					},
					{
						"label": "TS has no exact object type",
						"text": "no extra keys isn't expressible structurally — extras are always assignable except the excess-property check on a fresh literal"
					},
					{
						"label": "Checked<T>",
						"text": "a wrapper type only producible by actually running validation, so an unvalidated value can't type-check as trusted"
					},
					{
						"label": "never spread into persistence",
						"text": "map fields explicitly rather than spreading an object into a DB write, so extra/renamed fields can't sneak through"
					},
					{
						"label": "boundaries — where untyped data enters",
						"text": "HTTP request bodies; third-party API responses; queue/workflow inputs; event/pub-sub messages; file uploads; config/env vars; database reads"
					},
					{
						"label": "where validation lives",
						"text": "parse once at the edge; everything downstream trusts the typed value"
					},
					{
						"label": "coercion: strings in, typed values out",
						"text": "schema coercion turns raw string input into typed output — input and output types can legitimately differ"
					},
					{
						"label": "schema composition mirrors utility types",
						"text": "zod's .omit takes a mask object, not a string, the same shape as the Omit<T,K> utility type"
					}
				]
			},
			{
				"title": "Variance & assignability",
				"items": [
					{
						"label": "arrays are covariant (and unsound)",
						"text": "Dog[] assigns to Animal[], which lets an unsound push through the wider reference — the fix is readonly T[]"
					},
					{
						"label": "function parameters are contravariant",
						"text": "a function accepting a WIDER parameter type is assignable where a narrower one is expected"
					},
					{
						"label": "method params are bivariant (the deliberate hole)",
						"text": "method-shorthand syntax checks parameters loosely both ways (unsound, kept for practicality); property-syntax stays strictly contravariant"
					},
					{
						"label": "return types are covariant",
						"text": "a function returning a NARROWER type is assignable where a wider return is expected"
					},
					{
						"label": "ReadonlyArray<T> vs T[]",
						"text": "a one-way door — T[] assigns into ReadonlyArray<T> freely; the reverse is always rejected"
					},
					{
						"label": "tuples and variance",
						"text": "a tuple assigns into a compatible array type; the reverse (array into tuple) is rejected"
					},
					{
						"label": "Map<K,V> covariant in V",
						"text": "because its lib method signatures use shorthand (bivariant) syntax, not strict variance"
					},
					{
						"label": "in / out variance annotations",
						"text": "declare a generic's variance explicitly and let the compiler check it — violation is TS2636"
					},
					{
						"label": "keyof T is contravariant in T",
						"text": "a wider T produces a narrower keyof T (fewer guaranteed keys) — the direction inverts"
					},
					{
						"label": "mutable object property covariance",
						"text": "the same unsound hole as arrays — a narrower-typed object aliased through a wider reference lets you write back an incompatible value"
					},
					{
						"label": "your own generic — measure where T sits",
						"text": "where T appears (return-only / parameter-only / both / unused) decides covariant, contravariant, invariant, or bivariant"
					},
					{
						"label": "the phantom type — an unused T is bivariant",
						"text": "a type parameter that never appears in any member behaves bivariantly, since nothing structurally constrains it"
					},
					{
						"label": "void return accepts any return type",
						"text": "a callback typed to return void still accepts a function that returns something — the value is just ignored"
					},
					{
						"label": "parameter count",
						"text": "a function needing FEWER parameters than expected is assignable; needing MORE is not"
					},
					{
						"label": "tuple arity vs element variance",
						"text": "length compatibility and per-element variance are checked as separate, independent rules"
					},
					{
						"label": "optional is presence, not variance",
						"text": "an optional property changes whether the key must exist, not the compatibility rules for its value type"
					},
					{
						"label": "readonly on a property is not checked",
						"text": "invisible to assignability for plain properties — only readonly arrays get a dedicated check, TS4104"
					},
					{
						"label": "never and unknown as the two edges",
						"text": "any is assignable to everything except never; unknown accepts everything and is assignable to almost nothing"
					},
					{
						"label": "T[K], index signatures, construct signatures",
						"text": "variance applies at each position independently — an index-signature read can be unsound without noUncheckedIndexedAccess"
					},
					{
						"label": "higher-kinded types and the workarounds",
						"text": "a bare type constructor F<_> as a parameter isn't legal TS (TS2315); libraries like fp-ts encode it indirectly via a Kind pattern"
					}
				]
			},
			{
				"title": "Inference",
				"items": [
					{
						"label": "widening: let vs const on a literal",
						"text": "let widens a literal to its general type; const keeps the literal type"
					},
					{
						"label": "why an object literal's property widened",
						"text": "a plain property inside an object literal widens the same way let would, unless fixed by as const, an explicit type, or context"
					},
					{
						"label": "when a union widens (and when it collapses)",
						"text": "let widens every member of an inferred union; TS also collapses redundant subtypes into a wider member"
					},
					{
						"label": "contextual typing",
						"text": "inference flows from the expected type at a position (e.g. a callback parameter's type comes from where it's passed)"
					},
					{
						"label": "inference from a generic call site",
						"text": "TS infers one T per call by picking a best-fit candidate — it does not union multiple candidates together"
					},
					{
						"label": "generic vs overload — the decision",
						"text": "collapse overloads into one generic only when the return type doesn't change shape between forms"
					},
					{
						"label": "groupBy that preserves key literals",
						"text": "the key type should be inferred from the callback's return (K extends string), not from keyof T"
					},
					{
						"label": "NoInfer<T>",
						"text": "marks a position that participates in the check but is excluded from what fills the type parameter"
					},
					{
						"label": "declaration merging",
						"text": "same-named interfaces merge their members; type aliases never merge"
					},
					{
						"label": "constraint vs inference — two different jobs",
						"text": "a constraint (extends) only gates which arguments are legal — it does not narrow what gets inferred for T"
					},
					{
						"label": "when a constraint DOES change what's inferred",
						"text": "a primitive constraint like T extends string turns off literal widening for that argument, but not for arrays"
					},
					{
						"label": "keep literals & tuples at a call site",
						"text": "three ways: as const at the call site, a <const T> type parameter, or an explicit narrow annotation"
					},
					{
						"label": "life of a type parameter — fill order",
						"text": "explicit <> first, then arguments, then the expected result type, then a default, then unknown last"
					}
				]
			},
			{
				"title": "Library-grade authoring",
				"items": [
					{
						"label": "derive union from array (typeof ARR[number])",
						"text": "turns a const array's element type into a union without repeating the literals"
					},
					{
						"label": "build a small utility type from scratch",
						"text": "hand-roll a Pick/Omit-shaped type to prove the mapped/conditional mechanics, not just recognize the built-in"
					},
					{
						"label": "variadic tuples [...T] and [H, ...infer R]",
						"text": "spread/destructure tuple types like array patterns — infer stays lowercase, a dropped slot still needs a real type, not a made-up name"
					},
					{
						"label": "assertion functions: asserts x is T",
						"text": "narrows its argument by throwing instead of returning a boolean — only narrows when called through an explicitly-typed reference (TS2775)"
					},
					{
						"label": "const type parameters <const T>",
						"text": "infers the literal/tuple type as given instead of widening it"
					},
					{
						"label": "abstract new (...) => T",
						"text": "types an abstract class itself, not just its instances — typeof SomeClass is a class name used as a value/parameter type"
					}
				]
			},
			{
				"title": "Vocabulary",
				"items": [
					{
						"label": "assignability",
						"text": "the core question every rule answers: can a value of type A be used where type B is expected?"
					},
					{
						"label": "widening",
						"text": "a literal/narrow type relaxing to its general type once nothing anchors it narrow"
					},
					{
						"label": "narrowing",
						"text": "shrinking a union to a smaller set of members via a runtime check"
					},
					{
						"label": "variance",
						"text": "the umbrella term for how subtyping of T affects subtyping of a type built from T, e.g. Box<T>"
					},
					{
						"label": "covariant",
						"text": "subtyping direction is preserved: Dog <: Animal implies Box<Dog> <: Box<Animal>"
					},
					{
						"label": "contravariant",
						"text": "subtyping direction flips: a function accepting Animal is a subtype of one accepting Dog"
					},
					{
						"label": "invariant",
						"text": "neither direction holds — Box<Dog> and Box<Animal> are unrelated unless T matches exactly"
					},
					{
						"label": "bivariant",
						"text": "accepted both ways unsoundly — TS's deliberate hole for method-shorthand parameters"
					},
					{
						"label": "distributive",
						"text": "a conditional type that, given a naked union type parameter, applies itself to each member separately"
					},
					{
						"label": "homomorphic",
						"text": "a mapped type that iterates keyof T and structurally mirrors T's own modifiers (readonly/optional) instead of a hardcoded literal-key spec"
					},
					{
						"label": "discriminant",
						"text": "the shared literal-typed property (a 'tag') that lets a switch/if narrow a union without instanceof"
					},
					{
						"label": "contextual typing",
						"text": "a type inferred from the position/slot a value is used in, rather than from the value alone"
					},
					{
						"label": "declaration merging",
						"text": "same-named interface declarations combine into one; type aliases and classes never merge this way"
					},
					{
						"label": "higher-kinded type",
						"text": "a type constructor taking a type constructor as its own parameter (e.g. F<_>) — not directly expressible in TS"
					},
					{
						"label": "phantom type",
						"text": "a type parameter that never appears in any member — carries no runtime data, exists purely to tag the type"
					},
					{
						"label": "opaque type / branding",
						"text": "a type made distinguishable from its underlying primitive by an unused marker field, so plain values can't slip in unchecked"
					}
				]
			}
		]
	}
];
