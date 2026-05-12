const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Page - Rahul Shetty Academy', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  // TC01 
test('TC01 - Should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login({
      username: 'rahulshettyacademy',
      password: 'Learning@830$3mK2',
      role: 'Student',
      acceptTerms: true,
    });

    // Wait for navigation after clicking Sign In
    await page.waitForLoadState('networkidle');
    await expect(page).not.toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

// TC02 - replace with this
test('TC02 - Should show error with invalid password', async ({ page }) => {
    await loginPage.login({
      username: 'rahulshettyacademy',
      password: 'WrongPassword123',
      role: 'Student',
      acceptTerms: true,
    });

    // Wait for error message to appear
    await loginPage.errorMessage.waitFor({ state: 'visible' });
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Incorrect');
  });

  test('TC03 - Should not login with empty username', async ({ page }) => {
    await loginPage.login({
      username: '',
      password: 'Learning@830$3mK2',
      role: 'Student',
      acceptTerms: true,
    });
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('TC04 - Should not login with empty password', async ({ page }) => {
    await loginPage.login({
      username: 'rahulshettyacademy',
      password: '',
      role: 'Student',
      acceptTerms: true,
    });
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('TC05 - Should not login without accepting terms', async ({ page }) => {
    await loginPage.login({
      username: 'rahulshettyacademy',
      password: 'Learning@830$3mK2',
      role: 'Student',
      acceptTerms: false,
    });
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');
  });

  test('TC06 - Should display correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/LoginPage Practise/i);
  });

  test('TC07 - Should have Sign In button visible', async ({ page }) => {
    await expect(loginPage.signInButton).toBeVisible();
  });

});