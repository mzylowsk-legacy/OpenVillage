'use strict';

module.exports.loggerConf = {
    filePath: '/tmp/ProjectsBuilderPlatform.log',
    level: 'debug'
};

module.exports.emailProvider = {
    host: '<host>',
    from: 'OpenVillage <email>',
    port: 465,
    secure: true,
    username: '<username>',
    password: '<password>'
};

module.exports.auth = {
    expirationTokenTime: '5h',
    key: '<key>'
};

module.exports.environment = {
    host: '<protocol>:<address>:<port>'
};
