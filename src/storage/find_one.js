'use strict';

const isEmpty = require('lodash/isEmpty');

const connectCollection = require('./connect_collection');
const logErrorAndReject = require('../util/log_error_and_reject');
const LIMIT_ONE = 1;

module.exports = (collectionName, criteria) => {

  if (isEmpty(criteria)) {
    return Promise.reject(new Error('Can\'t find one document without criteria'));
  }
  return connectCollection(collectionName)
    .then(col => col.find(criteria).limit(LIMIT_ONE).next())
    .catch(logErrorAndReject(`Unable to retrieve element from db, collection name: ${collectionName} criteria: ${JSON.stringify(criteria)} error`));
};
