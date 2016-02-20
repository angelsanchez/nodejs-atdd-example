'use strict';

const restify = require('restify');
const logger = require('./util/logger');
const registerServices = require('./register_routes');

const server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use((request, response, next) => {
  const log = {
    request: {
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: request.body
    }
  };
  logger.info(log);
  return next();
});

registerServices(server);

module.exports = {
  start: port => new Promise((resolve, reject) => {
    server.listen(port, err => {
      return err ? reject(err) : resolve(server);
    });
  })
};
