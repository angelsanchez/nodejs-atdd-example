'use strict';

const connect = require('./connect');
const logger = require('../logger');

module.exports = (collectionName, criteria, update) => {

  return connect()
    .then(db => {

      db.collection(collectionName)
        .updateOne(criteria, update, (err, result) => {
          if (err) {
            logger.error(`Unable to update element from db, collection name: ${collectionName}, criteria: ${JSON.stringify(criteria)} error:`, err);
            return Promise.reject(err);
          }

          return Promise.resolve(result);
        });

    })
    .catch(err => Promise.reject(err));
};
