import {test,expect} from '@playwright/test';
import {LoginPageUi} from '../pages/loginpageUi.js'; // Adjust the import path as necessary

test('LoginPage Test', async ({page}) => {
    // Create an instance of the LoginPage class
    const Login = new LoginPageUi(page);
    // Navigate to the login page
    await Login.goto();
    // Perform the login action
    await Login.LoginPage('CHETAN','mathane');
    // Add assertions to verify successful login, e.g., check for a specific element on the homepage
   await expect(page).toHaveURL('https://www.demoblaze.com'); // Adjust URL as needed
  //  await expect(page.locator('h2')).toContainText('Welcome'); // Example assertion, adjust as needed
})
