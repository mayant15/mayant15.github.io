---
date: 2024-07-13T11:36:13-07:00
title: "Building personal tools"
description: "Developing habits with small scripts and plaintext"
math: false
draft: false
---

I first used Vim 7 years ago and gave up. Configuring everything with Vimscript was *really* fun, but I recognized that it was eating away time that I could spend actually writing code, and I didn't know how
to get things *just right*. It was a "skill issue", but configuring an editor is not a skill that I wanted to develop, however fun that is. I wanted something that worked out of the box. I tried Vim
distributions, and they were even worse, pretending to be a faint echo of what a proper IDE could be. I used Atom when it was alive and then JetBrains IDEs, but for some reason I still kept
coming back to Vim. 3 years ago I switched exclusively to Neovim and haven't looked back since. Built-in LSP support and configuring with Lua was the reason why I could start to understand how my tooling 
actually worked. Being able to start from an empty `init.lua` and slowly mold the editor into what I want was *liberating* (shoutout to [ThePrimeagen](https://www.youtube.com/watch?v=w7i4amO_zaE)).

There is something to be said about understanding your tools and the fulfillment that comes from building them yourself. It definitely becomes the easiest excuse for me to procrastinate working on things
I should be doing. But at the same time using something I built myself everyday makes me happy, so why not? There is a line here though. I am not going to build my own editor. Build things that fix small
annoyances, but be aware to not stray too far off (unless that's precisely something you want of course).

The reason why I have been thinking about this recently is because I'm awful at habits. I need to-do lists, I need to track my time, I need to take notes, I need to read more, but none of that ever sticks.
I've tried a *lot* of tools for each one of these things, but I felt the need for something personalized to *me*. Habits stick if you can reduce the friction to start them, and if I cannot find tools to do
that, I build them.

I want to find cool tech and so I started going to Hackernews. That quickly devolved into me lurking through comments instead of actually reading articles. I still cannot stop doomscrolling X (the everything app™)
and I do not want another website to do that. So I set out to build my own aggregation service. I made grand plans to have a server subscribed to news feeds syncing articles to a Notion dashboard and giving me
push notifications every morning. After multiple attempts at something like this, it did not happen. What did stick was a simple script that [dumps three random URLs](https://github.com/mayant15/agg) into my terminal.
Every morning I can now sit with my cup of coffee and pick something to read out of the three links. Minimize friction. Many people have written about [curated personal feeds](https://olano.dev/blog/reclaiming-the-web-with-a-personal-reader/) and the [small web](https://blog.kagi.com/small-web)
and I have to say I agree.

Organizing notes and tasks is another thing I really really struggle with. After trying Notion and Obsidian, I realized I cannot type characters into things that are not Neovim. Inspired by Obsidian's idea
of plaintext notes with markup, I set out to create my own system of Markdown-based notes and tasks, along with shell scripts with regexes that search and filter views. But the thing is, actually *writing*
notes is the hard part, and I slowly started to optimize my scripts for [capturing instead of retrieval](https://news.ycombinator.com/item?id=40951157). At this point I also found [Neorg](https://github.com/nvim-neorg/neorg/), which I now love
for its range of quality-of-life features when working in Neovim. Plaintext markup and small, specific scripts have helped me tune my systems to exactly what I want.

There still are things that I'm not quite happy with, but simple scripts that glue together programs operating on text fit most of my needs.

