'use strict';

const logger = require('../util/logger');

module.exports = (req, res, next) => {
  logger.info({ req, res }, `> Incomming request ${req.url}`);
  return next();
};
