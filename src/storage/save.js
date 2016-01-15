'use strict';

const connect = require('./connect.js');
const logger = require('../logger');

module.exports = (collectionName, doc) => {
    return new Promise((resolve, reject) => {
        return connect()
            .then(db => {
                db
                    .collection(collectionName)
                    .insertOne(doc, (err, result) => {
                        if (err) {
                            logger.error('Unable to persist on db, collection name: ' + collectionName + ', error: ' + err);
                            return reject(err);
                        }
                        logger.info('Persisted element on db: ' + JSON.stringify(doc));
                        resolve(doc, result);
                    }
                );
            })
            .catch(reject);
    });
};
