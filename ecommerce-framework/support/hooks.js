const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

// Increase step timeout
setDefaultTimeout(60000);

// Create browser instance
BeforeAll(async function() {
    global.browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });
});

// Close browser
AfterAll(async function() {
    await global.browser.close();
});

// Create new context and page for each scenario
Before(async function() {
    this.context = await global.browser.newContext();
    this.page = await this.context.newPage();
});

// Cleanup after scenario
After(async function() {
    await this.page.close();
    await this.context.close();
});
