import {test,expect} from '@playwright/test';
import {AmazonUI} from '../../pages/AmazonUI.js';
import {CoffeeMugUI} from '../../pages/CoffeeMug.js';
import {AddToCardUI} from '../../pages/AddToCard.js';
import {ShoppingCardUI} from '../../pages/AmazonShoppingCart.js';
import {PaymentUI} from '../../pages/Payment.js';
import {ProceedToBuyUI} from '../../pages/ProceedToBuy.js';

test('CoffeeMug Test', async ({page}) => {  
     const amazonUI = new AmazonUI(page);
     const coffeeMugUI = new CoffeeMugUI(page);
     const proceedToBuyUI = new ProceedToBuyUI(page);
     const paymentUI = new PaymentUI(page);

    // Navigate to the login page
    await amazonUI.goto();
    // Click on the search box
    await amazonUI.ClickOnSearchBox();  
    await amazonUI.EnterSearchText('coffee');
    await amazonUI.ClickOnCoffeeMugTravel();
    const page1= await coffeeMugUI.clickOnfirstProduct();
    const addToCardUI = new AddToCardUI(page1);
    
    await addToCardUI.ClickOnAddToCartButton();
    const amazonShoppingCartUI = new ShoppingCardUI(productPage);
    await proceedToBuyUI.ClickOnProceedToBuyButton();
    await paymentUI.clickOnCashONDelivery();

})

test('Verify headlines tab ', async ({page}) => {  
const amazonUI = new AmazonUI(page);
await amazonUI.goto()
const headlinesTab =  await amazonUI.getHeadlinesTabOnPage();
console.log('Headlines tabs on the page:', headlinesTab);
const expectedTabs = ['Best Sellers', 'Mobiles', 'Customer Service', 'Electronics', 'Prime', 'Fashion', 'New Releases', 'Amazon Pay', 'Computers', 'Home & Kitchen'];
const booleanResult = await amazonUI.verifyHeadlinesTabsPresent(expectedTabs);    
expect(booleanResult).toBe(true);
})

