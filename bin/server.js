'use strict';

const config = require('../src/config');
const httpServices = require('../src/http_services');
const logger = require('../src/logger');

httpServices
  .start(config.app.port)
  .then(server => {
    logger.info(`Server for ${config.app.name} started at: ${server.url}`);
  })
  .catch(error => {
    logger.error('Unable to start server, ', error);
  });
