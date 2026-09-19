export class ShoppingCardUI{

    constructor(page) {
        this.page = page;
        // Define locators for the login page elements   
        // this.usernameInput = "//input[@id='loginusername']";
        // this.passwordInput = "//input[@id='loginpassword']";
        // this.loginButtonUi= '//a[@id="login2"]';
        // this.loginButtonAfterclick = "//button[contains(text(),'Log in')]";
    }

    //Get the title of the page
    async getTitleOfPage() {
        const title = await this.page.title();
        return title;
    }
    
    //click on add to cart button
    async ClickOnAddToCartButton() {
        await this.page.locator('//span[@class="a-button-inner"]/a[contains(text(),"Go to Cart")]').second().click();
    }   




}