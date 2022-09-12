describe('Common Web Elements Handling Test Suite', function()
{
    it('Handle Check Box Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3'])
    })

    it('Handle Radio Button Test Case', function()
    {
        cy.get('[value="radio2"]').check().should('be.checked')
    })

    it('Handle Static Drop Down Test Case', function()
    {
        cy.get('select').select('option2').should('have.value', 'option2')
    })

    it('Handle Dynamic Drop Down Test Case', function()
    {
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => 
        {
            if($el.text()==="Indonesia")
            {
                cy.wrap($el).click()
            }
        })
        cy.get('#autocomplete').should('have.value', 'Indonesia')
    })

    it('Handle Element Visibility Test Case', function()
    {
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })

    it('Handle Alert Pop-ups Test Case', function()
    {
        // cypress auto-accepts alerts
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()

        // cypress can manipulate the DOM to fire the events
        cy.on('window:alert', (str) => 
        {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
    })

    it('Handle Confirm Pop-ups Test Case', function()
    {
        // cypress can manipulate the DOM to fire the events
        cy.on('window:confirm', (str) => 
        {
            expect(str).to.equal('Hello , are you sure you want to confirm?')
        })
    })

    it('Handle Child Tabs Test Case', function()
    {
        // cypress is not built to handle child tab to avoid flaky tests
        // invoke jquery function removeAttr to open the page in the same browser
        cy.get('#opentab').invoke('removeAttr', 'target').click()
    })
})