'use strict';

const isEmpty = require('lodash/isEmpty');

const connectCollection = require('./connect_collection');
const logger = require('../util/logger');

module.exports = (collectionName, doc) => {

  if (isEmpty(doc)) {
    return Promise.reject(new Error('Can\'t insert an empty document'));
  }

  return connectCollection(collectionName)
    .then(col => col.insertOne(doc))
    .then(result => {
      logger.info(`Persisted element on db: ${JSON.stringify(doc)} / result: ${JSON.stringify(result)}`);
      return doc;
    })
    .catch(err => {
      logger.error(`Unable to persist on db, collection name: ${collectionName}, error: `, err);
      return Promise.reject(err);
    });
};
