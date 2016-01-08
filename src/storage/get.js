'use strict';

const connect = require('./connect.js');
const logger = require('../logger');

module.exports = (collectionName, criteria) => {
    return new Promise((resolve, reject) => {
        return connect()
            .then(db => {

                db.collection(collectionName)
                    .find(criteria)
                    .limit(1)
                    .next((err, doc) => {
                        if (err) {
                            logger.error('Unable to retrieve element from db, collection name: ' + collectionName + ', criteria: ' + criteria + ' error message: ' + err);
                            return reject(err);
                        }

                        delete doc._id;
                        resolve(doc);
                    });

            })
            .catch(err => reject(err));
    });
};