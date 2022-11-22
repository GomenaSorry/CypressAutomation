import { AmaysimHomePage } from "../../support/pageObjects-amaysimDemo/AmaysimHomePage"
import { AmaysimLoginPage } from "../../support/pageObjects-amaysimDemo/AmaysimLoginPage"
import { AmaysimAccountPage } from "../../support/pageObjects-amaysimDemo/AmasyimAccountPage"

describe('test refer a friend page', function(){

    const homePage = new AmaysimHomePage()
    const loginPage = new AmaysimLoginPage()
    const accountPage = new AmaysimAccountPage()

    before(function(){
        cy.fixture('amaysimConfig').then(function(data)
        {
            this.data = data
        })
    })
    
    it('log in to refer a friend page', function(){

        
        // homePage.navigateToHomePage()
        // homePage.navigateToLoginPage()
        // loginPage.enterAccountNumber(this.data.accountNumber)
        // loginPage.enterPassword(this.data.password)
        // loginPage.clickLoginButton()
        // accountPage.clickMobileAccount(this.data.accountName)

        cy.visit(Cypress.env('url'))
        cy.get('a[href="/my-account/login"]').click()
        cy.origin('https://accounts.amaysim.com.au/identity/login', function(){
            cy.get('#username').type('0466134574')
            cy.get('#password').type('AWqasde321')
            cy.get('.arrow-next').click()
    })
        cy.location('pathname').should('include', '/my-account/my-amaysim/services')
        //cy.wait(60000)
        cy.get('.mobile h3').should('have.text', this.data.accountName)
        cy.get('.mobile h3').should('be.visible')
        cy.visit('https://www.amaysim.com.au/my-account/my-amaysim/dashboards', { timeout : 90000})
        cy.get('#menu_list > :nth-child(12) > a').click()




    })
})