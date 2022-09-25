describe('API Interception Test Suite', function()
{
    // intercept the API response and modify it
    it('API mock response Test Case', function()
    {
        // open website
        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
        // prepare interception, mock the response, and save to an alias
        cy.intercept(
            {
                method: 'GET',
                url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            }, 
            {
                statusCode: 200,
                body: 
                [
                    {
                        book_name: "RobotFramework", 
                        isbn: "984353", 
                        aisle: "982053"
                    }
                ]
                // set alias for yield  
            }).as('bookRetrievals')
        // click button to send an API request
        cy.get('button.btn-primary').click()
        // wait for the alias to be resolved
        cy.wait('@bookRetrievals')
        // validate if the mocked response table length is correct
        cy.get('tr').should('have.length', 2)
        // validate if the text is present
        cy.get('p').should('have.text', "Oops only 1 Book available")
    })

    // intercept the API request and modify it to check the security
    it('API mock request Test Case', function()
    { 
        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
        // modify the request using cy.intercept (rest method, url, request)
        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (request) => 
        {
            // use another user to check database access
            request.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'
            // intercept response and check status code
            request.continue((response) => 
            {
                expect(response.statusCode).to.equal(404)
            })
            // set alias for yield    
        }).as('testUrl')
        // trigger the request
        cy.get('button.btn-primary').click()
        // yield until promise is resolved
        cy.wait('@testUrl')
    })

    // intercept the response and test if the API response body is rendered correctly (response body == table row length)
    it('API Backend-Frontend integration Test Case', function()
    {
        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
        cy.intercept(
        {
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
        }, 
        {
            statusCode: 200,
            body: 
            [
                {
                    book_name: "RobotFramework", 
                    isbn: "984353", 
                    aisle: "982053"
                },
                {   
                    book_name: "Learn Appium Automation with Java", 
                    isbn: "RS218", 
                    aisle: "111"
                }   
            ]
            // set alias for yield  
        }).as('bookRetrievals')
        // trigger the request
        cy.get('button.btn-primary').click()
        // alias will yield two properties, request and response
        cy.wait('@bookRetrievals').should(({request, response}) => 
        {
            // get table rows and validate length with response body length, +1 for table header
            cy.get('tr').should('have.length', response.body.length + 1)
        })
    })
})