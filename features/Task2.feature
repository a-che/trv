Feature: Task 2. Search and fill contact form
    Background:
        Given I go on "http://room5.trivago.com/" url
        Then I wait until "EDITOR'S PICK" will be displayed on current page

    Scenario: Search specific article - check results - clear data
        When I click to search icon in header
        Then I wait until search input will be displayed on current page

        When I type "11 Best Gay Pride Parades Where You Can Be Loud and Be Proud" in search input
        And only "1" search result should be found
        And I should see post with title "11 Best Gay Pride Parades Where You Can Be Loud and Be Proud" in search results
        #clear input ( bonus from my site for demonstration skill)
        When I clear data in search input
        Then search results should be reset

    Scenario: Fill in the contact form and send it
        When I scroll to link "Contact" and click
        Then I wait until "Please give us feedback on what you want to read about!" will be displayed on current page

        When I fill "this is my feedback message" to "Your Message"
        And I fill "Artem Chechoro" to "Full Name"
        And I fill "artem.chechoro@mailinator.com" to "Your Email"

        When I press submit

        Then I wait until "Message Sent Successfully!" will be displayed on current page

        #bonus: check validation
        When I press submit
        Then I wait until "All fields are required!" will be displayed on current page

        When I fill "this is my feedback message" to "Your Message"
        When I press submit
        Then I wait until "All fields are required!" will be displayed on current page

        And I fill "Artem Chechoro" to "Full Name"
        When I press submit
        Then I wait until "All fields are required!" will be displayed on current page



