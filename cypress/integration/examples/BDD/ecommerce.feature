Feature: E2E ECommerce Validation

    ECommerce test

    Scenario: Product purchase and delivery
    Given I open the ECommerce page
    When I add items to cart
    And validate the total price
    And I select the country
    And I accept the Terms and Conditions
    Then verify the purchase is successful
