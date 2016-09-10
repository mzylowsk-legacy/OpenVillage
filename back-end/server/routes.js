/**
 * Main application routes
 */

'use strict';

var expressJwt = require('express-jwt'),
    config = require('./config/config');

module.exports = function (app) {

    // WARNING - Added because of CORS errors (separate ui project)
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "DELETE");
        next();
    });

    // Insert routes below
    app.use('/api/users', require('./handlers/users'));
    app.use('/auth/api/', expressJwt({secret: config.auth.key}));
    app.use('/auth/api/users', require('./handlers/authorized/users'));
    app.use('/auth/api/projects', require('./handlers/authorized/projects'));
    app.use('/auth/api/scripts', require('./handlers/authorized/scripts'));
    app.use('/auth/api/builds', require('./handlers/authorized/builds'));

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};
