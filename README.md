# My Personal Website!

My minimal personal site built with Next.js, React, and Tailwind CSS.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Structure

- `app/page.tsx` — home page content (intro, interests, works, blog, contact)
- `app/blog/` — blog index and post pages
- `content/blog/*.md` — blog posts (one markdown file each)
- `public/blog/<slug>/` — images for a post
- `app/layout.tsx` — root layout, fonts, and theming
- `components/theme-provider.tsx` / `components/theme-toggle.tsx` — light/dark mode support

## Writing a blog post

1. Create `content/blog/<slug>.md` (the filename is the URL: `/blog/<slug>`) starting with:

   ```md
   ---
   title: "Post title"
   date: "YYYY-MM-DD"
   description: "One-line summary shown on the blog index."
   ---
   ```

   Add `draft: true` to keep a post unpublished while you work on it.

2. Put images in `public/blog/<slug>/` and reference them as `![Caption](/blog/<slug>/image.png)`. The alt text is shown as the caption.
3. Write the body in markdown (links, `## headings`, lists, `**bold**`, `> quotes`).
4. Preview with `npm run dev`, then commit and push to deploy.
