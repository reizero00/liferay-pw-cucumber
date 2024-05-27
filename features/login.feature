Feature: Login
  Users should be able to Sign In to Liferay using an email address by default

  Background: 
    * Browser is open to "http://localhost:8080"

  Scenario: Can login using an accepted email and password
    Given the User clicks the Sign In link
    And the User enters "test@liferay.com" in the Email Address text field
    And the User enters "test" in the Password text field
    And the User clicks the Remember Me checkbox
    When the User clicks the Sign In button in the Login modal
    Then the User should see the user profile menu

  Scenario: Error is thrown when given incorrect password
    Given the User clicks the Sign In link
    And the User enters "test@liferay.com" in the Email Address text field
    And the User enters "testyourmight" in the Password text field
    When the User clicks the Sign In button in the Login modal
    Then the User should see the error "Authentication failed. Please try again."
    And the User should not see the user profile menu

  Scenario: Error is thrown when Email Address is empty
    Given the User is on the Login Page
    And the User enters "" in the Email Address text field
    And the User enters "test" in the Password text field
    When the User clicks the Sign In button in the Login portlet
    Then the User should see the error "The Email Address field is required."
      
  Scenario: Error is thrown when Password is empty
    Given the User is on the Login Page
    And the User enters "test@liferay.com" in the Email Address text field
    When the User clicks the Sign In button in the Login portlet
    Then the User should see the error "The Password field is required."

  Scenario: Error is thrown when Email Address is incorrectly formatted
    Given the User is on the Login Page
    And the User enters "@blahblah.com" in the Email Address text field
    And the User enters "test" in the Password text field
    When the User clicks the Sign In button in the Login portlet
    Then the User should see the error "Please enter a valid email address."