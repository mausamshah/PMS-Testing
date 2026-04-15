import { test } from '@playwright/test';

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
    await page.waitForTimeout(3000);

  }

);