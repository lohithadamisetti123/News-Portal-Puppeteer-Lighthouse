// tests/performance/lighthouse-articles.test.js
const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const fs = require("fs");
const { URL } = require("url");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const appUrl = "http://localhost:3000/articles";

  const wsEndpoint = browser.wsEndpoint();
  const url = new URL(wsEndpoint);
  const port = url.port;

  const { lhr } = await lighthouse(appUrl, {
    port,
    output: "json",
    logLevel: "error",
    onlyCategories: ["performance", "accessibility"],
  });

  if (!fs.existsSync("performance-reports")) {
    fs.mkdirSync("performance-reports");
  }

  const reportPath = "performance-reports/articles-lighthouse.json";
  fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2));

  const perfScore = lhr.categories.performance.score * 100;
  const accScore = lhr.categories.accessibility.score * 100;

  console.log(`Articles page performance score: ${perfScore}`);
  console.log(`Articles page accessibility score: ${accScore}`);

  if (perfScore < 85) {
    throw new Error(
      `Performance score below budget (85). Got: ${perfScore}`
    );
  }
  if (accScore < 90) {
    throw new Error(
      `Accessibility score below budget (90). Got: ${accScore}`
    );
  }

  const fcp = lhr.audits["first-contentful-paint"].numericValue;
  const lcp = lhr.audits["largest-contentful-paint"].numericValue;
  const cls = lhr.audits["cumulative-layout-shift"].numericValue;
  const tbt = lhr.audits["total-blocking-time"].numericValue;

  console.log("FCP (ms):", fcp);
  console.log("LCP (ms):", lcp);
  console.log("CLS:", cls);
  console.log("TBT (ms):", tbt);

  if (fcp > 2000) {
    throw new Error(`FCP above budget (2000ms). Got: ${fcp}`);
  }
  if (lcp > 2500) {
    throw new Error(`LCP above budget (2500ms). Got: ${lcp}`);
  }
  if (cls > 0.1) {
    throw new Error(`CLS above budget (0.1). Got: ${cls}`);
  }
  if (tbt > 300) {
    throw new Error(`TBT above budget (300ms). Got: ${tbt}`);
  }

  await browser.close();
})();