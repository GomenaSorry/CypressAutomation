class ShopPage
{
    getCheckOutButton()
    {
        return cy.get('button.btn-success')
    }

    getRemoveButton()
    {
        return cy.get('button.btn-danger')
    }

    getCountryTextBox()
    {
        return cy.get('#country')
    }

    getCountrySuggestions()
    {
        return cy.get('.suggestions')
    }

    getCountryExactMatch()
    {
        return cy.get('.suggestions > ul > li > a')
    }

    getEllipsis()
    {
        return cy.get('.lds-ellipsis')
    }

    getTCCheckBox()
    {
        return cy.get('.checkbox2')
    }

    getPurchaseButton()
    {
        return cy.get('input.btn-success')
    }
    


}

export default ShopPage;