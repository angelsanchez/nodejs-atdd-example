'use strict';

const restify = require('restify');

const registerServices = require('./register_services');

const server = restify.createServer();

server.use(restify.queryParser({ mapParams: false }));
server.use(restify.bodyParser());
server.use(restify.requestLogger());

registerServices(server);

const start = port => new Promise((resolve, reject) => {
  server.listen(port, err => {
    return err ? reject(err) : resolve(server);
  });
});

module.exports = { start };
