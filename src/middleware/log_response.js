'use strict';

const logger = require('../util/logger');

module.exports = (req, res, route, err) => {

  if (!err) {
    logger.info({ res }, `< Response ok ${req.url}`);
    return;
  }

  logger.error({ req, res, err }, `< Response error ${req.url}`);

};
