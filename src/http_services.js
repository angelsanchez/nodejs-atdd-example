'use strict';

const restify = require('restify');
const config = require('./config');
const logger = require('./logger');
const registerServices = require('./register_services');

const server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use((request, response, next)=>{
    const log = {
        request : {
            method : request.method,
            url : request.url,
            headers : request.headers,
            body : request.body
        }
    };
    logger.info(log);
    return next();
});

registerServices(server);

module.exports = {
    start: (port) => {
        return new Promise(
            (resolve, reject) => {

                server.listen(port, (err) => {
                    if (err) reject(err);
                    else resolve(server);
                });
            }
        );
    }
};