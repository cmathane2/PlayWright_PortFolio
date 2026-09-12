

import {test,expect} from '@playwright/test'
import { Console } from 'console'
import { TIMEOUT } from 'dns'

test('dropdown',async({page})=>{

    await page.goto('https://www.google.com/', { waitUntil: 'load' })
//visible text
await page.waitForSelector("//textarea[@id='APjFqb']")
await page.locator("//textarea[@id='APjFqb']").click();
const searchoption = await page.locator("//textarea[@id='APjFqb']").fill('delhi')
await page.locator("//span[normalize-space(text()) = 'Delhi']").click();
await page.waitForTimeout(5000)
//await page.locator('//select[@id="country"]').waitFor({state: 'visible',timeout:6000})
})