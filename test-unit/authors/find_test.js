'use strict';

const mockery = require('mockery');
const assert = require('assert');

describe('List of authors', () => {

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    const authorList = [
        {name: 'Isaac Asimov'},
        {name: 'Frank Herbert'}
    ];

    it('Should return the list of authors', done => {

        const retrieveFromStorageStub = () => {
            const retrieveCursor = {
                toArray: () => Promise.resolve(authorList)
            };
            return Promise.resolve(retrieveCursor);
        };

        const findAuthors = getFindAuthorsInstance(retrieveFromStorageStub);

        findAuthors().then(authors => {
            assert.deepEqual(authors, authorList);
            done();
        }).catch(err => done(err));
    });

    function getFindAuthorsInstance(storageRetrieveFromStorageStub) {
        mockery.registerMock('../storage/retrieve_from_storage', storageRetrieveFromStorageStub);

        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        return require('../../src/authors/find');
    }

});
