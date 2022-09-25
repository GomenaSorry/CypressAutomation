describe('API Testing Test Suite', function()
{
    // send an API request and validate response
    it('API request Test Case', function()
    {
        // cy.request(rest method, url, body)
        cy.request('POST', 'https://216.10.245.166/Library/Addbook.php', 
        {
            "name": "TestBook",
            "isbn": "test12345",
            "aisle": "a0001",
            "author": "Test Author"
        // resolve promise as a function
        }).then(function(response)
        {
            // validate status code
            expect(response.status).to.eq(200)
            // validate response parameters and values
            expect(response.body).to.have.property('Msg', "successfully added")
            expect(response.body).to.have.property('ID', "test12345a0001")
            // log to see actual response body
            cy.log(response.body)
        })
    })
})