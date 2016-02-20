'use strict';

const tv4 = require('tv4');

module.exports = (obj, schema) => {
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
