class ShopPage
{
    getProductPrice()
    {
        return cy.get('tr td:nth-child(4) strong')
    }

    getTotalAmount()
    {
        return cy.get('h3 > strong')
    }

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
        return cy.contains('Indonesia')
    }

    getTCCheckBox()
    {
        return cy.get('#checkbox2')
    }

    getPurchaseButton()
    {
        return cy.get('input[type="submit"]')
    }

    getShopMessage()
    {
        return cy.get('.alert')
    }
    


}

export default ShopPage;