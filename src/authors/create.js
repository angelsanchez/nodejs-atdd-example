'use strict';

const storageSaveOne = require('../storage/save_one');
const validateAuthor = require('./validate_author');

const saveAuthor = author => storageSaveOne('authors', author);

module.exports = author => validateAuthor(author).then(saveAuthor);
