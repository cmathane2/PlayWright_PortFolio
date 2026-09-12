const fs = require('fs');
const fetch = require('node-fetch');

// waitForSelector
async function waitForSelector(page, selector, timeout = 5000) {
    await page.waitForSelector(selector, { timeout });
}

// generateRandom
function generateRandomString(length = 8) {
    return Math.random().toString(36).substring(2, 2 + length);
}
function generateRandomNumber(length = 6) {
    return Math.floor(Math.random() * Math.pow(10, length));
}

// readConfig
function readConfig(path) {
    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, 'utf8'));
    }
    throw new Error('Config file not found: ' + path);
}

// screenshotOnFailure
async function screenshotOnFailure(page, testName) {
    await page.screenshot({ path: `screenshots/${testName}-failure.png`, fullPage: true });
}

// dateUtils
function formatDate(date = new Date()) {
    return date.toISOString().split('T')[0];
}
function compareDates(date1, date2) {
    return new Date(date1).getTime() === new Date(date2).getTime();
}

// apiUtils
async function apiGet(url) {
    const response = await fetch(url);
    return response.json();
}
async function apiPost(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
}

// fileUtils
function readFile(path) {
    return fs.readFileSync(path, 'utf8');
}
function writeFile(path, data) {
    fs.writeFileSync(path, data, 'utf8');
}

// logger
function log(message) {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
}
function error(message) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
}

// retry
async function retry(fn, retries = 3) {
    let lastError;
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
        }
    }
    throw lastError;
}

// validateUrl
async function validateUrl(url) {
    try {
        const response = await fetch(url);
        return response.ok;
    } catch {
        return false;
    }
}

module.exports = {
    waitForSelector,
    generateRandomString,
    generateRandomNumber,
    readConfig,
    screenshotOnFailure,
    formatDate,
    compareDates,
    apiGet,
    apiPost,
    readFile,
    writeFile,
    log,
    error,
    retry,
    validateUrl
};
