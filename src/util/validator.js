'use strict';

const tv4 = require('tv4');
const isEmpty = require('lodash/isEmpty');

module.exports = (obj, schema) => {

  if (isEmpty(schema)) {
    return Promise.reject(new Error('Can\'t validate against an empty schema'));
  }

  const result = tv4.validateMultiple(obj, schema);

  if (result.valid) {
    return Promise.resolve(obj);
  }

  const errors = result.errors.map(err => {

    const errJson = {message: err.message};

    if (err.dataPath) {
      errJson.dataPath = err.dataPath;
    }

    return errJson;
  });

  return Promise.reject({code: 'validation_error', errors});
};
