'use strict';

const validator = require('../util/validator');

const authorSchema = {
    type: 'object',
    required: ['name', 'born'],
    properties: {
        name: {type: 'string'},
        born: {type: 'string', format: 'date'},
        died: {type: 'string', format: 'date'},
        language: {type: 'string'},
        occupation: {type: 'array'},
        nationality: {type: 'string'},
        picture: {type: 'string'}
    }
};

module.exports = author => validator(author, authorSchema);
