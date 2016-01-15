Feature: List of authors
  In order to use the feature available to everyone
  As a guest user
  I want to be able to retrieve a list of authors

  Scenario: User list all authors
    Given the following created authors
      | Id | Name           | Born       | Died       | Language | Occupation                            | Nationality | Picture                                                                          |
      | 1  | Philip K. Dick | 16-12-1928 | 02-03-1982 | English  | Novelist,Short story writer,Essayist  | American    | https://upload.wikimedia.org/wikipedia/en/8/85/PhilipDick.jpg                    |
      | 2  | Alan E. Nourse | 11-09-1928 | 19-07-1992 | English  | Novelist,Physician                    | American    | https://upload.wikimedia.org/wikipedia/en/8/8f/Alan_E._Nourse_%28ca._1963%29.jpg |
    When user requests all authors
    Then the last response code is 200
    And the last response body contains the authors data
