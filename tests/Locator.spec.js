import { test, expect } from "@playwright/test"
import { Console } from "console";

test('multiple element',async({page})=>
{
   await page.goto('https://www.demoblaze.com/');
   //div[@class='list-group']//a
   const catagores = await page.$$("//div[@class='list-group']//a")
   for(const catagory of catagores)
    {
        const catagoryname = await catagory.textContent();
        console.log(catagoryname);
    }
})

test('different locators ',async({page})=>{
page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",{
  waitUntil: 'load',
  timeout: 60000,
});
await page.waitForLoadState('networkidle');
// by using getByAltText
const ImageA = await page.getByAltText("company-branding",{  timeout: 60000 });
await expect(ImageA).toBeVisible();
//page.getByPlaceholder();
await page.getByPlaceholder("Username").fill("chetan");
await page.getByPlaceholder("Password").fill("Mathane");

//page.getByRole();
await page.getByRole('Button',{type:'Submit'}).click();
//page.getByLabel();
//page.getByTitle();
//page.getByTestId();
//page.getAttribute();
 //page.getByText();
await page.getByText("Forgot your password?").click();
/*
page.getByPlaceholder();
page.getByRole();
page.getByText("Chapters");

page.getByLabel();
page.getByTitle();
page.getByTestId();
page.getAttribute();
*/
})

