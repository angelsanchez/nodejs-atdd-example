'use strict';

const clientAPI = require('../../client_app/client_api');

module.exports = function() {
    this.When(/^user requests all authors/, (done) => {
        const world = this.world;

        clientAPI
            .retrieveAuthors()
            .then(res => {

                world.lastResponseStatusCode = res.statusCode;
                world.parsedAuthors = res.body.authors.map(author => {
                    if (author.born) author.born = new Date(author.born);
                    if (author.died) author.died = new Date(author.died);
                    return author;
                });

                done();
            })
            .catch(done.fail);
    });
};
