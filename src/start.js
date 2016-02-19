'use strict';

const config = require('./config');
const httpServices = require('./http_services');
const logger = require('./logger');

httpServices
  .start(config.app.port)
  .then(server => {
    logger.info('Server started at:', server.url);
  })
  .catch(error => {
    logger.error('Unable to start server, ', error);
  });
