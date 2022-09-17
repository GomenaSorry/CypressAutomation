describe('Mouse Actions Test Suite', function()
{
    it('Mouse Hover Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // use invoke to use jquery show(), .mouse-hover-content or div.mouse-hover-content will work
        cy.get('div.mouse-hover-content').invoke('show')
        cy.contains("Top").click()

        // check if the url is correct
        cy.url().should('include', "#top")
    })

    it('Force Mouse Click Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // force click
        cy.contains("Top").click({force : true})

        // check if the url is correct
        cy.url().should('include', "#top")
    })
})