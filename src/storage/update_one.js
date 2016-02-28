'use strict';

const isEmpty = require('lodash/isEmpty');

const connectCollection = require('./connect_collection');
const logErrorAndReject = require('../util/log_error_and_reject');

module.exports = (collectionName, criteria, update) => {

  if (isEmpty(criteria) || isEmpty(update)) {
    return Promise.reject(new Error('Can\'t update document without criteria or payload'));
  }

  return connectCollection(collectionName)
    .then(col => col.updateOne(criteria, update))
    .catch(logErrorAndReject(`Unable to update element from db, collection name: ${collectionName}, criteria: ${JSON.stringify(criteria)} error`));
};
