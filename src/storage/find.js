'use strict';

const connect = require('./connect');
const logger = require('../logger');

module.exports = (collectionName, customCriteria) => {
    const criteria = customCriteria || {};

    return new Promise((resolve, reject) => {
        connect().then(db => {

            db.collection(collectionName).find(criteria, (error, cursor) => {
                if (error) {
                    logger.error('Unable to retrieve from db, error: ' + error);
                    reject(error);
                }
                resolve(cursor);
            });

        }).catch(reject);
    });

};
