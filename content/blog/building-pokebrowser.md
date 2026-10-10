---
title: "Building Pokebrowser"
date: "2026-10-10"
description: "How a messy Chrome extension grew into a full web app, and what a year of building it taught me."
---

Hey guys, first blog post here. I wanted to detail my process of developing my latest project, [Pokebrowser](https://www.pokebrowser.net/), a web extension that turns daily browsing into a Pokémon adventure inspired by Pokémon Go.

Pokebrowser has been my passion project for about a year now, and through my experience developing it, I feel like I have improved as a developer. Technically speaking, it is by far my most robust project. But beyond becoming more comfortable with general TypeScript syntax and tools like Supabase, this project has taught me more about the architecture and daily coding decisions that go into truly making an app great.

Take a look at how Pokebrowser looked 1 year ago.

![Pokebrowser one year ago](/blog/building-pokebrowser/pokebrowser-before.png)

It started off as a pure HTML/CSS/JS Chrome extension, and didn’t even have a fully fledged web app, which is the identity of Pokebrowser today. It wasn’t my best work either. The code was messy, the UI looked sloppy, and I was starting to pigeonhole myself into the limitations of making Pokebrowser’s logic live fully inside of the extension. I was using Supabase, but I wasn’t familiar with its capabilities, and I was only using it for Pokémon storage and authentication.

My ambition for the project began to fade, and I got busy with schoolwork, though I knew it was always something I envisioned coming back to. During my fall semester, I gained a lot of experience with web development through design teams and class projects, dabbling in the abilities of Next.js and better frontend/backend separation with my [Journey to the Eye](https://journey-to-the-eye.vercel.app/) project. This was my first-ever deployed project, which you can still check out today!

I applied for a Pokemon Go SWE internship position at Scopely in February, and it was then that I decided to finally revisit Pokebrowser. Before touching a single line of code, I planned the architecture and decided to weigh the tradeoffs between centralizing the logic in a dedicated web app companion and continuing with my extension approach.

Fully mapping out my project allowed me to see flaws in both approaches, especially my original extension-based approach.

1. **Scale:** I wanted a Pokédex and a collection, but how could I expand the project if I wanted to? With this approach, friends, trading, and leaderboards seemed so hard to implement.
2. **Security:** Chrome extensions are not the most secure deployments. With all the encounter logic in the extension, what’s stopping someone from changing their local encounter rates to cheat the extension?
3. **Limitations:** I found it hard to use frameworks like React to make my extension look better. Frontend design was going to be a pain.

Through my planning, I also learned how to solve these issues. One of my favorite tools I got to work with on this project was Supabase’s RPC functions, which helped me move all the encounter logic server-side and implement rate limits. This was something necessary regardless of the approach Pokebrowser took, and I learned a lot about security.

Eventually, I started building the web app, starting small and adding features as I saw fit. Here’s a mockup of the initial Figma draft I made.

![Initial Figma mockup](/blog/building-pokebrowser/figma-mockup.png)

I kept the retro green color scheme but basically changed everything else as I spent more time designing the user experience.

After a few months, I finally had a demo-able user flow I could deploy and give to my friends to use and gain real user feedback, and oh boy did I get a lot of feedback. That entire week was spent doing bug fixes, implementing quality-of-life changes, and adding new features that people really wanted. Suddenly, just a week after I deployed Pokebrowser, I noticed new users who discovered my extension on the web store all on their own. Real users! Honestly, that in itself is an achievement I am super proud of: that my project was good enough to get someone across the world to check it out.

I just released Pokebrowser’s biggest update yet, with a whole new generation of Pokémon, new events, and a whole bunch of requested features, and I find joy in continuing to make Pokebrowser better than it was before. If Pokebrowser is something that interests you even a little bit, I would really appreciate it if you [checked it out](https://www.pokebrowser.net/)!
