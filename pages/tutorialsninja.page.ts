import { Page, expect } from '@playwright/test';

export class TutorialNinjaPage {

  constructor(private page: Page) { }

  // URL
  async gotoRegisterPage() {
    await this.page.goto(
      'https://tutorialsninja.com/demo/index.php?route=account/register'
    );
  }

  // Locators

  firstName = this.page.locator('#input-firstname');
  lastName = this.page.locator('#input-lastname');
  email = this.page.locator('#input-email');
  telephone = this.page.locator('#input-telephone');

  password = this.page.locator('#input-password');
  confirmPassword = this.page.locator('#input-confirm');

  newsletterNo =
    this.page.locator('input[name="newsletter"][value="0"]');

  privacyPolicy =
    this.page.locator('input[name="agree"]');

  continueBtn =
    this.page.locator('input[value="Continue"]');

  successMessage =
    this.page.locator(
      'h1:has-text("Your Account Has Been Created!")'
    );

  // Actions

  async fillPersonalDetails(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {

    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.telephone.fill(phone);

  }

  async fillPasswordDetails(password: string) {

    await this.password.fill(password);
    await this.confirmPassword.fill(password);

  }

  async selectNewsletterNo() {

    await this.newsletterNo.check();

  }

  async acceptPrivacyPolicy() {

    await this.privacyPolicy.check();

  }

  async clickContinue() {

    await this.continueBtn.click();

  }

  async verifyRegistrationSuccess() {

    await expect(this.successMessage)
      .toBeVisible();

  }

}