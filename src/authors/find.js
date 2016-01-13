'use strict';

const retrieveFromStorage = require('../storage/retrieve_from_storage');
const logger = require('../logger');

module.exports = () => {
    const criteria = {};

    return retrieveFromStorage('authors', criteria)
        .then(authorsCursor => {
            return Promise.resolve(authorsCursor.toArray());
        })
        .catch(err => Promise.reject(err));
};
