'use strict';

angular.module('openvillage')
    .service('buildsService', function ($http, $q) {

        var SERVER_URL = 'http://localhost:8080';

        this.getBuildsByProjectName = function (projectName) {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/builds/project/' + projectName)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.getBuildByName = function (buildName) {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/builds/get/' + buildName)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        /*
        {
             "steps": [
                 {"scriptName": "script_01", "args": "--arg1 ble", "public": true },
                 {"scriptName": "script_02", "args": "-b", "public": false },
                 {"scriptName": "script_03", "args": "", "public": false }
             ],
             "projectVersion": "<branch/commit>",
             "projectName": "<name>"
         }
         */
        this.runBuild = function (body) {
            return $q(function (resolve, reject) {
                $http.post(SERVER_URL + '/auth/api/builds/run', body)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.addNewScript = function (script) {
            return $q(function (resolve, reject) {
                $http.post(SERVER_URL + '/auth/api/scripts/add', script)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.deleteScript = function (scriptName) {
            return $q(function (resolve, reject) {
                $http.delete(SERVER_URL + '/auth/api/scripts/delete/' + scriptName)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.getZipPackage = function (projectName, commitSHA) {
            return $q(function (resolve, reject) {
               $http.get(SERVER_URL + '/auth/api/builds/project/zip/' + projectName + '/' + commitSHA)
                   .success(function (data) {
                       resolve(data);
                   })
                   .error(function (err) {
                       reject(err);
                   });
            });
        };


    });