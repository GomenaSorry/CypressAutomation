import 'cypress-iframe'

describe('Handling Frames Test Suite', function()
{
    it('Handle Frames Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // go to the frame
        cy.frameLoaded('#courses-iframe')

        // cy.iframe is required to tell cypress to operate within the frame
        cy.iframe().find("a[href*='mentorship']").eq(0).click()

        // added this, cypress-iframe fails without:(
        cy.wait(2000)
 
        // get the element and check the length
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    })
})