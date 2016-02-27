'use strict';

const isEmpty = require('lodash/isEmpty');

const connectCollection = require('./connect_collection');
const logAndResolveWith = require('../util/log_and_resolve_with');
const logErrorAndReject = require('../util/log_error_and_reject');


module.exports = (collectionName, doc) => {

  if (isEmpty(doc)) {
    return Promise.reject(new Error('Can\'t insert an empty document'));
  }

  return connectCollection(collectionName)
    .then(col => col.insertOne(doc))
    .then(result => logAndResolveWith(`Persisted element on db: ${JSON.stringify(doc)} / result: ${JSON.stringify(result)}`, doc))
    .catch(logErrorAndReject(`Unable to persist on db, collection name: ${collectionName}, error`));
};
