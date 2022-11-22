export class AmaysimLoginPage {
    
    enterAccountNumber(accountNumber){
        cy.get('#username').type(accountNumber)
    }

    enterPassword(password){
        cy.get('#password').type(password)
    }

    clickLoginButton(){
        cy.get('.arrow-next').click()
    }

}
