export class ProceedToBuyUI{

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
    async ClickOnProceedToBuyButton() {
        await this.page.locator('//input[@name="proceedToRetailCheckout"]').click();
    }   

}