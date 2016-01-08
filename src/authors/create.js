'use strict';

const persist = require('../storage/persist_on_storage');
const validateAuthor = require('./validate_author');

module.exports = author => {
    return new Promise((resolve, reject)=> {
        validateAuthor(author)
            .then(() => {
                return persist('authors', author);
            })
            .then((author)=> {
                resolve(author);
            })
            .catch(reject);
    });
};
