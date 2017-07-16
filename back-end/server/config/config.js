'use strict';

module.exports.loggerConf = {
    filePath: '/tmp/ProjectsBuilderPlatform.log',
    level: 'debug'
};

module.exports.emailProvider = {
    host: 'smtp.gmail.com',
    from: 'OpenVillage openvillagemr@gmail.com',
    port: 465,
    secure: true,
    username: 'openvillagemr',
    password: '12345678mr'
};

module.exports.auth = {
    expirationTokenTime: '5h',
    key: 'marta'
};

module.exports.environment = {
    host: 'http://localhost:8080'
};

module.exports.mongodb = {
    host: 'mongodb://localhost',
    port: 27017,
    databaseName: 'openvillage'
};

module.exports.builder = {
    workspace: { path: '/tmp/openvillage' }
};