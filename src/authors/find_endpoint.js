'use strict';

const HTTP = require('http-status-codes');

const findAllAuthors = require('./find_all');

module.exports = (request, response, next) => {
  findAllAuthors()
    .then(authors => {
      response.json({authors});
      return next();
    }).catch(error => {
    response.json(HTTP.INTERNAL_SERVER_ERROR, {error});
    return next(error);
  });
};
