
import { test, expect } from '@playwright/test';

test('CheckBox', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const checkboxXPaths = [
    "//input[@id='monday']",
    "//input[@id='friday']",
    "//input[@id='saturday']"
  ];

  for (const xpath of checkboxXPaths) {
    const checkbox = page.locator(xpath);
    await checkbox.waitFor({ state: 'visible', timeout: 5000 });
    await checkbox.check(); 
    await expect(checkbox).toBeChecked();
  }
});

test ('UnCheckBox',async({page})=>
    {
         await page.goto("https://testautomationpractice.blogspot.com/") 
          const checkboxXPaths = [
    "//input[@id='monday']",
    "//input[@id='friday']",
    "//input[@id='saturday']"
  ];
     
         for (const locators of checkboxXPaths)
         {
             const checkbox = page.locator(locators);
            
             await checkbox.waitFor({ state: 'visible', timeout: 5000 });
              
            if( await page.locator(locators).isChecked())
                await page.locator(locators).uncheck();   
         }
    }

)