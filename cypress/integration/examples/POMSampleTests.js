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

    it('Enter name and gender Test Case', function()
    {
        // refactored using POM
        // cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
        // cy.get('#exampleFormControlSelect1').select(this.data.gender)

        homePage.getNameTextBox().type(this.data.name)
        homePage.getGenderDropDown().select(this.data.gender)
    })

    it('Input text in TextBox1 is equal to TextBox2 value Test Case', function()
    {
        // refactored using POM
        // cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
        // cy.get('input[name="name"]:nth-child(1)').should('have.value', this.data.name)

        homePage.getNameTextBox().type(this.data.name)
        homePage.getTwoWayNameBindingBox().should('have.value', this.data.name)
    })

    it('Verify "minlength" value of Name text box Test Case', function()
    {
        // refactored using POM
        // cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', 2)

        homePage.getNameTextBox().should('have.attr', 'minlength', 2)
    })

    it('Verify if the checkbox is disabled Test Case', function()
    {
        // refactored using POM
        // cy.get('input#inlineRadio3').should('be.disabled')

        homePage.getEntrepreneurRadioButton().should('be.disabled')
    })

    it('Add different products to cart Test Case', function()
    {
        homePage.getShopButton().click()
        const productPage = new ProductPage()
        
        var testData = this.data.productName
        testData.forEach(productName => 
        {
            cy.selectProduct(productName)
        })
    })

    it('Add different products to cart and checkout Test Case', function()
    {
        homePage.getShopButton().click()
        const productPage = new ProductPage()
        
        var testData = this.data.productName
        testData.forEach(productName => 
        {
            cy.selectProduct(productName)
        })
        productPage.getCheckOutButton().click()
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

        


    })
})
