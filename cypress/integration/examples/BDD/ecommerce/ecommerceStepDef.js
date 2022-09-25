const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import HomePage from '../../../../support/pageObjects/HomePage'
import ProductPage from '../../../../support/pageObjects/ProductPage'
import ShopPage from '../../../../support/pageObjects/ShopPage'

const homePage = new HomePage()
const productPage = new ProductPage()
const shopPage = new ShopPage()
// global declaration for name and gender variables for test data
let name
let gender

Given('I open the ECommerce Shop page', () =>
{
    cy.visit(Cypress.env('url')+"/angularpractice")
    homePage.getShopButton().click()
})

Given('I open the Ecommerce Form page', () =>
{
    cy.visit(Cypress.env('url')+"/angularpractice")
})

When('I add items to cart', function()
{
    var testData = this.data.productName
    testData.forEach(productName => 
    {
        cy.selectProduct(productName)
    })
    productPage.getCheckOutButton().click()
})

When('validate the total price', () =>
{
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
    }).then(function()
    {
        // log the sum
        cy.log(sum)
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
        expect(totalAmount).to.equal(sum)
        shopPage.getCheckOutButton().click()
    })
})

When('I select the country', () =>
{
    shopPage.getCountryTextBox().type('Indonesia')
    shopPage.getCountryExactMatch().click()
})

When('I accept the Terms and Conditions', () =>
{
    shopPage.getTCCheckBox().click({force: true})
})

When('I fill out the form details', function(dataTable) 
{
    // using data tables
    // name = dataTable.rawTable[1][0], gender = dataTable.rawTable[1][1]
    name = dataTable.rawTable[1][0]
    gender = dataTable.rawTable[1][1]
    homePage.getNameTextBox().type(name)
    homePage.getGenderDropDown().select(gender)
})

Then('verify the purchase is successful', () => 
{
    shopPage.getPurchaseButton().click()
        shopPage.getShopMessage().then(function(element)
    {
        const actualText = element.text()
        expect(actualText.includes("Success")).to.be.true
    })
})

Then('validate the form details', function(dataTable) 
{
    homePage.getTwoWayNameBindingBox().should('have.value', name)
    homePage.getNameTextBox().should('have.attr', 'minlength', 2)
    homePage.getEntrepreneurRadioButton().should('be.disabled')
})

Then('open the Shop page', () => 
{
    homePage.getShopButton().click()
})