import { test,expect} from '@playwright/test' ;
/*
test('title of test' , async ({page})=>{
await page.goto('https://www.facebook.com/');
const title =await page.title();
await expect(page).toHaveTitle(title) ;

});

test ('title of test2' , async ({page})=>{
await page.goto('https://www.facebook.com/');
const titleofpage =await page.title();
await expect(page).toHaveTitle(titleofpage) ;
console.log('Page title is:',titleofpage);
await page.close();
});
*/
test ('LoginPage' , async ({page})=>{
await page.goto('https://www.facebook.com/');
const titleofpage =await page.title();
await expect(page).toHaveTitle(titleofpage) ;
console.log('Page title is:',titleofpage);
const username =await page.locator('//input[@name="email"]').fill("chetan");
//secong way to send the text in text box
 await page.fill('//input[@name="pass"]','passwrord');
await page.click('//button[@name="login"]');
page.close();
})

////a[@data-testid="open-registration-form-button"]

test ('ClickOncreateAccount ' , async ({page})=>{
await page.goto('https://www.facebook.com/');
//USING Property ('key,value')
await page.click('data-testid=open-registration-form-button');
//await page.click('//button[@name="login"]');
page.close();
})
