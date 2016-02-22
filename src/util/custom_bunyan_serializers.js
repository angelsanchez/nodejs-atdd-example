'use strict';

const bunyan = require('bunyan');
const omitBy = require('lodash/omitBy');
const isEmpty = require('lodash/isEmpty');
const isArray = require('lodash/isArray');
const isNumber = require('lodash/isNumber');

const reduceObject = (obj, fields) => {
  const striped = {};
  const filterFields = isArray(fields) ? fields : (fields||'').split(' ');
  filterFields.forEach(field => {
    striped[field] = obj[field];
  });

  return omitBy(striped, val => isEmpty(val) && !isNumber(val));
};

module.exports = {
  req: req => reduceObject(req, 'headers method url query params body, _id'),
  res: res => reduceObject(res, 'statusCode _id'),
  err: bunyan.stdSerializers.err,
  reduceObject
};
