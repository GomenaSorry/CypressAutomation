describe('Browser Navigation Test Suite', function()
{
    it('Navigate Back Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.go('back')
        
        // check if the url includes the string
        cy.url().should('include', 'AutomationPractice')

    })

    it('Navigate Forward Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.go('back')
        cy.go('forward')

        // check if the logo is visible
        cy.get('.pull-left > .logo > a > img').should('be.visible')
    })
})