import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://logicrays.logicraystracker.com/login';
const STAGING_URL = 'https://webtracker.lrdevteam.com/';

// Run - ENV=pro npx playwright test lr-pms-login.spec.ts --project=chromium --headed  (for production)
// Run - ENV=stag npx playwright test lr-pms-login.spec.ts --project=chromium --headed  (for staging)
// Run - npx playwright test lr-pms-login.spec.ts --project=firefox --headed
// Run - npx playwright test lr-pms-login.spec.ts --project=webkit --headed
// For - Keep browser open after execution (for observation/debugging)
// Run - npx playwright test lr-pms-login.spec.ts --project=chromium --debug
// For - Slow down execution
// Run - npx playwright test lr-pms-login.spec.ts --project=chromium --headed --slow-mo=8000

test.describe('LogicRays Login Test Scenarios', () => {

  // Determine environment from ENV variable, default to 'pro'
  const env = process.env.ENV || 'pro';
  const loginUrl = env === 'stag' ? STAGING_URL : PRODUCTION_URL;

  // TC_001
  test('TC_001 - Empty Email & Password', async ({ page }) => {
    await page.goto(loginUrl);

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
    await expect(page.locator('body')).toContainText(/required|invalid|error/i);
  });

  // TC_002
  test('TC_002 - Invalid Email & Invalid Password', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('invalid@test.com');
    await page.getByPlaceholder('Password').fill('wrong123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_003
  test('TC_003 - Invalid Email & Valid Password', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('invalid@test.com');
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_004
  test('TC_004 - Valid Email & Invalid Password', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('ravi@logicrays.com');
    await page.getByPlaceholder('Password').fill('wrong123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_005
  test('TC_005 - Empty Email & Valid Password', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_006
  test('TC_006 - Valid Email & Empty Password', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('test_negative@logicrays.com');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_007
  test('TC_007 - Invalid Email Format (missing @)', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('ravilogicrays.com');
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_008
  test('TC_008 - Invalid Email Format (missing domain)', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('ravi@');
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_009
  test('TC_009 - SQL Injection Attempt in Email', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill("' OR 1=1 --");
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_010
  test('TC_010 - XSS Attempt in Email', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill("<script>alert('xss')</script>");
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_011
  test('TC_011 - Extremely Long Email', async ({ page }) => {
    await page.goto(loginUrl);

    const longEmail = 'a'.repeat(256) + '@logicrays.com';
    await page.getByPlaceholder('Email').fill(longEmail);
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_012
  test('TC_012 - Extremely Long Password', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('test_negative@logicrays.com');
    const longPassword = 'a'.repeat(256);
    await page.getByPlaceholder('Password').fill(longPassword);

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_013
  test('TC_013 - Password with leading and trailing spaces', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('test_negative@logicrays.com');
    await page.getByPlaceholder('Password').fill('  Test@123  ');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_014
  test('TC_014 - Valid Email & Valid Password', async ({ page }) => {
    await page.goto(loginUrl);

    await page.getByPlaceholder('Email').fill('ravi@logicrays.com');
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);
    await page.pause(); // 👈 browser will stop here

    // Screenshot (with URL label)
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

});