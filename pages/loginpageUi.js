export class LoginPageUi{

    constructor(page) {
        this.page = page;
        // Define locators for the login page elements   
        this.usernameInput = "//input[@id='loginusername']";
        this.passwordInput = "//input[@id='loginpassword']";
        this.loginButtonUi= '//a[@id="login2"]';
        this.loginButtonAfterclick = "//button[contains(text(),'Log in')]";
    }
    async goto() {
        // Navigate to the login page
        await this.page.goto('https://www.demoblaze.com/');
    }
    async LoginPage(username, password) {
        // Navigate to the login page
      //  await this.page.goto('https://example.com/login');
        
        // Enter username and password
        //await this.page.fill(this.usernameInput, username);
        //await this.page.fill(this.passwordInput, password);
        //or
        await this.page.click(this.loginButtonUi);
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
         await this.page.click(this.loginButtonAfterclick);

        
    }

}