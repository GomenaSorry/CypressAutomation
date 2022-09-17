describe('Common Web Elements Handling Test Suite', function()
{
    it('Handle Check Box Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        // check checkbox and check status if checked
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')

        // uncheck checkbox and check if unchecked
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')

        // check multiple checkboxes
        cy.get('input[type="checkbox"]').check(['option2', 'option3'])
    })

    it('Handle Radio Button Test Case', function()
    {
        // select radio button and check state
        cy.get('[value="radio2"]').check().should('be.checked')
    })

    it('Handle Static Drop Down Test Case', function()
    {
        // select option in the drop down and check if the value selected is correct
        cy.get('select').select('option2').should('have.value', 'option2')
    })

    it('Handle Dynamic Drop Down Test Case', function()
    {
        // type in the search bar
        cy.get('#autocomplete').type('ind')

        // iterate on the selections available and click the correct value
        cy.get('.ui-menu-item div').each(($el, index, $list) => 
        {
            if($el.text()==="Indonesia")
            {
                cy.wrap($el).click()
            }
        })

        // check if the selected value is correct
        cy.get('#autocomplete').should('have.value', 'Indonesia')
    })

    it('Handle Element Visibility Test Case', function()
    {
        // check if element is visible
        cy.get('#displayed-text').should('be.visible')

        // hide the element and check if it is not visible
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')

        // show the element and check if it is visible
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
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        // cypress is not built to handle child tab to avoid flaky tests
        // invoke jquery function removeAttr to open the page in the same browser
        cy.get('#opentab').invoke('removeAttr', 'target').click()
    })

    it('Handle Child Window Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
        // cypress is not built to handle child window to avoid flaky tests
        // resolve promise and use jquery prop to get href
        cy.get('#opentab').then(function(el)
        {
            var elementUrl = el.prop('href')
            cy.visit(elementUrl)

        })
    })

    it('Handle Web Tables Test Case', function()
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

        // select the second column of the table, iterate to the correct element and then get the text on the next column
        cy.get('tr td:nth-child(2)').each(($el, index, $list) =>{
            var elementText = $el.text()
            if(elementText.includes("Python"))
            {
                // next() can only be used in get(), select the second column and use index for the correct position in the list
                // resolve promise to save the text to a variable and check the value
                cy.get('tr td:nth-child(2)').eq(index).next().then(function(price)
                {
                    var priceText = price.text()
                    expect(priceText).to.equal("25")
                })
            }
        })
    })
})