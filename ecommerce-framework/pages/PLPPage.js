class PLPPage {
    constructor(page) {
        this.page = page;
        this.productList = 'div[data-testid="product-list"]';
        this.productItem = 'div[data-testid="product-item"]';
    }

    async goto() {
        await this.page.goto('https://www.bajajmall.in/emi-store/products');
    }

    async getProducts() {
        return await this.page.$$(this.productItem);
    }
}

module.exports = PLPPage;
