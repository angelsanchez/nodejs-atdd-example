'use strict';

const connect = require('./connect');
const logger = require('../logger');
const LIMIT_ONE = 1;

module.exports = (collectionName, criteria) => {
  return new Promise((resolve, reject) => {
    return connect()
      .then(db => {

        db.collection(collectionName)
          .find(criteria)
          .limit(LIMIT_ONE)
          .next((err, doc) => {
            if (err) {
              logger.error(`Unable to retrieve element from db, collection name: ${collectionName} criteria: ${JSON.stringify(criteria)} error `, err);
              return reject(err);
            }

            delete doc._id;
            return resolve(doc);
          });

      })
      .catch(err => reject(err));
  });
};
