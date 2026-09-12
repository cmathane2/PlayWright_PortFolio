import {test,expect} from '@playwright/test'


test('Inputbox' ,async({page})=>{
//
await page.goto('https://testautomationpractice.blogspot.com/');
await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
const firstname = await page.getByPlaceholder('Enter Name');
await expect(firstname).toBeEditable();
await expect(firstname).toBeVisible();
await expect(firstname).toBeEnabled();
await expect(firstname).toBeEmpty();
await firstname.fill('Chetan');
await expect.soft(firstname).toHaveValue('chetan');
await expect(firstname).toBeEditable();
// to wait for sometime on UI
await page.waitForTimeout(5000);
})

