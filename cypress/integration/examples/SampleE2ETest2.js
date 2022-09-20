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

        var sum = 0
        shopPage.getProductPrice().each(($el, index, $list) => 
        {
            const priceText = $el.text()
            var price = priceText.split(" ")
            price = parseInt(price[1].trim())
            sum += price
        })
        shopPage.getTotalAmount().then(function(total)
        {
            const totalText = total.text()
            var totalAmount = totalText.split(" ")
            totalAmount = parseInt(totalAmount[1].trim())
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

        // force click the button as it was blocked by another element
        shopPage.getTCCheckBox().click({force: true})
        shopPage.getPurchaseButton().click()
        // shopPage.getShopMessage().should('have.text', "Success! Thank you! Your order will be delivered in next few weeks :-).")
        shopPage.getShopMessage().then(function(element)
        {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true
        })
    })
})
