const { setWorldConstructor } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

class CustomWorld {
    constructor() {
        this.expect = expect;
    }
}

setWorldConstructor(CustomWorld);
