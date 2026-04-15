import { test, expect } from '@playwright/test';

const PROD_URL = 'https://logicrays.logicraystracker.com/login';
const STAGING_URL = 'https://webtracker.lrdevteam.com/';

test.describe('LogicRays Login Test Scenarios', () => {

  // TC_001
  test('TC_001 - Empty Email & Password', async ({ page }) => {
    await page.goto(STAGING_URL);

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
    await expect(page.locator('body')).toContainText(/required|invalid|error/i);
  });

  // TC_002
  test('TC_002 - Invalid Email & Invalid Password', async ({ page }) => {
    await page.goto(STAGING_URL);

    await page.getByPlaceholder('Email').fill('invalid@test.com');
    await page.getByPlaceholder('Password').fill('wrong123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_003
  test('TC_003 - Invalid Email & Valid Password', async ({ page }) => {
    await page.goto(STAGING_URL);

    await page.getByPlaceholder('Email').fill('invalid@test.com');
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_004
  test('TC_004 - Valid Email & Invalid Password', async ({ page }) => {
    await page.goto(STAGING_URL);

    await page.getByPlaceholder('Email').fill('ravi@logicrays.com');
    await page.getByPlaceholder('Password').fill('wrong123');

    await page.locator('a:has-text("Login")').click();

    await expect(page).toHaveURL(/login/);
  });

  // TC_005
  test('TC_005 - Valid Email & Valid Password', async ({ page }) => {
    await page.goto(STAGING_URL);

    await page.getByPlaceholder('Email').fill('ravi@logicrays.com');
    await page.getByPlaceholder('Password').fill('Test@123');

    await page.locator('a:has-text("Login")').click();

    await page.waitForURL('**/dashboard');
    await expect(page).toHaveURL(/dashboard/);
    //await page.pause(); // 👈 browser will stop here
  });

});
