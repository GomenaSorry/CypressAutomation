export class AmaysimAccountPage {
    
    clickMobileAccount(accountName){
        // cy.get('.mobile h3').should('have.text', accountName)
        // cy.get('div[data-automation-id="mobile-tileheader"]').trigger('mouseover').click()
        cy.wait('@amaysim')
        cy.get('span').contains('account').click()
    }
}
