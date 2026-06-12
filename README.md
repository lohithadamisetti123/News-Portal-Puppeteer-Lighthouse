# NovaNews — Performance-first News Portal

NovaNews is a compact, performance-oriented news portal built with React + TypeScript and audited with Lighthouse via Puppeteer. This repository contains the application source, seeded article data, and an automated Lighthouse test harness that enforces Core Web Vitals budgets.

---

## Quick links

- Live preview (local): `http://localhost:3000/articles`
- Performance reports: `performance-reports/`
- Tests: `tests/performance/`

---

## Contents

- `src/` — application source (React + TypeScript + Tailwind)
- `public/` — static assets
- `tests/performance/` — Puppeteer + Lighthouse test harness
- `performance-reports/` — generated Lighthouse JSON reports
- `package.json` — scripts and dependencies

---

## Setup

1. Clone the repository

```bash
git clone https://github.com/lohithadamisetti123/News-Portal-Puppeteer-Lighthouse.git
cd News-Portal-Puppeteer-Lighthouse
```

2. Install dependencies

```bash
npm install
```

3. Build and preview (production build)

```bash
npm run build
npm run preview -- --port 3000
```

4. Run the automated performance tests (expects preview server on port 3000)

```bash
npm run test:performance
```

---

## Development scripts

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build locally
- `npm run test:performance` — run Lighthouse audits for `/articles` and `/article/1` (uses Puppeteer)

---

## Performance Budgets (enforced by tests)

- Performance score: >= 85
- Accessibility: >= 90
- FCP (First Contentful Paint): <= 2000ms
- LCP (Largest Contentful Paint): <= 2500ms
- CLS (Cumulative Layout Shift): <= 0.1
- TBT (Total Blocking Time): <= 300ms

Detailed budgets are implemented in `tests/performance/lighthouse-articles.test.cjs` and will fail the CI step if violated.

---

## Notes on recent fixes

- Removed Preact aliasing to restore compatibility with React Router v7 hooks
- Replaced external thumbnail requests with inline SVG placeholders to eliminate network image shifts
- Added explicit layout containment and image aspect ratios to reduce CLS
- Stabilized route loading to avoid Suspense fallback-induced layout shifts

---

## UI Screenshots

Add screenshots to document the UI and verification steps. Create a folder `docs/screenshots/` and place PNG or JPG images there. The README references the expected files below so that CI and reviewers can quickly find visual proof.

### Recommended screenshot filenames

- `docs/screenshots/articles-page.png` — articles listing (desktop)
- `docs/screenshots/articles-page-mobile.png` — articles listing (mobile)
- `docs/screenshots/article-detail.png` — article detail (desktop)
- `docs/screenshots/article-detail-mobile.png` — article detail (mobile)
- `docs/screenshots/lighthouse-articles.png` — Lighthouse report summary for `/articles`
- `docs/screenshots/lighthouse-article-detail.png` — Lighthouse report summary for `/article/1`

### Screenshot placeholders (add your images here)

![Articles page desktop](docs/screenshots/articles-page.png)

![Articles page mobile](docs/screenshots/articles-page-mobile.png)

![Article detail desktop](docs/screenshots/article-detail.png)

![Article detail mobile](docs/screenshots/article-detail-mobile.png)

![Lighthouse - articles](docs/screenshots/lighthouse-articles.png)

![Lighthouse - article detail](docs/screenshots/lighthouse-article-detail.png)

> Tip: If you do not have screenshots yet, create the `docs/screenshots/` folder and add placeholder images or exported Lighthouse .png summaries. CI does not require these images, but they make reviews faster.

---

## CI / Review checklist

- [ ] `npm run build` completes without errors
- [ ] `npm run test:performance` passes all budgets (Performance >= 85, CLS <= 0.1, etc.)
- [ ] Screenshots added to `docs/screenshots/`
- [ ] README updated with any visual or testing notes

---

## How the performance tests work

1. The test harness starts a headless Chromium via Puppeteer and navigates to the page under test (e.g., `/articles`).
2. Lighthouse is invoked with a fixed emulation and throttling profile appropriate for lab testing.
3. The Lighthouse JSON output is saved to `performance-reports/` for inspection.
4. The test script validates metrics against the budgets and returns non-zero exit code when budgets fail.

---

## Troubleshooting

- If `npm run test:performance` fails with a CLS > 0.1, try disabling any route Suspense fallback spinners or ensure images and dynamic content reserve space (explicit `width`/`height` or CSS `aspect-ratio`).
- If build fails due to PostCSS/Tailwind issues, run `npx tailwindcss -i ./src/index.css -o ./dist/output.css --minify` to surface errors locally.

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Run tests locally and ensure performance budgets pass
4. Open a Pull Request with screenshots demonstrating passing Lighthouse reports

---

## License

This repository is provided as-is for performance testing demonstrations. No license specified — consult the owner for reuse.

---

## Contact / Owner

Repository: https://github.com/lohithadamisetti123/News-Portal-Puppeteer-Lighthouse

Maintainer: Project owner (see repo)
