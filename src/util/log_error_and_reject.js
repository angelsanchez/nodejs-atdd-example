'use strict';

const logger = require('./logger');

module.exports = msg => err => {
  logger.error(err, msg);
  return Promise.reject(err);
};
