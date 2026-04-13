import { test, expect } from '@playwright/test';

// Test 1: Page Load + Screenshot
test('Login page loads', async ({ page }) => {
  await page.goto('https://nowauctions.net/login');

  await expect(page).toHaveURL(/login/);
  console.log('URL:', page.url());

  // Inject URL label into page
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

  await page.screenshot({ path: 'Login.png', fullPage: true });
});


// Test 2: Login Functionality
test('Login test - LogicRays Tracker', async ({ page }) => {
  await page.goto('https://nowauctions.net/login');
  await page.getByPlaceholder('Email').fill('mayur@logicrays.com');
  await page.getByPlaceholder('Password').fill('SUPERadmin@1998');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).not.toHaveURL(/login/);
  await page.pause(); // 👈 browser will stop here
  // Run - npx playwright test nowauctions.spec.ts
});
