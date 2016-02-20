'use strict';

const connect = require('./connect');
const logger = require('../util/logger');

module.exports = (collectionName, customCriteria) => {
  const criteria = customCriteria || {};

  return connect()
    .then(db => db.collection(collectionName).find(criteria))
    .catch(error => {
      logger.error('Unable to retrieve from db, error: ', error);
      Promise.reject(error);
    });
};
