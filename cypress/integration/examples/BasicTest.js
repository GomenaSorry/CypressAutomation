describe('My First Test Suite', function()
{
    it('My First test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(2000)
        
        //improve, parent-child chaining
        //cy.get('.product:visible').should('have.length', 4)

        cy.get('.products').find('.product').should('have.length', 4)
        
        // improve, array position might change
        // cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()
        
        // iterate for every element
        cy.get('.products').find('.product').each(($el, index, $list) => 
        {
            const textVeg = $el.find('h4.product-name').text()
            if(textVeg.includes('Cashews'))
            {
                // .find().click() is deprecated
                // $el.find('button').click()
                
                // option 1, use trigger()
                // $el.find('button').trigger('click')
                
                // option 2, use wrap()
                cy.wrap($el).find('button').click()
            }
        })
    })

    it('Promise Test', function()
    {
        // assigning an element to a constant will not work due to how promises work
        // const logoElement = cy.get('.brand')
        // cy.log(logoElement.text())

        cy.get('.brand').then(function(logoElement)
        {
            cy.log(logoElement.text())
        })
    })

    it('Aliasing Test', function()
    {
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').each(($el, index, $list) => 
        {
            const textVeg = $el.find('h4.product-name').text()
            if(textVeg.includes('Carrot'))
            {
                cy.wrap($el).find('button').click()
            }
        })
    })

    it('Assertion Test', function()
    {
        cy.get('.brand').should('have.text', 'GREENKART')
    })

})