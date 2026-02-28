---
title: "Aver: a programming language to harness AI"
date: 2026-02-28
lang: en
status: seed
description: "I've built programming language I never want to write in, but I love how easy it is to verify"
---

One evening I started to imagine what programming may look like when AI writes all the code. And I went into the rabbit hole, which ended up in working language prototype called Aver.
AI Agents which tried to use it told me it feels like straitjacket, but in a good way.

Check it here https://github.com/jasisz/aver

## What were the assumptions?

I started with only one assumption: that AI will write all the code in the near future. And if I was to build a language for AI to write in, how could it possibly look?

I know AI was trained on existing code, so the more popular the language, AI knows more about it, and it is easier for it to write in? So AI is fluent in Python or TypeScript.
Possibly true, but there are benchmarks saying that AI actually behaves better in... Elixir.

So when working on Aver I tried to forget pretty much everything I know about programming languages and current paradigms, because they were created for humans. Spoiler alert: I've ended up with a functional language.

Aver is not meant as a tool or way of communicating with AI or orchestrating it. It is meant for AI to write in. And it is easy to verify. By whom? By anyone. By AI. By humans. By anyone who can read the code and understand it.

Code is a letter to the next reader.

## Design by inconvenience

I stripped language of everything that is not needed. I may have gone too far, but it was logical and refreshing to do.

Do we need if statements? No, pattern matching is enough.

Do we need guard clauses in match? No, nested match on true/false is verbose but verifiably exhaustive.

Do we need exceptions? No, we can use Result type and ? operator.

Do we need loops? No, we can use recursion.

Do we need classes? No, we can use records and modules.

Do we need lambdas and closures? No, we can always define named functions.

Do we need variables? No, we can use immutable values only.

Do we need package managers? No, we can make AI write everything for us.

Do we need nice imports with short names? No, we can use modules and full namespaces, which are reflected in the file system.

Do we need documentation? No, we can make intent, descriptions, and decisions part of the syntax — code documents itself or it doesn't compile.

Is writing code in Aver easy? Hell no, at least not for me. But AI doesn't mind, AI says it is fun and explicit. It only asks me for closures, but doesn't mind and quickly adapts to the style.

A prompt is a request. A language is the law.

## If writing is hard, why is it easy to read?

I don't know really. But it definitely is. Reads like a charm, like a lengthy love letter.

Flow is always simple. Everything is nicely named and structured. You don't have to look for loopholes, because there cannot be any in a lot of places.
Minimal design just makes whole classes of errors impossible to make in the first place.

And what I added?

Every function can have a line with a description, starting with an `?`, and it is not a comment, just a part of the definition.

Every non-trivial pure function has to have `verify` block, which is a collocated test and contract for the function.
Even if you don't know what the function does, you can still see what it really does.

I added `decision` blocks as part of the language. Why things were done that way, not the other? Those aren't really enforced.
One may argue those are just glorified comments, or ADRs living in the same file. Maybe they are, but you know what?
The next reader reads them. If it is a human it makes it easier to understand. If it is an AI it works partially as prompt injection? Or maybe, in better words, written chain of thought.

And I added effects. `! [Http, Console]` so you know that this function does HTTP calls and uses console.
It is not just a comment, it is part of the signature. You cannot ignore it, and you cannot forget about it, because it is enforced by the parser and in runtime.
Every function calling it has to have `! [Http, Console]` (or more) in its signature too. Tedious, repetitive, but you just need a single look. And AI is writing it, not you.

Aver is not for writing, it is for reading.

## What does this minimalistic design lead to?

There are emergent properties of the language, which I didn't expect at a first glance, but now I love.

You may export headers of all the functions in a module (and modules it uses) to a simple json or markdown. It is like documentation for AI, saves tokens.

You may export and query decisions only.

You don't have verify blocks for effectful function, but you may record and replay all the effects. It is like a debugger, but for AI.

It is really easy to verify that all matches are exhaustive.

It is really easy to build a tail-call optimization because there are no mutations, no side effects in loops, and no exceptions that would break tail position. Match in tail position is the only branching, so the transform is straightforward.

Auto-memoization just works. Everything is immutable and pure functions are marked as such simply by the absence of effects. The interpreter can decide what to cache on its own — no annotations needed.

Variable resolution is trivial. No closures means... no captured environments, every function sees globals and its own parameters, nothing else. Every variable has a fixed slot.

It feels so obvious, but it is not obvious at all.

## Let Aver speak for its own

I know it all may think like an artistic project created by some lunatic. But check this, it works, pure Aver.

```aver
module TrustCheck
    intent =
        "Decides whether to trust AI-generated code."
    exposes [canTrust]

decision RequireVerification
    date = "2026-02-28"
    reason =
        "AI writes convincing code that may be subtly wrong."
        "Verify blocks make correctness visible, not assumed."
    chosen = VerifyBlocks
    rejected = [TrustByDefault, ManualReview]
    impacts = [canTrust]

record CodeReview
    hasVerify: Bool
    hasIntent: Bool

fn canTrust(review: CodeReview) -> Result<String, String>
    ? "Decides whether AI-generated code can be trusted. Spoiler: read it anyway."
    match review.hasVerify
        false -> Result.Err("No verify block — how do you know it works?")
        true -> match review.hasIntent
            false -> Result.Err("No intent — what is this even for?")
            true -> Result.Ok("Looks trustworthy. But read it anyway.")

verify canTrust
    canTrust(CodeReview(hasVerify = false, hasIntent = true)) => Result.Err("No verify block — how do you know it works?")
    canTrust(CodeReview(hasVerify = true, hasIntent = false)) => Result.Err("No intent — what is this even for?")
    canTrust(CodeReview(hasVerify = true, hasIntent = true)) => Result.Ok("Looks trustworthy. But read it anyway.")

fn reviewAndReport(review: CodeReview) -> Unit
    ? "Reviews code and reports the verdict."
    ! [Console]
    match canTrust(review)
        Result.Ok(msg) -> Console.print("PASS: {msg}")
        Result.Err(msg) -> Console.print("FAIL: {msg}")

fn main() -> Unit
    ! [Console]
    thisProgram = CodeReview(hasVerify = true, hasIntent = true)
    reviewAndReport(thisProgram)
```

I built Aver's interpreter in Rust using Claude. I cannot verify all the Rust it wrote. If it had written it in Aver, maybe I could.
