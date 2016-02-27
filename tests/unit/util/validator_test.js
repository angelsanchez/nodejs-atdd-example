'use strict';

const validator = require('../../../src/util/validator');
const expect = require('../../dirty_chai').expect;

const BASE_SCHEMA = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "TestValidator",
  "description": "Schema to test validator",
  "type": "object",
  "required": ["id", "list"],
  "properties": {
    "id": {
      "description": "positive integer or string of digits",
      "type": ["string", "integer"],
      "pattern": "^[1-9][0-9]*$",
      "minimum": 1
    },
    "list":  {
      "type": "array",
      "maxItems": 5,
      "items": {
        "title": "RandomItem",
        "description": "Something inside the list",
        "type": "string"
      }
    }
  }
};

const VALID_OBJECT = { id: 300, list: [ 'this', 'is', 'a', 'list' ] };

const INVALID_OBJECT = { id: 100, list: [1,'valid', 2] };

describe('JSON Schema Validator', () => {

  it('Returns subject on valid schema', done => {
    validator(VALID_OBJECT, BASE_SCHEMA).then(res => {
      expect(res).to.equal(VALID_OBJECT);
      return done();
    }).catch(done);
  });

  it('Fail with no schema', done => {
    validator(VALID_OBJECT)
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.have.property('message', 'Can\'t validate against an empty schema');
        return done();
      }).catch(done);
  });

  it('Fail with an empty subject', done => {
    validator({}, BASE_SCHEMA)
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.have.property('code', 'validation_error');
        expect(err).to.have.property('errors').that.is.an('array')
          .that.deep.include.members([
          { message: 'Missing required property: id' },
          { message: 'Missing required property: list' }
        ]);
        return done();
      }).catch(done);
  });

  it('Fail with an invalid subject', done => {
    validator(INVALID_OBJECT, BASE_SCHEMA)
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.have.property('code', 'validation_error');
        expect(err).to.have.property('errors').that.is.an('array')
          .that.deep.include.members([
          { dataPath: '/list/0', message: 'Invalid type: number (expected string)' },
          { dataPath: '/list/2', message: 'Invalid type: number (expected string)' }
        ]);
        return done();
      }).catch(done);
  });
});
