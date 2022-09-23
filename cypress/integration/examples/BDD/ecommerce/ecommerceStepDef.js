const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
import HomePage from '../../../../support/pageObjects/HomePage'
import ProductPage from '../../../../support/pageObjects/ProductPage'
import ShopPage from '../../../../support/pageObjects/ShopPage'

const homePage = new HomePage()
const productPage = new ProductPage()
const shopPage = new ShopPage()

Given('I open the ECommerce page', () =>
{
    cy.visit(Cypress.env('url')+"/angularpractice/")
    homePage.getShopButton().click()
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

Then('verify the purchase is successful', () => 
{
    shopPage.getPurchaseButton().click()
        shopPage.getShopMessage().then(function(element)
    {
        const actualText = element.text()
        expect(actualText.includes("Success")).to.be.true
    })
})
