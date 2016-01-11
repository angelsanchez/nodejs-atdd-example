'use strict';

const config = require('../../src/config.js');
const httpServices = require('../../src/http_services');

module.exports = function () {

    this.BeforeFeatures((event, done) => {
        httpServices
            .start(config.app.port)
            .then(done)
            .catch(done.fail);
    });

    this.Before(done => {
        this.world = {};
        cleanDB(done);
    });

    this.After(cleanDB);
};

function cleanDB(done) {
    const connect = require('../../src/storage/connect');
    connect()
        .then(db => db.collections())
        .then(collections => {
            Promise.all(collections.map(collection => collection.remove()))
        })
        .then(done)
        .catch(done);
}
