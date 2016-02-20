'use strict';

const connect = require('./connect');
const logger = require('../logger');

module.exports = (collectionName, criteria, update) => {
  return connect()
    .then(db => db.collection(collectionName).updateOne(criteria, update))
    .catch(err => {
      logger.error(`Unable to update element from db, collection name: ${collectionName}, criteria: ${JSON.stringify(criteria)} error:`, err);
      return Promise.reject(err);
    });
};
