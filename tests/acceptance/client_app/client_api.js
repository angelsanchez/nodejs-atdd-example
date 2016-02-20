'use strict';

const config = require('../../../src/config');
const request = require('./request');

const getAPIUrl = resource => `${config.app.host}:${config.app.port}/api${resource}`;

module.exports = {
  retrieveAuthors: () => {
    return request.get(getAPIUrl('/authors'));
  },
  createAuthor: author => {
    return request.post(getAPIUrl('/authors'), author);
  }
};
