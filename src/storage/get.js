'use strict';

const connect = require('./connect');
const logger = require('../util/logger');
const LIMIT_ONE = 1;

module.exports = (collectionName, criteria) => {
  return connect()
    .then(db => db.collection(collectionName).find(criteria).limit(LIMIT_ONE).next())
    .then(doc => {
      delete doc._id;
      return doc;
    })
    .catch(err => {
      logger.error(`Unable to retrieve element from db, collection name: ${collectionName} criteria: ${JSON.stringify(criteria)} error `, err);
      return Promise.reject(err);
    });
};
