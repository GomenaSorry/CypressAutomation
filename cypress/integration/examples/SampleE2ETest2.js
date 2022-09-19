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

        


    })
})
