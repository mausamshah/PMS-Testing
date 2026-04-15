import { test, expect } from '@playwright/test';

test('Extract validation messages', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/index.php?route=account/register');
  await page.locator('input[value="Continue"]').click();
  
  const warnings = await page.locator('.alert-danger, .text-danger').allTextContents();
  console.log('VALIDATION ERRORS:', warnings);
});
