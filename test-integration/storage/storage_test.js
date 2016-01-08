'use strict';

const findTrips = require('../../src/trips/find.js'),
    deleteAllFromStorage = require('../../src/storage/delete_all_from_storage.js'),
    persistOnStorage = require('../../src/storage/persist_on_storage.js'),
    _ = require('lodash'),
    should = require('chai').should();

describe('Retrieve trips from storage collection', () => {
    before(done => {
        deleteAllFromStorage('trips').then(() => done());
    });

    it('Should retrieve all trips from storage collection', done => {
        const expectedStoredTrips = [{id: 'tripId_1'}, {id: 'tripId_2'}];

        persistOnStorage('trips', _.cloneDeep(expectedStoredTrips[0]))
            .then(() => persistOnStorage('trips', _.cloneDeep(expectedStoredTrips[1])))
            .then(() => findTrips())
            .then(trips => {
                should.exist(trips);
                trips.length.should.deep.equal(trips.length);
                done();
            })
            .catch(error => done(error));
    });

    afterEach(done => {
        deleteAllFromStorage('trips').then(() => done());
    });
});