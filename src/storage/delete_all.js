'use strict';

const connectCollection = require('./connect_collection');
const logger = require('../util/logger');

module.exports = collectionName => {
  return connectCollection(collectionName)
    .then(col => col.deleteMany({}))
    .then(() => {
      logger.info('Deleted elements from db');
      return Promise.resolve();
    })
    .catch(err => {
      logger.error('Unable to deleteMany from db: ', err);
      return Promise.reject(err);
    });

};
