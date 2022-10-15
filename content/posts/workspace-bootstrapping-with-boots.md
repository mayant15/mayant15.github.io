---
date: 2022-10-15T22:55:36+05:30
title: "Workspace Bootstrapping With Boots"
description: "Creating pristine dev-environments with ease"
math: false
draft: false
---

I tend to try out a bunch of different languages and platforms quite often, and I usually don't want to go through the
trouble of installing these for small experiments. Ideally I'd like to have a simple way to provision a ready to use dev-environment pre-configured to handle the
code I need to look at.

## Remote development's the fad these days

I've looked at services like [Coder](https://coder.com/) and [GitPod](https://www.gitpod.io/)
that do this, but they're either overkill, require a hosted repository, or didn't give me the editing experience I hoped
for. I have tried VS Code's [devcontainers](https://code.visualstudio.com/docs/remote/create-dev-container) in the past and they're pretty good, but I have an OSS distribution now and [can't use their Remote Extensions anymore](https://github.com/VSCodium/vscodium/issues/240). So I decided to build something myself.

Need cleanly separated toolchain installations? Well that's something Docker does really well. If I want to try Rust,
I'd simply pull an image, start a container with my code mounted and play with it.
```shell
cd my-code
docker run -v $(pwd):/my-code --rm -it rust:latest
```

Simple and effective. But what about my editor? Giving up VS Code made me fall back in love with Neovim. I've sunk too many hours into getting my `init.vim` just right, and I don't intend to
part ways with it anytime soon. I need to be able to use it inside the container.
I wasn't able to get a [client/server](https://neovim.io/doc/user/remote.html) thing running for Neovim, so I settled for a simpler solution, just chuck it into
the image as well. I created a bunch of Dockerfiles extending standard images, copied over my Neovim config (along with all LSP configuration I might need) and started
hosting them over on [GitHub Packages](https://github.com/mayant15/devcontainers).

How do I connect a new terminal? With the container running I can do this to get a new shell into it.
```shell
docker container exec -it <container-id> /bin/sh
```

Now I get an editor for my workspace and a way to attach any number of terminals to it. Moreover, I can start keeping
all my other dotfiles in these images as well, so ZSH, prompt etc. are all exactly how I like them.

## Wrapping it all up

Okay so far so good, it's everything I needed. But it's *ugly*. I don't want to write commands a billion characters
long. I'm also not a fan of having to specify the image every time. So I wrapped it all up in a good ol' bash script,
[boots](https://github.com/mayant15/boots/).

All CLI arguments to boots (like the image name) can also be statically defined in a configuration file called `.bootsrc` in the directory where it's called
```shell
cd my-code
boots start # if I have a .bootsrc
boots start rust:latest # if I need to specify a container
```

To connect a new terminal to the container I'll do
```shell
boots connect <container-id>
```

There, much better. I can stop configuring and start experimenting again :D

[*Check out boots here!*](https://github.com/mayant15/boots)

