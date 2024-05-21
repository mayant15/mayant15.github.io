---
date: 2024-05-20T19:52:35-07:00
title: "Graveyard"
description: "A small list of recent projects I abandoned"
math: true
draft: false
---

Here's a small list of recent projects that I abandoned over the last 8 months because they either didn't work out as expected or I just lost interest.

## Sampling Fuzzer

Try collecting coverage information by sampling the call stack instead of binary instrumentation for binary-only fuzzing. This wasn’t very efficient because 1) ptrace and sampling is a LOT slower than instrumentation upfront and letting the program run, and 2) sampling the stack might have different results even if the program takes the exact same code path.

The second problem is more interesting. It boils down to this: you have a graph $G$ (control-flow graph), and you have a collection of sub-graphs $C$ (coverage info for particular runs). Given an arbitrary sub-graph $H$, find a $S \in C$ such that $H \subseteq S$.

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

