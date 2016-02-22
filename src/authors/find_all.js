'use strict';

const storageFind = require('../storage/find_many');

module.exports = () => {
  const criteria = {};

  return storageFind('authors', criteria)
    .then(authorsCursor => {
      return authorsCursor.toArray();
    });
};
