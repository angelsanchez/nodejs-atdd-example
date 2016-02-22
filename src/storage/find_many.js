'use strict';

const connectCollection = require('./connect_collection');
const logger = require('../util/logger');

module.exports = (collectionName, customCriteria) => {
  const criteria = customCriteria || {};

  return connectCollection(collectionName)
    .then(col => col.find(criteria))
    .catch(error => {
      logger.error('Unable to retrieve from db, error: ', error);
      return Promise.reject(error);
    });
};
