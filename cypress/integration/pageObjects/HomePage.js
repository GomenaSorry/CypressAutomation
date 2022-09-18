class HomePage
{
    getNameTextBox()
    {
        return cy.get('input[name="name"]:nth-child(2)')
    }

    getTwoWayNameBindingBox()
    {
        return cy.get('input[name="name"]:nth-child(1)')
    }

    getGenderDropDown()
    {
        return cy.get('#exampleFormControlSelect1')
    }

    getEntrepreneurRadioButton()
    {
        return cy.get('input#inlineRadio3')
    }

    getShopButton()
    {
        return cy.get(':nth-child(2) > .nav-link')
    }
}

export default HomePage;