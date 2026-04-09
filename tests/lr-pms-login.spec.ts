import { test, expect } from '@playwright/test';

  test('LogicRays - Complete Login Flow', async ({ page }) => {
  // Run - npx playwright test pms-login.spec.ts --project=chromium --headed
  // Run - npx playwright test pms-login.spec.ts --project=firefox --headed
  // Run - npx playwright test pms-login.spec.ts --project=webkit --headed
  // For - Keep browser open after execution (for observation/debugging)
  // Run - npx playwright test pms-login.spec.ts --project=chromium --debug
  // For - Slow down execution
  // Run - npx playwright test pms-login.spec.ts --project=chromium --headed --slow-mo=8000
  // Step 1: Open Login Page
  await page.goto('https://logicrays.logicraystracker.com/login');

  // Step 2: Enter Credentials
  await page.getByPlaceholder('Email').fill('ravi@logicrays.com');
  await page.getByPlaceholder('Password').fill('Test@123');

  // Step 3: Click Login (fixed locator)
  await page.locator('a:has-text("Login")').click();

  // Step 4: Wait for navigation
  await page.waitForURL('**/dashboard');

  // Step 5: Validate redirect
  await expect(page).toHaveURL(/dashboard/);
  await page.pause(); // 👈 browser will stop here

  // Step 6: Screenshot (with URL label)
  await page.evaluate(() => {
    const div = document.createElement('div');
    div.innerText = 'Target Test URL: ' + window.location.href;
    div.style.position = 'fixed';
    div.style.top = '0';
    div.style.left = '0';
    div.style.background = 'yellow';
    div.style.zIndex = '9999';
    div.style.padding = '5px';
    document.body.appendChild(div);
  });

  await page.screenshot({ path: 'Dashboard.png', fullPage: true });

});
