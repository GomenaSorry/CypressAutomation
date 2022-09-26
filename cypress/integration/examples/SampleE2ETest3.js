const neatCSV = require('neat-csv')
let productName
describe('Sample E2E with token authentication Test Suite', function()
{
    it('E2E with authentication Test Case', function()
    {
        // use loginApi custom command to save token to env variable
        cy.loginApi().then(function()
            {
                // open store page
                cy.visit('https://rahulshettyacademy.com/client', 
                {
                    // onBeforeLoad to save token env variable to browser local storage
                    onBeforeLoad: function(window)
                    {
                        // javascript command
                        window.localStorage.setItem('token', Cypress.env('token'))
                    }
                })

                cy.get('#products').find('.mb-3.ng-star-inserted').each(($el, index, $list) =>
                {
                    productName = $el.find('h5').text()
                    if(productName.includes("iphone"))
                    { 
                        cy.wrap($el).find('button.btn.w-10').click()
                    }
                })
                cy.get('button[routerlink="/dashboard/cart"]').click()
                cy.contains('Checkout').click()
                cy.get('input[placeholder="Select Country"]').type("Ph")
                cy.get('.ta-results button').click()
                cy.contains('Place Order').each(($el, index, $list) =>
                {
                    if($el.text() === "Philippines")
                    {
                        cy.wrap($el).click()
                    }
                })
                cy.get('.action__submit').click()
                cy.get('h1.hero-primary').should('have.text'," Thankyou for the order. ")
                cy.wait(2000)
                cy.get('.order-summary button').click()
            })
    })

    it('E2E with CSV parsing Test Case', async() =>
    {
        // use loginApi custom command to save token to env variable
        cy.loginApi().then(function()
            {
                // open store page
                cy.visit('https://rahulshettyacademy.com/client', 
                {
                    // onBeforeLoad to save token env variable to browser local storage
                    onBeforeLoad: function(window)
                    {
                        // javascript command
                        window.localStorage.setItem('token', Cypress.env('token'))
                    }
                })

                cy.get('#products').find('.mb-3.ng-star-inserted').each(($el, index, $list) =>
                {
                    productName = $el.find('h5').text()
                    if(productName.includes("iphone"))
                    { 
                        cy.log(productName)
                        cy.wrap($el).find('button.btn.w-10').click()
                    }
                })
                cy.get('button[routerlink="/dashboard/cart"]').click()
                cy.contains('Checkout').click()
                cy.get('input[placeholder="Select Country"]').type("Ph")
                cy.get('.ta-results button').click()
                cy.contains('Place Order').each(($el, index, $list) =>
                {
                    if($el.text() === "Philippines")
                    {
                        cy.wrap($el).click()
                    }
                })
                cy.get('.action__submit').click()
                cy.get('h1.hero-primary').should('have.text'," Thankyou for the order. ")
                cy.wait(2000)
                cy.get('.order-summary button').click()
                
                cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_sitdownpowerbomb.csv").then(async(text) =>
                {
                    const csv = await neatCSV(text)
                    console.log(csv)
                    const actualProductCSV = csv[0]["Product Name"]
                    expect(productName).to.eq(actualProductCSV)
                })
                
            })
    })
})