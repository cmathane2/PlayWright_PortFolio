@tractor
Feature: Tractor Purchase Journey on Bajaj Mall
  As a customer interested in tractors
  I want to browse and purchase tractors online
  So that I can make an informed decision and complete my purchase

  Background:
    Given I am on the Bajaj Mall homepage

  @guest
  Scenario: Browse tractors as a guest user
    When I search for "Tractor" in the search bar
    Then I should see tractor listings in the results
    When I select the first tractor
    Then I should see detailed product information

  @auth
  Scenario: Complete tractor purchase as a registered user
    Given I am logged in with following credentials
      | username               | password    |
      | testuser@example.com  | password123 |
    When I search for "Tractor" in the search bar
    And I select the first tractor from results
    And I add the tractor to cart
    Then the tractor should be added to my cart
    When I proceed to checkout
    Then I should be able to complete the purchase

  @auth @wishlist
  Scenario: Save tractor to wishlist
    Given I am logged in as a registered user
    When I search for "Tractor" in the search bar
    And I select the first tractor from results
    And I click on add to wishlist button
    Then the tractor should be saved in my wishlist

  @compare
  Scenario: Compare multiple tractors
    Given I am on the tractor listing page
    When I select two tractors for comparison
      | Tractor 1    | Tractor 2    |
      | Mahindra 575 | Swaraj 855   |
    And I click on compare button
    Then I should see the comparison table
    And the comparison should show following details
      | Feature     |
      | Price       |
      | HP         |
      | Engine     |
      | Warranty   |

  @filter
  Scenario Outline: Filter tractors by price range
    Given I am on the tractor listing page
    When I apply price filter from "<min_price>" to "<max_price>"
    Then I should see tractors within the selected price range
    And the number of results should be less than or equal to initial results

    Examples:
      | min_price | max_price |
      | 500000    | 800000    |
      | 800000    | 1200000   |

  @sort
  Scenario: Sort tractors by price
    Given I am on the tractor listing page
    When I sort tractors by price high to low
    Then I should see tractors in descending order of price
    When I sort tractors by price low to high
    Then I should see tractors in ascending order of price

  @auth @emi
  Scenario: Check EMI options for tractor
    Given I am logged in as a registered user
    When I select a tractor with price above 500000
    And I check available EMI options
    Then I should see various EMI tenure options
    And I should see monthly EMI amounts
    And I should see applicable interest rates

  @guest @enquiry
  Scenario: Submit tractor enquiry as guest
    Given I am on a tractor details page
    When I click on "Enquire Now" button
    And I fill in the enquiry form with following details
      | Field    | Value            |
      | Name     | John Doe         |
      | Mobile   | 9876543210       |
      | Email    | john@example.com |
      | Location | Mumbai           |
    And I submit the enquiry form
    Then I should see enquiry confirmation message
