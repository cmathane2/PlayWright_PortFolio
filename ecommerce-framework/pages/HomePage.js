class HomePage {
    constructor(page) {
        this.page = page;
        this.searchBox = 'input[placeholder="Search for products, brands and more"]';
        this.loginButton = 'a[data-testid="login-btn"]';
        this.cartIcon = 'a[data-testid="cart-btn"]';
    }

    async goto() {
        await this.page.goto('https://www.bajajmall.in/emi-store/');
    }

    async searchProduct(productName) {
        await this.page.fill(this.searchBox, productName);
        await this.page.keyboard.press('Enter');
    }

    async clickLogin() {
        await this.page.click(this.loginButton);
    }

    async openCart() {
        await this.page.click(this.cartIcon);
    }
}

module.exports = HomePage;
