'use strict';

const connect = require('../../src/storage/connect');
const expect = require('chai').expect;

describe('Storage connect integration tests', () => {

    it('Should connect to mongodb', done => {
        connect().then(db => {
            expect(db).to.exist;
            done();

        }).catch(done.reject);
    });

});
