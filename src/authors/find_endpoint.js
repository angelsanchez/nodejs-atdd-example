'use strict';

const HTTP = require('http-status-codes');

const authorsFind = require('./find');

module.exports = (request, response, next) => {
  authorsFind()
    .then(authors => {
      response.json({authors});
      return next();
    }).catch(error => {
    response.json(HTTP.INTERNAL_SERVER_ERROR, {error});
    return next();
  });
};
