class ProductPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = 'button[data-testid="add-to-cart-btn"]';
        this.productTitle = 'h1[data-testid="product-title"]';
    }

    async getProductTitle() {
        return await this.page.textContent(this.productTitle);
    }

    async addToCart() {
        await this.page.click(this.addToCartButton);
    }
}

module.exports = ProductPage;
