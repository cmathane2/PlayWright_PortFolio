import {test,expect} from '@playwright/test'


test('RadioButton' ,async({page})=>{
//
await page.goto('https://testautomationpractice.blogspot.com/');
await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
//input[@id='male']
await page.locator("//input[@id='male']").check();
await expect( page.locator("//input[@id='male']")).toBeChecked();
await expect( await page.locator("//input[@id='male']").isChecked()).toBeTruthy();
//await expect(page.locator("//input[@id='female']").isChecked()).toBeFalsy();

})

