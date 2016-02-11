'use strict';

const config = require('../../src/config.js');
const httpServices = require('../../src/http_services');

module.exports = function () {

    this.BeforeFeatures((event, done) => {
        httpServices
            .start(config.app.port)
            .then(done)
            .catch(err => done(err));
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
        .then(db => {
            db.dropDatabase((err, result) => {
                if( err ){
                    return done(err);
                }
                done();
            });
        })
        .catch(err => done(err));
}
