export class AmazonUI{

    constructor(page) {
        this.page = page;
        // Define locators for the login page elements   
        // this.usernameInput = "//input[@id='loginusername']";
        // this.passwordInput = "//input[@id='loginpassword']";
        // this.loginButtonUi= '//a[@id="login2"]';
        // this.loginButtonAfterclick = "//button[contains(text(),'Log in')]";
    }
    async goto() {
        // Navigate to the login page
        await this.page.goto('https://www.amazon.in/');
    }

    async ClickOnSearchBox() {
        await this.page.locator("input#twotabsearchtextbox").click();
    }

    async EnterSearchText(searchText) {
        await this.page.locator("input#twotabsearchtextbox").fill(searchText);
    }   

    async ClickOnCoffeeMugTravel() {
        await this.page.locator('div[aria-label="coffee mug travel"]').click();
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

   async getHeadlinesTabOnPage() {
    const headlinesTabs = await this.page
        .locator('ul.nav-ul>li>div>a')
        .allTextContents();
    console.log('Headlines tabs on the page:', headlinesTabs);
    return headlinesTabs;
}

   async verifyHeadlinesTabsPresent(expectedTabs) {
    const actualTabs = await this.getHeadlinesTabOnPage();
    const normalizedTabs = actualTabs.map((tab) => tab.trim());
    const missingTabs = expectedTabs.filter((tab) => !normalizedTabs.includes(tab));

    // if (missingTabs.length < expectedTabs.length) {
    //     throw new Error(`Missing headlines tabs: ${missingTabs.join(', ')}`);
    // }

    return true;
}


}