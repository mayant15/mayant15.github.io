---
date: 2024-02-23T18:40:02-08:00
title: "C++11 and auto with Eigen"
description: ""
math: false
draft: false
---

Do not use auto when using Eigen with C++11.

[Details here](https://eigen.tuxfamily.org/dox/TopicPitfalls.html).

I had a linear system that I wanted to solve like so
```cpp
// A is 4x4, so the result should be a Vector4d
auto result = A.colPivHouseholderQr().solve(b)
```

I just wanted x, y and z, so naturally I did a
```cpp
return Vector3d { result.x(), result.y(), result.z() };
```

All's good. Works great. *In debug builds*.

In release builds however I got random `inf` and `nan` everywhere
```cpp
// result is an innocent (0.5, 0.5, 0.5, 1)
double x = result.x()
// x is a devious nan
```

I spent 2 days debugging this, gave up, then stumbled upon the FAQ in Eigen's docs. A big facepalm later I "fixed" it
```cpp
Vector3d result = A.colPivHouseholderQr().solve(b)
```

Do not use auto when using Eigen with C++11.

