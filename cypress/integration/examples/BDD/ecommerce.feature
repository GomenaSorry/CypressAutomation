Feature: E2E ECommerce Validation

    ECommerce test

    @Regression
    Scenario: Product purchase and delivery
    Given I open the ECommerce Shop page
    When I add items to cart
    And validate the total price
    And I select the country
    And I accept the Terms and Conditions
    Then verify the purchase is successful

    @Smoke
    Scenario: Filling out the form to shop
    Given I open the Ecommerce Form page
    When  I fill out the form details
    | name         | gender |
    | CucumberTest | Male   |
    Then validate the form details
    | name         |
    | CucumberTest |
    And open the Shop page
