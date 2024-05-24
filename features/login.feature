Feature: LogIn
  Users should be able to Sign In to Liferay using an email address by default

  Background: 
    * Browser is open to "http://localhost:8080"

  Scenario: Can login using an accepted email and password
    Given the User clicks the Sign In link
    And the User enters "test@liferay.com" in the Email Address text field
    And the User enters "test" in the Password text field
    When the User clicks the Sign In button
    Then the User should see the user profile menu

  Scenario: Error is thrown when given incorrect password
    Given the User clicks the Sign In link
    And the User enters "test@liferay.com" in the Email Address text field
    And the User enters "testyourmight" in the Password text field
    When the User clicks the Sign In button
    Then the User should see the error "Authentication failed. Please try again."
    And the User should not see the user profile menu