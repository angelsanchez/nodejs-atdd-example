'use strict';

const isEmpty = require('lodash/isEmpty');

const connectCollection = require('./connect_collection');
const logger = require('../util/logger');

module.exports = (collectionName, criteria, update) => {

  if (isEmpty(criteria) || isEmpty(update)) {
    return Promise.reject(new Error('Can\'t update document without criteria or payload'));
  }

  return connectCollection(collectionName)
    .then(col => col.updateOne(criteria, update))
    .catch(err => {
      logger.error(`Unable to update element from db, collection name: ${collectionName}, criteria: ${JSON.stringify(criteria)} error:`, err);
      return Promise.reject(err);
    });
};
