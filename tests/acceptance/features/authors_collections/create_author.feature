Feature: Authors creation
  In order to use the feature available to everyone
  As a guest user
  I want to be able to create a new author in the system

  Scenario: User creates an author
    Given the following author data
      | Name                         | Born       | Died       | Language | Occupation                                  | Nationality | Picture                                                                   |
      | Miguel de Cervantes Saavedra | 1547-09-29 | 1616-04-22 | Spanish  | soldier,novelist,poet,playwright,accountant | Spanish     | https://upload.wikimedia.org/wikipedia/commons/6/66/Cervates_jauregui.jpg |
    When user creates the author
    Then the last response code is 201
    And the response body has an "id" field
