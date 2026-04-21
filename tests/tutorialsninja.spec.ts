import { test, expect } from '@playwright/test';

import { TutorialNinjaPage }
  from '../pages/tutorialsninja.page';

import { registerData }
  from '../data/tutorialsninja';

import { generateEmail }
  from '../utils/tutorialsninja.utils';


test(
  'TC_001 Register New User Successfully',
  async ({ page }) => {

    const register =
      new TutorialNinjaPage(page);

    const email =
      generateEmail();

    // Open Page

    await register.gotoRegisterPage();

    // Fill Personal Details

    await register.fillPersonalDetails(

      registerData.firstName,
      registerData.lastName,
      email,
      registerData.telephone

    );

    // Fill Password

    await register.fillPasswordDetails(
      registerData.password
    );

    // Newsletter

    await register.selectNewsletterNo();

    // Accept Privacy

    await register.acceptPrivacyPolicy();

    // Submit

    await register.clickContinue();

    // Validation

    await register.verifyRegistrationSuccess();
    // Click Continue after success

    await register.clickContinueAfterSuccess();

    // Pause to view next page

    await page.waitForTimeout(8000);

  }

);

test(
  'TC_002 Register with Empty Fields (Mandatory Checks)',
  async ({ page }) => {
    const register = new TutorialNinjaPage(page);

    await register.gotoRegisterPage();
    await register.clickContinue();

    await register.verifyMandatoryFieldErrors();
  }
);

test(
  'TC_003 Register with Mismatched Passwords',
  async ({ page }) => {
    const register = new TutorialNinjaPage(page);
    const email = generateEmail();

    await register.gotoRegisterPage();

    await register.fillPersonalDetails(
      registerData.firstName,
      registerData.lastName,
      email,
      registerData.telephone
    );

    // Fill Passwords manually to make them mismatch
    await register.password.fill(registerData.password);
    await register.confirmPassword.fill('WrongPass123!');

    await register.selectNewsletterNo();
    await register.acceptPrivacyPolicy();
    await register.clickContinue();

    await register.verifyPasswordMismatchError();
  }
);


test(
  'TC_004 Register with Existing Email',
  async ({ page }) => {
    const register = new TutorialNinjaPage(page);

    await register.gotoRegisterPage();

    await register.fillPersonalDetails(
      registerData.firstName,
      registerData.lastName,
      'test@test.com', // Usually registered on public demos
      registerData.telephone
    );

    await register.fillPasswordDetails(registerData.password);

    await register.selectNewsletterNo();
    await register.acceptPrivacyPolicy();
    await register.clickContinue();

    await register.verifyEmailAlreadyRegisteredError();
  }
);