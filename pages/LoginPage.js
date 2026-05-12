class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.userRadioBtn  = page.locator('input[value="user"]');
    this.roleDropdown  = page.locator('select.form-control'); // ← fixed
    this.termsCheckbox = page.locator('#terms');
    this.signInButton  = page.locator('#signInBtn');
    this.errorMessage  = page.locator('.alert-danger');
  }

  async navigate() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login({ username, password, role = 'Student', acceptTerms = true }) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    // ✅ Handle the popup that appears when User radio is clicked
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    await this.userRadioBtn.click();

    // ✅ Wait for popup to dismiss and page to settle
    await this.page.waitForTimeout(1000);

    await this.roleDropdown.selectOption(role);

    if (acceptTerms) {
      await this.termsCheckbox.check();
    }
    await this.signInButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };