'use strict';

const connect = require('./connect');
const logger = require('../logger');

module.exports = collectionName => {
  return new Promise((resolve, reject) => {
    connect()
      .then(db => {
        db
          .collection(collectionName)
          .deleteMany({}, err => {
            if (err) {
              logger.error('Unable to deleteMany from db: ', err);
              return reject(err);
            }
            logger.info('Deleted elements from db');
            return resolve();
          });

      })
      .catch(error => reject(error));
  });
};
