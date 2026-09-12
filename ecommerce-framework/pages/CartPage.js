class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = 'div[data-testid="cart-item"]';
        this.checkoutButton = 'button[data-testid="checkout-btn"]';
    }

    async goto() {
        await this.page.goto('https://www.bajajmall.in/emi-store/cart');
    }

    async getCartItems() {
        return await this.page.$$(this.cartItems);
    }

    async checkout() {
        await this.page.click(this.checkoutButton);
    }
}

module.exports = CartPage;
