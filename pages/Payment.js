export class PaymentUI{

    constructor(page) {
        this.page = page;
        // Define locators for the login page elements   
        // this.usernameInput = "//input[@id='loginusername']";
        // this.passwordInput = "//input[@id='loginpassword']";
        // this.loginButtonUi= '//a[@id="login2"]';
        // this.loginButtonAfterclick = "//button[contains(text(),'Log in')]";
    }

    async getTitleOfPage() {
        // Navigate to the login page
        const title = await this.page.getTitle();
        return title;
    }
    // verify the title of the page IN the test file.

    //click on cash on delivery radio  button
    async clickOnCashONDelivery() {
        await this.page.locator('#pp-9W6nm4-111"]').check();
    }

}