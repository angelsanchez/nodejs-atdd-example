'use strict';

const connect = require('./connect.js');
const logger = require('../logger');

module.exports = (collectionName, customCriteria) => {
    const criteria = customCriteria || {};
    return new Promise((resolve, reject) => {
        connect()
            .then(db => {
                db
                    .collection(collectionName)
                    .find(criteria, {_id: 0}, (error, cursor) => {
                        if (error) {
                            logger.error('Unable to retrieve from db, error: ' + error);
                            return reject(error);
                        }
                        resolve(cursor);
                    });
            })
            .catch(reject);
    });
};
