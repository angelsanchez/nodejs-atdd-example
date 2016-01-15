'use strict';

const save = require('../../src/storage/save');
const connect = require('../../src/storage/connect');
const expect = require('chai').expect;

describe('Storage save integration tests', () => {

    it('Persist on connect to mongodb', done => {
        save('test', {x: 1}).then(test => {
            expect(test._id).to.exist;
            expect(test.x).to.equal(1);
            done();

        }).catch(done.reject);
    });

    afterEach(done => dropTestCollection(done));
    beforeEach(done => dropTestCollection(done));

    function dropTestCollection(done) {
        connect()
            .then(db => {
                db.listCollections().toArray((err, replies) => {
                    if (replies.some(doc => doc.name == 'test')) {
                        db.collection('test').drop(done);
                    } else {
                        done();
                    }
                });
            })
            .catch(done);
    }

});
