# Portfolio — Avery Lebene Korto

Personal portfolio site built with **Next.js (App Router)** and **TypeScript**. It showcases projects, an about page, contact, and a blog section that can pull posts from a separate deployed blog.

**Live site:** [averylebenekor.to](https://averylebenekor.to)

---

## Features

- **Landing, projects grid, project detail pages** — Project metadata lives in `lib/projects.ts` and `lib/projectDetails.ts`; images under `public/images/projects/`.
- **Blog listing and post pages** — Fetches from a remote blog via `NEXT_PUBLIC_BLOG_URL` (`/api/public-posts`, or falls back to `feed.json`). Responses are cached with incremental revalidation.
- **Article proxy** — Route `GET /api/article?url=…` fetches and extracts article HTML for display; URLs are restricted to allowed origins (see [Environment variables](#environment-variables)).
- **SEO** — Metadata in `app/layout.tsx`, plus `app/sitemap.ts` for static routes.
- **UI** — Tailwind CSS, Framer Motion, Swiper, react-icons; syntax highlighting for code in articles via `react-syntax-highlighter`.

---

## Tech stack

| Area        | Choice                          |
|------------|----------------------------------|
| Framework  | Next.js 16 (App Router)         |
| Language   | TypeScript                       |
| Styling    | Tailwind CSS                     |
| Animation  | Framer Motion                    |
| Data / CMS | Static project files; blog via HTTP + optional Supabase signing for images |

---

## Requirements

- **Node.js** 20.x (recommended; matches `@types/node` in this repo)
- **npm** (this repo includes `package-lock.json`)

---

## Getting started

Clone the repository and install dependencies:

```bash
git clone <your-repo-url> my-portfolio
cd my-portfolio
npm install
```

### Environment variables

Create `.env.local` in the project root (Next.js loads it automatically). All public variables use the `NEXT_PUBLIC_` prefix so they are exposed to the browser where needed.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BLOG_URL` | Optional* | Base URL of your deployed blog (no trailing slash required), e.g. `https://your-blog.vercel.app`. Used for the blog feed, article fetching, and Next.js `images.remotePatterns`. If unset, the blog section resolves to an empty list and remote blog images are not configured. |
| `NEXT_PUBLIC_SUPABASE_URL` | Optional | Supabase project URL. Together with the anon key, used to create **signed URLs** for blog post images that point at Supabase Storage public URLs. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Supabase anonymous key (public). Required for signing when you use Supabase image URLs from the blog. |
| `NEXT_PUBLIC_STORAGE_BUCKET` | Optional | Storage bucket name for signing; defaults to `blog-images` if unset. |

\*Blog and related integrations need `NEXT_PUBLIC_BLOG_URL` to load posts; the rest of the site runs without it.

Example `.env.local`:

```bash
NEXT_PUBLIC_BLOG_URL=https://your-blog.example.com
# Optional — only if blog images use Supabase Storage URLs you want signed:
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
# NEXT_PUBLIC_STORAGE_BUCKET=blog-images
```

Do not commit `.env.local`. It should stay in `.gitignore`.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The dev server hot-reloads when you edit files.

### Production build

```bash
npm run build
npm run start
```

---

## NPM scripts

| Script | Command | Purpose |
|--------|---------|---------|
| Development | `npm run dev` | Next.js dev server |
| Production build | `npm run build` | Optimized production build |
| Production server | `npm run start` | Serve the production build |
| Lint | `npm run lint` | ESLint (Next.js config) |

---

## Project structure

High-level layout (not every file):

```text
app/
  page.tsx                 # Home
  layout.tsx               # Root layout, metadata, Navbar / Footer / MobileNav
  about/, contact/, projects/, blog/   # Routes
  projects/[slug]/         # Project detail
  blog/[slug]/             # Blog post (remote content)
  api/article/route.ts     # Article fetch + extraction proxy
  sitemap.ts               # sitemap.xml
  components/              # UI sections and shared components
lib/
  projects.ts              # Project list for cards / grids
  projectDetails.ts        # Long-form copy and media for project pages
  blog.ts                  # Fetch posts; Supabase image signing
  article.ts               # Allowed origins + HTML extraction helpers
public/
  images/                  # Static assets (hero, projects, etc.)
```

---

## Customization

- **Site title, SEO, Open Graph:** `app/layout.tsx`
- **Projects:** `lib/projects.ts` and `lib/projectDetails.ts`; add images to `public/images/projects/`
- **Sitemap URLs:** `app/sitemap.ts` (keep in sync with your production domain)
- **Article allowlist:** Origins allowed for `/api/article` are derived in `lib/article.ts` (`getArticleAllowedOrigins`). Adjust if your blog domain changes.

---

## Deployment

The app is a standard Next.js deployment. [Vercel](https://vercel.com) is a common choice: connect the repo, set the same environment variables in the project settings, and deploy.

After changing `NEXT_PUBLIC_BLOG_URL`, rebuild so `next.config.js` can apply the correct `images.remotePatterns` for your blog host.

---

## License

Private project (`"private": true` in `package.json`). All rights reserved.
