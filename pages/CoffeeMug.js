export class CoffeeMugUI {
    constructor(page) {
        this.page = page;
    }

        async getTitleOfPage() {
        return await this.page.title();
    }

    async TitleOfProducts(productName) {
        const product = this.page.getByText(productName, { exact: true }).first();
        await product.click();
        return this.page;
    }

    async clickOnfirstProduct() {   
    
        const firstProduct = this.page.locator("//div[@class='a-section aok-relative s-image-square-aspect']").first();
        await firstProduct.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(2000);
        await firstProduct.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(2000);
        await firstProduct.click();
        return this.page;
    }

    // Verify the title of the page in the test file.
}
