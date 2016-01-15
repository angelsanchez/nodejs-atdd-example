'use strict';

const mockery = require('mockery');
const expect = require('chai').expect;

const validAuthor = {
    name: 'Isaac Asimov',
    born: '02-01-1920',
    died: '06-04-1992',
    language: 'English',
    occupation: ['Writer', 'professor of biochemistry'],
    nationality: 'American',
    picture: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Isaac.Asimov01.jpg'
};

const invalidAuthor = {
    name: 'Isaac Asimov'
};

describe('Create authors', () => {

    afterEach(() => {
        mockery.deregisterAll();
        mockery.disable();
    });

    it('Should return the created author', done => {

        const createdAuthor = Object.assign({_id: '1234'}, validAuthor);

        const storageCreateStub = () => {
            return Promise.resolve(createdAuthor);
        };

        const createAuthor = getCreateAuthorInstance(storageCreateStub);

        createAuthor(validAuthor).then(author => {
            expect(author).to.deep.equal(createdAuthor);
            expect(author._id).to.exist;
            done();
        }).catch(err => done(err));
    });

    it('Should return an error because the author is invalid', done => {

        const storageCreateStub = () => Promise.resolve();

        const createAuthor = getCreateAuthorInstance(storageCreateStub);

        createAuthor(invalidAuthor).then(() => done('Error: the author should be invalid')).catch(err => {
            expect(err.code).to.equal('validation_error');
            expect(err.errors).to.exist;
            done();
        });
    });

    function getCreateAuthorInstance(storageCreateStub) {
        mockery.registerMock('../storage/save', storageCreateStub);

        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        return require('../../src/authors/create');
    }

});
