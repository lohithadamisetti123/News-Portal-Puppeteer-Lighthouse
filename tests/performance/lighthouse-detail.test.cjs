// tests/performance/lighthouse-detail.test.cjs
const puppeteer = require("puppeteer");
const fs = require("fs");
const { URL } = require("url");
const http = require("http");

async function findAppUrl() {
  const tryPorts = [];
  if (process.env.TEST_PORT) tryPorts.push(Number(process.env.TEST_PORT));
  tryPorts.push(3000, 3001, 3002, 4173, 5173);

  for (const p of tryPorts) {
    try {
      const ok = await new Promise((resolve) => {
        const req = http.get(
          { hostname: "127.0.0.1", port: p, path: "/article/1", timeout: 3000 },
          (r) => resolve(r.statusCode === 200)
        );
        req.on("error", () => resolve(false));
        req.on("timeout", () => {
          req.destroy();
          resolve(false);
        });
      });
      if (ok) return `http://localhost:${p}/article/1`;
    } catch (_e) {
      // ignore
    }
  }
  return "http://localhost:3000/article/1";
}

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    });

    const appUrl = await findAppUrl();
    console.log(`Testing: ${appUrl}`);

    const wsEndpoint = browser.wsEndpoint();
    const url = new URL(wsEndpoint);
    const port = url.port;

    // Dynamic import for ESM Lighthouse
    const lighthouseMod = await import("lighthouse");
    const lighthouse = lighthouseMod.default || lighthouseMod;

    const { lhr } = await lighthouse(appUrl, {
      port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility"],
      formFactor: "desktop",
      screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
      },
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0,
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
      throttlingMethod: "simulate",
    });

    // Ensure reports directory
    if (!fs.existsSync("performance-reports")) {
      fs.mkdirSync("performance-reports", { recursive: true });
    }

    const reportPath = "performance-reports/article-detail-lighthouse.json";
    fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2));
    console.log(`Report saved to ${reportPath}`);

    // ── Scores ──
    const perfScore = lhr.categories.performance.score * 100;
    const accScore = lhr.categories.accessibility.score * 100;

    console.log(`\n═══ Article Detail Page Results ═══`);
    console.log(`Performance score: ${perfScore}`);
    console.log(`Accessibility score: ${accScore}`);

    // ── Core Web Vitals ──
    const fcp = lhr.audits["first-contentful-paint"].numericValue;
    const lcp = lhr.audits["largest-contentful-paint"].numericValue;
    const cls = lhr.audits["cumulative-layout-shift"].numericValue;
    const tbt = lhr.audits["total-blocking-time"].numericValue;

    console.log(`\n── Core Web Vitals ──`);
    console.log(`FCP: ${fcp.toFixed(0)}ms`);
    console.log(`LCP: ${lcp.toFixed(0)}ms`);
    console.log(`CLS: ${cls.toFixed(4)}`);
    console.log(`TBT: ${tbt.toFixed(0)}ms`);

    // ── Budget Checks ──
    const errors = [];
    if (perfScore < 85) errors.push(`Performance score ${perfScore} < 85`);
    if (accScore < 90) errors.push(`Accessibility score ${accScore} < 90`);

    if (errors.length > 0) {
      console.error(`\n✗ Budget violations:\n  - ${errors.join("\n  - ")}`);
      throw new Error(`Performance budget violations: ${errors.join("; ")}`);
    }

    console.log(`\n✓ All budgets passed!`);
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
  }
})();