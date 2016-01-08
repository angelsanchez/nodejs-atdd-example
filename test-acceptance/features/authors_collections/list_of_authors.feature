Feature: List of authors
  In order to use the feature available to everyone
  As a guest user
  I want to be able to retrieve a list of authors

  Scenario: User list all authors
    Given the following author data
      | Name                         | Born       | Died       | Language | Occupation                                  | Nationality | Picture                                                                   |
      | Miguel de Cervantes Saavedra | 1547-09-29 | 1616-04-22 | Spanish  | soldier,novelist,poet,playwright,accountant | Spanish     | https://upload.wikimedia.org/wikipedia/commons/6/66/Cervates_jauregui.jpg |
    And user creates the author
    When user requests all authors
    Then the last response code is 200
    And the last response body contains the author data
