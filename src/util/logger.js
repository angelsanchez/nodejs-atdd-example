'use strict';

const winston = require('winston');

const DEFAULT_TRANSPORT = new (winston.transports.Console)({
  colorize: 'all',
  timestamp: true,
  json: false,
  handleExceptions: true
});

const logger = new (winston.Logger)({
  transports: [
    DEFAULT_TRANSPORT
  ]
});

module.exports = logger;
