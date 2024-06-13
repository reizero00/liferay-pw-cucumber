@blogs
Feature: Blogs
  Users should be able to Sign In to Liferay using an email address by default

  Background: 
    * The test site: "Test Site" is created
    * "test@liferay.com" is logged in with the password "test"
    * Browser is open to "http://localhost:8080/group/test-site/~/control_panel/manage?p_p_id=com_liferay_blogs_web_portlet_BlogsAdminPortlet"

  Scenario: Can create a Blog post
    Given the User clicks the "Add Blog Entry" button in the management toolbar
