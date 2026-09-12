const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const PLPPage = require('../pages/PLPPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');

test.describe('Two Wheeler Journey Tests', () => {
    test.beforeEach(async ({ page }) => {
        const home = new HomePage(page);
        await home.goto();
    });

    test.describe('1. Authentication Tests', () => {
        test('Login with valid credentials', async ({ page }) => {
            const login = new LoginPage(page);
            await login.goto();
            await login.login('HarshadaGogate', 'your_password');
            // Add assertions for successful login
        });
    });

    test.describe('2. Product Listing Tests', () => {
        test('Filter and sort two wheelers', async ({ page }) => {
            const plp = new PLPPage(page);
            await plp.goto();
            const initialProducts = await plp.getProducts();
            await expect(initialProducts.length).toBeGreaterThan(0);
            
            // Verify filtering functionality
            const filteredProducts = await plp.getProducts();
            await expect(filteredProducts.length).toBeLessThanOrEqual(initialProducts.length);
        });

        test('Compare two wheeler models', async ({ page }) => {
            const plp = new PLPPage(page);
            await plp.goto();
            const products = await plp.getProducts();
            await expect(products.length).toBeGreaterThan(1);
            // Implement comparison functionality
        });
    });

    test.describe('3. Product Details Tests', () => {
        test('View product details', async ({ page }) => {
            const home = new HomePage(page);
            await home.searchProduct('Two Wheeler');
            
            const plp = new PLPPage(page);
            const products = await plp.getProducts();
            await products[0].click();

            const product = new ProductPage(page);
            const title = await product.getProductTitle();
            await expect(title).toContain('Two Wheeler');
        });

        test('Add two wheeler to wishlist', async ({ page }) => {
            await test.step('Login', async () => {
                const login = new LoginPage(page);
                await login.goto();
                await login.login('HarshadaGogate', 'your_password');
            });

            await test.step('Add to wishlist', async () => {
                const plp = new PLPPage(page);
                await plp.goto();
                const products = await plp.getProducts();
                await products[0].click();
                // Implement wishlist functionality
            });
        });
    });

    test.describe('4. Cart and Checkout Tests', () => {
        test('Complete purchase journey', async ({ page }) => {
            await test.step('Search and select product', async () => {
                const home = new HomePage(page);
                await home.searchProduct('Two Wheeler');
                
                const plp = new PLPPage(page);
                const products = await plp.getProducts();
                await products[0].click();
            });

            await test.step('Add to cart', async () => {
                const product = new ProductPage(page);
                await product.addToCart();
            });

            await test.step('Checkout', async () => {
                const cart = new CartPage(page);
                await cart.goto();
                const cartItems = await cart.getCartItems();
                await expect(cartItems.length).toBeGreaterThan(0);
                await cart.checkout();
            });
        });
    });
    test('Basic two wheeler purchase journey', async ({ page }) => {
        // Home Page
        const home = new HomePage(page);
        await home.goto();
        await home.searchProduct('Two Wheeler');

        // Login Page
        await home.clickLogin();
        const login = new LoginPage(page);
        await login.login('HarshadaGogate', 'your_password');

        // PLP Page
        const plp = new PLPPage(page);
        await plp.goto();
        const products = await plp.getProducts();
        await expect(products.length).toBeGreaterThan(0);
        await products[0].click();

        // Product Page
        const product = new ProductPage(page);
        const title = await product.getProductTitle();
        await expect(title).toContain('Two Wheeler');
        await product.addToCart();

        // Cart Page
        const cart = new CartPage(page);
        await cart.goto();
        const cartItems = await cart.getCartItems();
        await expect(cartItems.length).toBeGreaterThan(0);
        await cart.checkout();
    });

    test('Filter and sort two wheelers', async ({ page }) => {
        // Start from PLP
        const plp = new PLPPage(page);
        await plp.goto();

        // Get initial product count
        const initialProducts = await plp.getProducts();
        const initialCount = initialProducts.length;
        await expect(initialCount).toBeGreaterThan(0);

        // Apply filters and verify results changed
        // Note: Add filter methods to PLPPage class as needed
        // await plp.applyPriceFilter('100000-200000');
        const filteredProducts = await plp.getProducts();
        await expect(filteredProducts.length).toBeLessThanOrEqual(initialCount);
    });

    test('Add two wheeler to wishlist', async ({ page }) => {
        // Login first
        const login = new LoginPage(page);
        await login.goto();
        await login.login('HarshadaGogate', 'your_password');

        // Go to PLP and select product
        const plp = new PLPPage(page);
        await plp.goto();
        const products = await plp.getProducts();
        await expect(products.length).toBeGreaterThan(0);
        await products[0].click();

        // Add to wishlist (uncomment after implementing wishlist functionality)
        const product = new ProductPage(page);
        // await product.addToWishlist();
        // await expect(await product.isInWishlist()).toBeTruthy();
    });

    test('Compare two wheeler models', async ({ page }) => {
        // Go to PLP
        const plp = new PLPPage(page);
        await plp.goto();

        // Select products for comparison
        const products = await plp.getProducts();
        await expect(products.length).toBeGreaterThan(1);

        // Comparison functionality (uncomment after implementing compare methods)
        // await plp.addToCompare(products[0]);
        // await plp.addToCompare(products[1]);
        // await plp.openComparison();
        // await expect(page.locator('.comparison-table')).toBeVisible();
    });
});
