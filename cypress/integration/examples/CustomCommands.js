describe('Custom Commands Test Suite', function()
{
    beforeEach(function()
    {
        // use hook to use test data from example.json
        cy.fixture('example').then(function(data)
        {
            this.data = data
        })
    })
    
    it('Sample Test Case', function()
    {
        cy.visit('https://rahulshettyacademy.com/angularpractice/shop')

        // replaced by selectProduct() custom command 
        // cy.get('h4.card-title').each(($el, index, $list) => 
        // {
        //     if($el.text().includes("Blackberry"))
        //     {
        //         cy.get('button.btn.btn-info').eq(index).click()
        //     }
        // })


        // added a cypress custom command in support\commands.js
        cy.selectProduct('iphone')
    })

    it('Add different products to cart Test Case', function()
    {
        cy.visit('https://rahulshettyacademy.com/angularpractice/shop')

        // replaced by test data parameterization
        // cy.selectProduct('iphone')
        // cy.selectProduct('Blackberry')
        // cy.selectProduct('Nokia Edge')
        // cy.selectProduct('Note')

        // iterate from example.json productName array
        var testData = this.data.productName
        testData.forEach(productName => {
            cy.selectProduct(productName)
        });

    })
})