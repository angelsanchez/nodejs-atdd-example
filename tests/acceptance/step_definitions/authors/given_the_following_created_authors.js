'use strict';

const HTTP = require('http-status-codes');

const clientAPI = require('../../client_app/client_api');

module.exports = function() {
  this.When(/^the following created authors$/, (authorsTable, done) => {
    const authorsToCreate = authorsTable.hashes().map(authorRow => {
      return {
        _id: authorRow.Id,
        name: authorRow.Name,
        born: authorRow.Born,
        died: authorRow.Died,
        language: authorRow.Language,
        occupation: authorRow.Occupation.split(','),
        nationality: authorRow.Nationality,
        picture: authorRow.Picture
      };
    });

    this.world.authorsToCreate = authorsToCreate;

    const createAuthorsPromises = authorsToCreate.map(author => clientAPI.createAuthor(author));

    Promise.all(createAuthorsPromises)
      .then(responses => {
        if (responses.some(res => res.statusCode !== HTTP.CREATED)) {
          done(new Error('Invalid response code(s) creating authors'));
        } else {
          done();
        }
      })
      .catch(done);
  });
};
