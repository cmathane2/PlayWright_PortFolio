import {test,expect} from '@playwright/test'
import { Console } from 'console'
import { TIMEOUT } from 'dns'

test('dropdown',async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
//visible text
await page.waitForSelector('//select[@id="country"]')
await page.locator('//select[@id="country"]').selectOption('India')
await page.locator('//select[@id="country"]').waitFor({state: 'visible',timeout:6000})
})

test('dropdown2',async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
//visible text
await page.waitForSelector('//select[@id="country"]')
await page.locator('//select[@id="country"]').selectOption({label:'Canada'})
await page.locator('//select[@id="country"]').waitFor({state: 'visible',timeout:6000})
})
//Using Value Attribute
test('dropdown3',async({page})=>{
await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
//visible text
await page.waitForSelector('//select[@id="country"]')
await page.locator('//select[@id="country"]').selectOption({value:'usa'})
await page.locator('//select[@id="country"]').waitFor({state: 'visible',timeout:6000})
})
//Index value start from =0
test('dropdown4',async({page})=>{
await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
//visible text
await page.waitForSelector('//select[@id="country"]')
await page.locator('//select[@id="country"]').selectOption({Index:'3'})
await page.locator('//select[@id="country"]').waitFor({state: 'visible',timeout:6000})
})

//Given xpath of dropdown & visible text
/*
test('dropdown5',async({page})=>{
await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
//visible text
await page.waitForSelector('//select[@id="country"]')
await page.selectOption("//select[@id='country']",'Germany') 
await page.locator('//select[@id="country"]').waitFor({state: 'visible',timeout:6000})
})
*/

//Assertions

// 1] Check number of options dropdown
test('dropdown5',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
    await page.waitForSelector('//select[@id="country"]')
const options1 = page.locator("//select[@id='country']//option");
await expect(options1).toHaveCount(10);
})
// 2] check number of options in dropdown
test('dropdown6',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
    await page.waitForSelector('//select[@id="country"]')
const options2 = await page.$$("//select[@id='country']//option")
//number of options
console.log("Number of options:",options2.length)
//other option
await expect(options2.length).toBe(10);
})
//Check Presence of value in the dropdown
//Approch 1
test('dropdown7',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
    await page.waitForSelector('//select[@id="country"]')
const content = await page.locator("//select[@id='country']").textContent()
await expect(content.includes('India')).toBeTruthy();
})
//Approch 2
//check presece of value in drop down
test('dropdown8',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/', { waitUntil: 'load' })
    await page.waitForSelector('//select[@id="country"]')
const options = await page.$$("//select[@id='country']//option")
let status = false;
for (const option of options )
{
    console.log(await option.textContent())
    let value =  await option.textContent();
    if (value.includes('France'))
    {
       status =true;
       break;
    }
}
expect(status).toBeTruthy();
})






