'use strict';

const MongoClient = require('mongodb').MongoClient;

const baseConfig = require('../config');
const logger = require('../util/logger');

module.exports = newConfig => {
  const config = newConfig || baseConfig;
  return MongoClient.connect(config.database.uri, config.database.connectOptions)
    .then(db => {
      logger.info(`Connected to db => ${config.database.uri}`);
      return db;
    })
    .catch(error => {
      logger.error('Unable to connect to db: ', error);
      return Promise.reject(error);
    });
};
