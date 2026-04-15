import { test, expect } from '@playwright/test';

test('LR-PMS Feedback Form - Complete Flow', async ({ page }) => {

  // Step 1: Open Page
  await page.goto('https://www.logicraystracker.com/feedback-form/');

  // Step 2: Wait for Page Title
  await expect(page.locator('h2.elementor-heading-title'))
    .toContainText('LR-PMS Bugs/Feedback Form');

  // Step 3: Fill Basic Details
  await page.locator('[name="your-name"]').fill('Ravi Shah');
  await page.locator('[name="your-email"]').fill('ravi@test.com');

  // Step 4: Select OS
  await page.locator('input[name="your-os"][value="All"]').check();

  // Step 5: Select Browser
  await page.locator('input[name="browser[]"][value="All"]').check();

  // Step 6: Select Type
  await page.locator('input[name="your-type"][value="Bug"]').check();

  // Step 7: Select Priority
  await page.locator('[name="priority"]').selectOption('High');

  // Step 8: Select Department
  await page.locator('[name="departmenttype"]').selectOption('Web');

  // Step 9: Fill Description
  await page.locator('[name="your-description"]').fill(
    'Bug: Login button not working properly.'
  );

  // Step 10: Fill Expected Behaviour
  await page.locator('[name="expected-behaviour"]').fill(
    'User should be redirected to dashboard after login.'
  );

  // Step 11: Upload File
  await page.locator('input[type="file"]').setInputFiles('tests/test-data/sample.png');

  await page.locator('#recaptcha-anchor').click();

  // Step 12: Click Submit
  await page.locator('input[type="submit"]').click();

});