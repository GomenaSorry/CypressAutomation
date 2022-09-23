describe('Simple End-to-End Test Suite 1', function()
{
    it('Buy product, checkout and purchase Test Case', function()
    {
        // refactored to use env 
        cy.visit(Cypress.env('url') + "/seleniumPractise/#/")
        // type 'ca' in the search textbox
        cy.get('.search-keyword').type('ca')
        // sample implicit wait
        cy.wait(2000)
        // get list of products, from products > product, check if number of products = 4
        cy.get('.products').find('.product').should('have.length', 4)
        // iterate from the list of product and search for 'Cashews'
        cy.get('.products').find('.product').each(($el, index, $list) => 
        {
            // get text of the product
            const textVeg = $el.find('h4.product-name').text()
            // check if product text = 'Cashews'
            if(textVeg.includes('Cashews'))
            {
                // click add button
                cy.wrap($el).find('button').click()
            }
        })
        // click checkout button
        cy.get('.cart-icon > img').click()
        // click PROCEED TO CHECKOUT button
        cy.contains('PROCEED TO CHECKOUT').click()
        // click Place Order button
        cy.contains('Place Order').click()
        // get Country drop down and select Philippines
        cy.get('select').select('Philippines')
        // get T&C checkbox and click
        cy.get('.chkAgree').click()
        // click Proceed button
        cy.get('button').click()
        // check if "Thank you" message is present
        cy.contains("Thank you").should('be.visible')
        // check if user is redirected to Products page
        cy.get('.brand').should('be.visible')
    })
})