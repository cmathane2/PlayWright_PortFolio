export class AddToCardUI{

    constructor(page) {
        this.page = page;
    }

    //Get the title of the page
    async getTitleOfPage() {
        const title = await this.page.title();
        return title;
    }
    
    //click on add to cart button
    async ClickOnAddToCartButton() {
        await this.page.waitForTimeout(4000);
        const title = await this.page.getTitleOfPage();
        console.log("Title of the page before clicking on add to cart button: " + title);
        await this.page.click('#freshAddToCartButton>span>input');
    }    
    
}

