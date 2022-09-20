import HomePage from '../pageObjects/HomePage'
import ProductPage from '../pageObjects/ProductPage'
import ShopPage from '../pageObjects/ShopPage'


describe('Page Object Model Test Suite', function()
{

    // create HomePage object
    const homePage = new HomePage()

    beforeEach(function()
    {
        // added to beforeEach hook as it will only be usable on a single test case if used in a before hook
        cy.fixture('example').then(function(data)
        {
            this.data = data
        })
        // visit the website before every test case
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
    })

    it('Add different products to cart, checkout, check total amount Test Case', function()
    {
        homePage.getShopButton().click()
        const productPage = new ProductPage()
        const shopPage = new ShopPage()
        
        var testData = this.data.productName
        testData.forEach(productName => 
        {
            cy.selectProduct(productName)
        })
        productPage.getCheckOutButton().click()
        // add product prices and get the total, initialize sum var
        var sum = 0
        shopPage.getProductPrice().each(($el, index, $list) => 
        {
            // get text
            const priceText = $el.text()
            // split string to split money sign to numbers to 2 different array elements
            var price = priceText.split(" ")
            // element[1] is number part, trim() to remove whitespaces, convert to int using parseInt
            price = parseInt(price[1].trim())
            // add prices and store in sum var
            sum += price
        })
        // get total amount value
        shopPage.getTotalAmount().then(function(total)
        {
            //get text
            const totalText = total.text()
            // split string to split money sign to numbers to 2 different array elements
            var totalAmount = totalText.split(" ")
            // element[1] is number part, trim() to remove whitespaces, convert to int using parseInt
            totalAmount = parseInt(totalAmount[1].trim())
            // assert to check if totalAmount is equal to sum
            expect(totalAmount).eq(sum)
        })
    })

    it('Add different products to cart, checkout, and purchase Test Case', function()
    {
        homePage.getShopButton().click()
        const productPage = new ProductPage()
        const shopPage = new ShopPage()
        
        var testData = this.data.productName
        testData.forEach(productName => 
        {
            cy.selectProduct(productName)
        })
        productPage.getCheckOutButton().click()
        shopPage.getCheckOutButton().click()
        shopPage.getCountryTextBox().type('Indonesia')
        shopPage.getCountryExactMatch().click()
        // force click the button as it was blocked by another element, remove force: true to see error
        shopPage.getTCCheckBox().click({force: true})
        shopPage.getPurchaseButton().click()
        // shopPage.getShopMessage().should('have.text', "Success! Thank you! Your order will be delivered in next few weeks :-).") will not work due to additional hidden chars
        shopPage.getShopMessage().then(function(element)
        {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true
        })
    })
})
