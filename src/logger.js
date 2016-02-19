'use strict';

const winston = require('winston');

const DEFAULT_TRANSPORT = new (winston.transports.Console)({
  colorize: true,
  json: false
});

const logger = new (winston.Logger)({
  transports: [
    DEFAULT_TRANSPORT
  ]
});

module.exports = logger;
