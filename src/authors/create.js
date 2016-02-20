'use strict';

const storageSave = require('../storage/save');
const validateAuthor = require('./validate_author');

const saveAuthor = author => storageSave('authors', author);

module.exports = author => {
  return validateAuthor(author).then(saveAuthor);
};
