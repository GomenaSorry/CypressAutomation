describe('Hook Samples Test Suite', function()
{
    // before hook to initialize test data from fixtures/example.json
    // before(function()
    // {
    //     // resolve promise to use data in example.json, 'this' keyword makes the data available globally
    //     cy.fixture('example').then(function(data)
    //     {
    //         this.data = data
    //     })
    // })

    beforeEach(function()
    {
        // added to beforeEach hook as it will only be usable on a single test case if used in a before hook
        cy.fixture('example').then(function(data)
        {
            this.data = data
        })

        // visit the website before every test case
        cy.visit('https://rahulshettyacademy.com/angularpractice/')
    })

    // afterEach(function()
    // {
    //     // clear the text box after every test case
    //     cy.get('input[name="name"]:nth-child(2)').clear()
    // })

    it('Enter name and gender Test Case', function()
    {
        // replaced by fixture test data
        // cy.get('input[name="name"]:nth-child(2)').type("TestName")
        // cy.get('#exampleFormControlSelect1').select("Female")

        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
        cy.get('#exampleFormControlSelect1').select(this.data.gender)
    })

    it('Input text in TextBox1 is equal to TextBox2 value Test Case', function()
    {
        cy.get('input[name="name"]:nth-child(2)').type(this.data.name)
        cy.get('input[name="name"]:nth-child(1)').should('have.value', this.data.name)
    })

    it('Verify "minlength" value of Name text box Test Case', function()
    {
        cy.get('input[name="name"]:nth-child(2)').should('have.attr', 'minlength', 2)
    })

    it('Verify if the checkbox is disabled Test Case', function()
    {
        cy.get('input#inlineRadio3').should('be.disabled')
    })




})