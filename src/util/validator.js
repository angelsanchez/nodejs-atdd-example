'use strict';

const tv4 = require('tv4');

module.exports = (obj, schema) => {
    let result = tv4.validateMultiple(obj, schema);

    if (result.valid) {
        return Promise.resolve();

    } else {

        let errors = result.errors.map(err => {

            let errJson = { message: err.message };

            if (err.dataPath) {
                errJson.dataPath = err.dataPath;
            }

            return errJson;
        });

        return Promise.reject({code: 'validation_error', errors});
    }
};
