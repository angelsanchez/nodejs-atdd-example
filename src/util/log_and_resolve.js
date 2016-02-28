'use strict';

const logger = require('./logger');

module.exports = msg => data => {
  logger.info(msg);
  return Promise.resolve(data);
};
