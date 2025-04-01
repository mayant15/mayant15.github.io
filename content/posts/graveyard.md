---
date: 2024-05-20T19:52:35-07:00
title: "Graveyard"
description: "A small list of recent projects I abandoned"
math: true
draft: false
---

Here's a small list of recent projects that I abandoned over the last 8 months because they either didn't work out as expected or I just lost interest.

## Sampling fuzzer

Try collecting coverage information by sampling the call stack instead of binary instrumentation for binary-only fuzzing. This wasn’t very efficient because 1) ptrace and sampling is a LOT slower than instrumentation upfront and letting the program run, and 2) sampling the stack might have different results even if the program takes the exact same code path.

The second problem is more interesting. It boils down to this: you have a graph $G$ (control-flow graph), and you have a collection of sub-graphs $C$ (code coverage for specific inputs). Given an arbitrary sub-graph $H$ (sampled coverage for a run), find a $S \in C$ such that $H \subseteq S$. We want to know if a new $H'$ is actually a new $S' \in C$ or a resampling of the same $S$.

There’s probably some statistical classification technique and some smart encoding for these graphs that does the job well-enough.

## Bulk fuzzing

This was just bad.

The idea was to somehow approximate a function that takes a list of program inputs and outputs a cumulative coverage metric for branches exercised by all those inputs. Instead of getting AFL to mutate individual inputs, I wanted it to mutate and splice the entire “set” of inputs at once (string concatenation of multiple inputs with a separator). Initial results were extremely positive. But turns out I had polluted my AFL output directories between experiments and all results were invalid :D

## Sampling SMT constraints

Sometimes with fuzzing you can use SMT solvers to explicitly generate inputs that get into hard to reach areas that usual fuzzing mutations cannot get into. The idea was to see what happens if we generate a bunch of inputs instead of a single input that satisfies that constraint. Tried fuzzing libxml with [AFL++](https://github.com/AFLplusplus/AFLplusplus) and [SymCC](https://github.com/eurecom-s3/symcc) (modified to call [smtsampler](https://github.com/RafaelTupynamba/SMTSampler) instead of Z3 direct). Did not see any significant differences from plain AFL++. Even the SymCC and AFL++ combo doesn’t do anything now. AFL++ has improved a lot since SymCC came out.

## Call hierarchies for dynamic programs

Sometimes with closures and stuff LSPs don’t really display true incoming/outgoing calls. For example with something like

```javascript
function hello() { console.log('hello') }
function run(f) { f() }
run(hello)
```

If you do a “find incoming calls” on `hello` it wouldn’t show you the call coming from inside `run`. I thought this might be problematic for symbolic executors, and for general debugging as well. There could be some data-flow analysis that helps here, instead of plain pattern-matching on the AST.

# Update

1st April 2025

## Type coercion for symbolic executors

While looking into the call hierarchies idea above I tried symbolic execution of JavaScript with
[ExpoSE](https://github.com/ExpoSEJS/ExpoSE). Quickly ran into issues with dynamic typing because ExpoSE needs to encode path constraints
into theories Z3 can understand, so it assumes values stay the same type throughout. This is a
problem when solving constraints because there might be a different type that exposes a bug.
For example:
```javascript
const a = symbol(0)
if (a == null) {
    throw Error("null pointer")
}
```
If we assume `a` is always a number this condition is unsatisfiable. But if `a` is user supplied it can
easily be `null` in practice.

Another example is addition. `a + b` would be encoded into a float add for Z3 if `a` and `b` are numbers.
But in reality JavaScript's `+` works with values of any type, even different ones. It just coerces
them to strings or numbers. This is similar to inefficient compilation of JavaScript to machine code
ahead-of-time, except now we don't even have a slow fallback path – the "theory of JavaScript objects"
doesn't exist in Z3.

So I started encoding part of JS type coercion semantics in Z3 with [Viper](https://www.pm.inf.ethz.ch/research/viper.html) and immediately ran into all
sorts of issues, generating SMT constraints that were very, very hard to solve for most practical
programs.

But this principle of "varying input types as well as values" led me to my current work – fuzzing
libraries without function signatures.

## Testing schedulers

Different work scheduling algorithms have different guarantees. I wanted to build something to
load test scheduler implementations and produce counter-example workloads that violate these guarantees,
similar to [PerfFuzz](https://dl.acm.org/doi/abs/10.1145/3213846.3213874). I built a prototype for testing Linux's new EEVDF scheduler which can be found
[here](https://codeberg.org/mayantm/vex). It is a fuzzer that tries to maximize response times for short tasks instead of code coverage,
since Linux's EEVDF tries to schedule smaller tasks early.

Evaluation found that the genetic search doesn't work any better than random here. Looking
more into different fitness functions might help. In principle, you could also use this to compare
and find workloads that respond very differently in two different schedulers.
