'use strict';

const HTTP = require('http-status-codes');
const serializers = require('../../../src/util/custom_bunyan_serializers');
const expect = require('../dirty-chai').expect;

describe('Custom serializers', () => {

  it('Should serialize a request', () => {

    const rawRequest = {
      headers: { 'Content-Type': 'test' },
      method: 'GET',
      url: '/test',
      another: 'field',
      ignore: 'also'
    };

    const serializedRequest = serializers.req(rawRequest);

    expect(serializedRequest).to.exist();
    expect(Object.keys(serializedRequest).sort()).to.deep.equal(['headers', 'method', 'url']);
    expect(serializedRequest.headers).to.deep.equal(rawRequest.headers);

  });

  it('Should serialize a request an omit empty values', () => {

    const rawRequest = {
      headers: { 'Content-Type': 'test' },
      method: 'GET',
      url: null,
      query: {},
      another: 'field',
      ignore: 'also'
    };

    const serializedRequest = serializers.req(rawRequest);

    expect(serializedRequest).to.exist();
    expect(Object.keys(serializedRequest).sort()).to.deep.equal(['headers', 'method']);
    expect(serializedRequest.headers).to.deep.equal(rawRequest.headers);

  });

  it('Should serialize a response', () => {

    const rawResponse = {
      statusCode: HTTP.CREATED,
      _id: 'asdfg123456',
      another: 'field',
      ignore: 'also'
    };

    const serializedResponse = serializers.res(rawResponse);

    expect(serializedResponse).to.exist();
    expect(Object.keys(serializedResponse).sort()).to.deep.equal(['_id', 'statusCode']);

  });

  it('Should serialize a response an omit empty values', () => {

    const rawResponse = {
      statusCode: HTTP.CREATED,
      another: 'field',
      ignore: 'also'
    };

    const serializedResponse = serializers.res(rawResponse);

    expect(serializedResponse).to.exist();
    expect(Object.keys(serializedResponse).sort()).to.deep.equal(['statusCode']);

  });

  describe('Reducer function', () => {

    it('Reduce with an array as an input parameter', () => {
      const rawResponse = {
        statusCode: HTTP.CREATED,
        another: 'field',
        ignore: 'also'
      };

      const serializedResponse = serializers.reduceObject(rawResponse, ['another', 'ignore']);

      expect(serializedResponse).to.exist();
      expect(Object.keys(serializedResponse).sort()).to.deep.equal(['another', 'ignore']);

    });

    it('Returns an empty object with no fields to reduce', () => {
      const rawResponse = {
        statusCode: HTTP.CREATED,
        another: 'field',
        ignore: 'also'
      };

      const serializedResponse = serializers.reduceObject(rawResponse);

      expect(serializedResponse).to.be.empty();

    });
  });


});
