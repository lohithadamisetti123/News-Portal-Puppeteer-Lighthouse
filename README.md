# NovaNews – News Portal with Puppeteer + Lighthouse

NovaNews is a multi-page, performance-focused news portal built with React, Vite, TypeScript, and Tailwind CSS.  
It includes a fully automated Puppeteer + Lighthouse performance testing suite and Core Web Vitals budget enforcement.

## Tech Stack

- React + TypeScript (Vite)
- React Router
- Tailwind CSS
- Puppeteer + Lighthouse (Node scripts)

## Core Routes

- `/articles` – Articles listing page (20+ articles)
- `/article/:id` – Article detail page
- `/search` – Search results page

## Required `data-testid` Attributes

### `/articles`

- `data-testid="articles-list"`
- `data-testid="search-input"`
- `data-testid="search-button"`
- Per article:
  - `data-testid="article-card-{articleId}"`
  - `data-testid="article-title-{articleId}"`
  - `data-testid="article-excerpt-{articleId}"`
  - `data-testid="article-link-{articleId}"`

All `<img>` tags inside `articles-list` use `loading="lazy"`.

### `/article/:id`

- `data-testid="article-title"`
- `data-testid="article-author"`
- `data-testid="article-date"`
- `data-testid="article-content"`
- `data-testid="article-featured-image"`
- `data-testid="back-to-articles"`

### `/search`

- `data-testid="search-results-list"`
- `data-testid="search-query-display"`
- `data-testid="results-count"`

## Performance Test Structure

- Directory: `tests/performance`
  - `lighthouse-articles.test.js`
  - `lighthouse-detail.test.js`

## Performance Reports

- Directory: `performance-reports`
  - `articles-lighthouse.json`
  - `article-detail-lighthouse.json`

These JSON files are generated automatically by the performance tests.

## Single Command to Run App and Tests

From the project root:

```bash
npm run start-and-test
```

This command will:

1. Install dependencies (`npm install`)
2. Build the app in production mode (`npm run build`)
3. Start the app on `http://localhost:3000` (`npm run start`)
4. Wait until `http://localhost:3000/articles` is live
5. Run all performance tests (`npm run test:performance`)

## Individual Commands (Optional)

- Development mode:

  ```bash
  npm install
  npm run dev
  ```

- Production build + preview:

  ```bash
  npm run build
  npm run start
  ```

- Performance tests (requires app already running at port 3000):

  ```bash
  npm run test:performance
  ```

## Performance Budgets Enforced

- Lighthouse Performance Score ≥ 85 (articles & detail)
- Lighthouse Accessibility Score ≥ 90 (articles & detail)
- Core Web Vitals on `/articles`:
  - FCP ≤ 2000 ms
  - LCP ≤ 2500 ms
  - CLS ≤ 0.1
  - TBT ≤ 300 ms

These are checked inside `tests/performance/lighthouse-articles.test.js`.  
If any budget is violated, the script throws an error and fails.

## Optimizations Implemented

- Vite + production build for minified, tree-shaken JS and CSS
- Tailwind CSS for utility-based, highly optimized styles
- Lazy-loaded article images with `loading="lazy"`
- Reused visual assets and optimized remote image hosting
- Highly semantic HTML structure and accessible navigation
- Color contrast and font choices tuned for readability