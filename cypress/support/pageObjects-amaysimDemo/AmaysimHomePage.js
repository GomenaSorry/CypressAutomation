export class AmaysimHomePage {
    
    navigateToHomePage(){
        cy.visit(Cypress.env('url'))
    }

    navigateToLoginPage(){
        cy.get('a[href="/my-account/login"]').click()
    }
}
