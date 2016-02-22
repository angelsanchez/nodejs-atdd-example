'use strict';

const findEndpoint = require('./find_endpoint');
const createEndpoint = require('./create_endpoint');

module.exports = server => {
  server.get('/api/authors', findEndpoint);
  server.post('/api/authors', createEndpoint);
};
