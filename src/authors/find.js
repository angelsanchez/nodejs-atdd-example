'use strict';

const connect = require('../storage/connect');
const logger = require('../logger');

module.exports = (customCriteria) => {
    const criteria = customCriteria || {};
    return new Promise((resolve, reject) => {
        connect()
            .then(db => db.collection('authors').find(criteria, {_id: 0}).limit(100))
            .then(usersCursor => {
                resolve(usersCursor.toArray());
            })
            .catch(reject);
    });
};
