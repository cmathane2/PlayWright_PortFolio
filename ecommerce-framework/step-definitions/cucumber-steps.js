const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { expect } = require('@playwright/test');

let browser;
let context;
let page;

// Hooks
Before(async function() {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    this.page = page;
});

After(async function() {
    await context.close();
    await browser.close();
});

// Background steps
Given('I am on the Bajaj Mall homepage', async function() {
    await page.goto('https://www.bajajmall.in/emi-store/');
});

// Authentication steps
Given('I am logged in with following credentials', async function(dataTable) {
    const credentials = dataTable.hashes()[0];
    await page.click('a[data-testid="login-btn"]');
    await page.fill('#username', credentials.username);
    await page.fill('#password', credentials.password);
    await page.click('#login-submit');
});

Given('I am logged in as a registered user', async function() {
    await page.click('a[data-testid="login-btn"]');
    await page.fill('#username', 'testuser@example.com');
    await page.fill('#password', 'password123');
    await page.click('#login-submit');
});

// Search and listing steps
When('I search for {string} in the search bar', async function(searchTerm) {
    await page.fill('input[placeholder="Search for products"]', searchTerm);
    await page.keyboard.press('Enter');
});

Then('I should see tractor listings in the results', async function() {
    const products = await page.$$('.product-list-item');
    expect(products.length).toBeGreaterThan(0);
});

When('I select the first tractor from results', async function() {
    await page.click('.product-list-item >> nth=0');
});

Then('I should see detailed product information', async function() {
    await expect(page.locator('.product-details')).toBeVisible();
});

// Cart steps
When('I add the tractor to cart', async function() {
    await page.click('button[data-testid="add-to-cart-btn"]');
});

Then('the tractor should be added to my cart', async function() {
    await page.click('a[data-testid="cart-btn"]');
    const cartItems = await page.$$('.cart-item');
    expect(cartItems.length).toBeGreaterThan(0);
});

When('I proceed to checkout', async function() {
    await page.click('button[data-testid="checkout-btn"]');
});

Then('I should be able to complete the purchase', async function() {
    await expect(page.locator('.checkout-confirmation')).toBeVisible();
});

// Wishlist steps
When('I click on add to wishlist button', async function() {
    await page.click('button[data-testid="wishlist-btn"]');
});

Then('the tractor should be saved in my wishlist', async function() {
    await expect(page.locator('.wishlist-confirmation')).toBeVisible();
});

// Compare steps
When('I select two tractors for comparison', async function(dataTable) {
    const tractors = dataTable.hashes();
    // Implementation for selecting tractors
});

When('I click on compare button', async function() {
    await page.click('button[data-testid="compare-btn"]');
});

Then('I should see the comparison table', async function() {
    await expect(page.locator('.comparison-table')).toBeVisible();
});

Then('the comparison should show following details', async function(dataTable) {
    const features = dataTable.hashes();
    for (const feature of features) {
        await expect(page.locator(`.comparison-table .${feature.Feature.toLowerCase()}`)).toBeVisible();
    }
});

// Filter steps
When('I apply price filter from {string} to {string}', async function(minPrice, maxPrice) {
    await page.fill('#min-price', minPrice);
    await page.fill('#max-price', maxPrice);
    await page.click('button[data-testid="apply-filter"]');
});

Then('I should see tractors within the selected price range', async function() {
    // Implementation for price range verification
});

// Sort steps
When('I sort tractors by price {string} to {string}', async function(from, to) {
    await page.selectOption('select[data-testid="sort-select"]', `price-${from}-${to}`);
});

// EMI steps
When('I select a tractor with price above {int}', async function(price) {
    // Implementation for selecting tractor above price
});

When('I check available EMI options', async function() {
    await page.click('button[data-testid="emi-options"]');
});

Then('I should see various EMI tenure options', async function() {
    await expect(page.locator('.emi-tenures')).toBeVisible();
});

// Enquiry steps
When('I click on {string} button', async function(buttonText) {
    await page.click(`button:text("${buttonText}")`);
});

When('I fill in the enquiry form with following details', async function(dataTable) {
    const formData = dataTable.hashes()[0];
    await page.fill('#name', formData.Name);
    await page.fill('#mobile', formData.Mobile);
    await page.fill('#email', formData.Email);
    await page.fill('#location', formData.Location);
});

When('I submit the enquiry form', async function() {
    await page.click('button[type="submit"]');
});

Then('I should see enquiry confirmation message', async function() {
    await expect(page.locator('.enquiry-confirmation')).toBeVisible();
});
