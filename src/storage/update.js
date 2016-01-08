'use strict';

const connect = require('./connect');
const logger = require('../logger');

module.exports = (collectionName, criteria, update) => {

    return connect()
        .then(db => {

            db.collection(collectionName)
                .updateOne(criteria, update, (err, result) => {
                    if (err) {
                        logger.error('Unable to update element from db, collection name: ' + collectionName + ', criteria: ' + criteria + ' error message: ' + err);
                        return Promise.reject(err);
                    }

                    Promise.resolve(result);
                });

        })
        .catch(err => Promise.reject(err));
};