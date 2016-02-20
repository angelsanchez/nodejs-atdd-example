'use strict';

const connect = require('./connect');
const logger = require('../util/logger');

module.exports = collectionName => {
  return connect()
    .then(db => db.collection(collectionName).deleteMany({}))
    .then(() => {
      logger.info('Deleted elements from db');
      return Promise.resolve();
    })
    .catch(err => {
      logger.error('Unable to deleteMany from db: ', err);
      return Promise.reject(err);
    });

};
