'use strict';
const HTTP = require('http-status-codes');

const createAuthor = require('./create');

module.exports = (request, response, next) => {
  createAuthor(request.body)
    .then(author => {
      response.json(HTTP.CREATED, {id: author._id});
      return next();
    }).catch(error => {
    response.json(HTTP.INTERNAL_SERVER_ERROR, {error});
    return next(error);
  });
};
