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

  continueAfterSuccess =
    this.page.getByRole('link', { name: 'Continue' });

  // Error Locators
  warningMessage = this.page.locator('.alert-danger');
  firstNameError = this.page.locator('#input-firstname + .text-danger');
  lastNameError = this.page.locator('#input-lastname + .text-danger');
  emailError = this.page.locator('#input-email + .text-danger');
  telephoneError = this.page.locator('#input-telephone + .text-danger');
  passwordError = this.page.locator('#input-password + .text-danger');
  confirmPasswordError = this.page.locator('#input-confirm + .text-danger');

  // Actions

  async fillPersonalDetails(
    firstName: string,
    lastName: string,
    email: string,
    phone: string
  ) {

    //await this.firstName.fill(firstName);
    //await this.lastName.fill(lastName);
    //await this.email.fill(email);
    //await this.telephone.fill(phone);
    await this.firstName.fill(firstName, { delay: 240 });
    await this.lastName.fill(lastName, { delay: 240 });
    await this.email.fill(email, { delay: 240 });
    await this.telephone.fill(phone, { delay: 240 });

  }

  async fillPasswordDetails(password: string) {

    //await this.password.fill(password);
    //await this.confirmPassword.fill(password);
    await this.password.fill(password, { delay: 240 });
    await this.confirmPassword.fill(password, { delay: 240 });

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


    // Wait so you can see success page
    await this.page.waitForTimeout(8000);

  }

  async clickContinueAfterSuccess() {

    await this.continueAfterSuccess.click();

  }

  // Validations for Negative Cases
  async verifyMandatoryFieldErrors() {
    await expect(this.warningMessage).toContainText('Warning: You must agree to the Privacy Policy!');
    await expect(this.firstNameError).toHaveText('First Name must be between 1 and 32 characters!');
    await expect(this.lastNameError).toHaveText('Last Name must be between 1 and 32 characters!');
    await expect(this.emailError).toHaveText('E-Mail Address does not appear to be valid!');
    await expect(this.telephoneError).toHaveText('Telephone must be between 3 and 32 characters!');
    await expect(this.passwordError).toHaveText('Password must be between 4 and 20 characters!');
  }

  async verifyEmailAlreadyRegisteredError() {
    await expect(this.warningMessage).toContainText('Warning: E-Mail Address is already registered!');
  }

  async verifyPasswordMismatchError() {
    await expect(this.confirmPasswordError).toHaveText('Password confirmation does not match password!');
  }

}