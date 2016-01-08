'use strict';

const config = require('./config.js');
const httpServices = require('./http_services.js');
const logger = require('./logger.js');

httpServices
    .start(config.app.port)
    .then(server => {
        logger.info('Server started at:', server.url);
    })
    .catch(error => {
        logger.error('Unable to start server, ' + error);
    });
