const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://nowauctions.net/login');
  await page.screenshot({ path: 'Header.png' });

  await browser.close();
})();
