'use strict';

const save = require('../storage/save');
const validateAuthor = require('./validate_author');

module.exports = author => {
  return new Promise((resolve, reject) => {
    validateAuthor(author)
      .then(() => save('authors', author))
      .then(resolve)
      .catch(reject);
  });
};
