'use strict';

const mockery = require('mockery');
const expect = require('chai').expect;

const authorList = [
    {name: 'Isaac Asimov'},
    {name: 'Frank Herbert'}
];

describe('Endpoint: List of authors', () => {

    it('Should retrieve a list of authors and status code = 200 OK', done => {
        const findAuthorsStub = () => Promise.resolve(authorList);
        const findAuthorsEndpoint = getFindAuthorsEndpointInstance(findAuthorsStub);

        const requestStub = {};
        const res = {};
        const responseStub = {
            json: (bodyContent) => {
                res.statusCode = 200;
                res.body = bodyContent;
            }
        };

        findAuthorsEndpoint(requestStub, responseStub, () => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.authors).to.deep.equal(authorList);
            done();
        });
    });

    function getFindAuthorsEndpointInstance(findAuthorsStub) {
        mockery.registerMock('./find', findAuthorsStub);

        mockery.enable({
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        return require('../../src/authors/find_endpoint');
    }
});