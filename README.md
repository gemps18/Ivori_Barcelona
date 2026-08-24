# Ivori Barcelona — React Storefront Rebuild

A React + Tailwind CSS rebuild of the [Ivori Barcelona](https://www.ivoribarcelona.com/)
product catalog, built to match the original site's minimal ivory/ink
aesthetic (uppercase tracked-out labels, hairline borders, square product
imagery, generous whitespace) while adding fast, client-side product
filtering.

## Live features

### Multi-page layout
A proper three-page structure mirroring the original site, routed with
`react-router-dom`:

| Route | Page | Description |
|---|---|---|
| `/` and `/products` | Products | Filterable catalog grid |
| `/contact` | Contact | Contact form |
| `/cart` | Cart | Cart page (UI shell — no cart state logic yet) |
| `*` | Not Found | Catch-all so unmatched links never render blank |

A shared `Navbar` component sits above every page with active-link
highlighting.

### Client-side filtering
The full product catalog (`src/data/products.js`) is held in memory and
imported once. Filtering by category, color, search, and stock status is
computed synchronously with `useMemo` in `useProductFilters` — no server
round-trip, no loading spinner, filtering feels instant.

### Animated, layout-stable transitions
`ProductGrid` uses Framer Motion (`layout` + `AnimatePresence
mode="popLayout"`) so cards animate smoothly into their new position when
the filtered set changes, instead of snapping. Product images sit inside a
fixed `aspect-[4/5]` frame so every card's footprint is identical whether or
not the image has loaded — filtering never causes layout shift (CLS).

### URL-synced filter state
All filters live in the URL via `useSearchParams`
(e.g. `?category=shirts,dresses&color=black&sort=price-asc&inStock=1`),
so any filtered view is bookmarkable and shareable, and survives a page
refresh. Filter changes use `{ replace: true }` so they don't spam browser
history.

## Tech stack

- **React 18** + **Vite** — build tooling and dev server
- **Tailwind CSS v4** — styled via the `@tailwindcss/vite` plugin, with
  brand colors defined directly in `src/index.css` using an `@theme` block
  (no `tailwind.config.js` needed — that's the v4 default)
- **react-router-dom** — client-side routing
- **framer-motion** — layout and enter/exit animations
- **oxlint** — fast Rust-based linting (`npm run lint`)

## Project structure

```
src/
  data/
    products.js              In-memory product catalog (26 items)
  hooks/
    useProductFilters.js     Filtering logic + URL search-param sync
  components/
    Navbar.jsx                Site header nav with active-link styling
    FilterBar.jsx              Category chips, color swatches, sort tabs, search
    ProductGrid.jsx             Animated grid (Framer Motion layout + AnimatePresence)
    ProductCard.jsx             Single product tile
  pages/
    ProductsPage.jsx           Composes FilterBar + ProductGrid
    ContactPage.jsx             Contact form
    CartPage.jsx                 Cart placeholder
    NotFoundPage.jsx             404 fallback
  App.jsx                      Router setup, wraps all pages with Navbar
  index.css                    Tailwind import + brand theme tokens
  main.jsx                     React entry point
```

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/ivori-barcelona.git
cd ivori-barcelona
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Opens at `http://localhost:5173` by default, with hot reload on file save.

### 3. Lint

```bash
npm run lint
```

### 4. Build for production

```bash
npm run build
```

Outputs a static, production-ready bundle to `dist/`. Preview it locally
with:

```bash
npm run preview
```

## Deployment

The production build is fully static (no backend), so any static host
works. Two common options:

### Option A — Vercel (recommended, zero config)

1. Push your project to GitHub (see below).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, and click
   **Add New Project**.
3. Select your `ivori-barcelona` repo. Vercel auto-detects Vite and sets the
   build command (`npm run build`) and output directory (`dist`) for you.
4. Click **Deploy**. Every future push to `main` auto-deploys.

### Option B — GitHub Pages

1. Install the deploy helper:
   ```bash
   npm install -D gh-pages
   ```
2. In `vite.config.js`, add a `base` matching your repo name:
   ```js
   export default defineConfig({
     plugins: [react(), tailwindcss()],
     base: "/ivori-barcelona/",
   });
   ```
3. Add these scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
5. In your GitHub repo, go to **Settings → Pages** and set the source to the
   `gh-pages` branch.

## Pushing this project to GitHub

If you haven't already connected this folder to a GitHub repo:

```bash
git init
git add .
git commit -m "Initial commit: Ivori Barcelona React rebuild"
git branch -M main
git remote add origin https://github.com/<your-username>/ivori-barcelona.git
git push -u origin main
```

Make sure a `.gitignore` exists (Vite's scaffold creates one by default)
excluding at least:

```
node_modules
dist
.vscode
```

## Known limitations / next steps

- **Cart has no state management yet.** `CartPage.jsx` is a UI shell with no
  "add to cart" wired up anywhere. A `useCart()` context or similar would
  plug in here next.
- **Contact form doesn't submit anywhere.** No backend exists; the form
  prevents page reload on submit but doesn't send email. Wire it to a
  service like Formspree, Resend, or a custom API route when ready.
- **Product images are placeholders** (`/images/products/<slug>.jpg`).
  Replace with real hosted asset URLs before shipping.