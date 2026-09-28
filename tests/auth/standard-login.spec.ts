import { test, expect } from '../../src/fixtures/base';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test.describe('Authentication', () => {
  test('standard user login flow @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();

    const inventoryPage = await loginPage.loginAs(users.standard);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.cartLink).toBeVisible();
  });
});
