'use strict';

const authorsCreate = require('./create');

module.exports = (request, response, next) => {
    authorsCreate(request.body)
        .then(author => {
            response.json(201, {id: author._id});
            return next();
        }).catch(error => {
            response.json(error.statusCode || 500, {error: error});
            return next();
        });
};
