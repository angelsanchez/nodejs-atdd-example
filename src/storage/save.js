'use strict';

const connect = require('./connect');
const logger = require('../util/logger');

module.exports = (collectionName, doc) => {
  return connect()
    .then(db => db.collection(collectionName).insertOne(doc))
    .then(result => {
      logger.info(`Persisted element on db: ${JSON.stringify(doc)} / result: ${JSON.stringify(result)}`);
      return doc;
    })
    .catch(err => {
      logger.error(`Unable to persist on db, collection name: ${collectionName}, error: `, err);
      return Promise.reject(err);
    });
};
