// tests/performance/lighthouse-detail.test.js
const puppeteer = require("puppeteer");
const lighthouse = require("lighthouse");
const fs = require("fs");
const { URL } = require("url");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const appUrl = "http://localhost:3000/article/1";

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

  const reportPath = "performance-reports/article-detail-lighthouse.json";
  fs.writeFileSync(reportPath, JSON.stringify(lhr, null, 2));

  const perfScore = lhr.categories.performance.score * 100;
  const accScore = lhr.categories.accessibility.score * 100;

  console.log(`Detail page performance score: ${perfScore}`);
  console.log(`Detail page accessibility score: ${accScore}`);

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

  await browser.close();
})();