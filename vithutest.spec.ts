import { test } from '@playwright/test';

test('Capture login page screenshot', async ({ page }) => {
  await page.goto('https://nowauctions.net/login');
  await page.screenshot({ path: 'Header.png' });
});
