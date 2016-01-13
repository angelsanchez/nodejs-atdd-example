'use strict';

const authorsFind = require('./find');

module.exports = (request, response, next) => {
    authorsFind()
        .then(authors => {
            response.json({authors: authors});
            return next();
        }).catch(error => {
            response.json(500, {error: error});
            return next();
        });
};
