'use strict';

const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true,
            json: false
        })
        /*new (winston.transports.File)({
            name: 'info-file',
            filename: 'info.log',
            level: 'info',
            json: false
        }),
        new (winston.transports.File)({
            name: 'debug-file',
            filename: 'debug.log',
            level: 'debug',
            json: false
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'error.log',
            level: 'error',
            json: false
        }),
        new (winston.transports.File)({
            name: 'http-log',
            filename: 'http.log',
            level: 'http-log',
            json: false
        })*/
    ]
});

module.exports = logger;
