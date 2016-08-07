/**
 * Main application routes
 */

'use strict';

module.exports = function(app) {

    // WARNING - Added because of CORS errors (separate ui project)
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

  // Insert routes below
  app.use('/api/users', require('./handlers/users'));

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
