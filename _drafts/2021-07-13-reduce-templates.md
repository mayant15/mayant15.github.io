---
layout: post
title: Implementing reduction with C++ templates
math: true
categories: Functional Programming
description: >
   What are the minimum requirements to be able to reduce something?
---

## Recursion with templates

This is what we have:
```c++
int add(int x, int y) {
    return x + y;
}
...
int z = add(1, 2);
```

This is what we want:
```c++
int z = add(2, 3, 2, 3, 5, 2)
```

### Variadic functions

This is the idea of "peeling off" the arguments one by one

```c++
// Description of what we want
int add(int... xs);

// Base case
int add(int x) {
    return x;
}

// General formulation
int add(int x, int... ys) {
    return x + add(ys...);
}
```

A more generic version, also works for heterogenous types as long as they have an appropriate `operator+` defined (and if not, you detect that at compile time, yay!)

```c++
template<class TFirst, class... TArgs>
auto add(TFirst x, TArgs... ys) {
    return x + add(ys...);
}
```

## Reduction

What's the least amount of constraints I can put on this?
- Associative
- Closed (obviously)

This is what we call a [*semigroup*](https://en.wikipedia.org/wiki/Semigroup)

```c++
template<class TFirst, class... TArgs>
auto reduce(TFirst x, TArgs... ys) {
    return some_op(x, reduce(ys...)) // Could be any operator
}
```

Can we take that `some_op` out? We'll pass it as a parameter!

```c++
template<class TOperator, class TFirst, class... TArgs>
auto reduce(TFirst x, TArgs... ys) {
    return TOperator(x, reduce<TOperator>(y...));
}
```
