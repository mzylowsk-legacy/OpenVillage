'use strict';

angular.module('openvillage')
    .service('scriptsService', function ($http, $q) {

        var SERVER_URL = 'http://localhost:8080';

        this.getList = function (projectName) {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/scripts/list/' + projectName)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.getDefaultList = function () {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/scripts/defaults')
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.getScriptContent = function (scriptName, projectName) {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/scripts/content/' + projectName + '/' + scriptName)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.addNewScript = function (script, projectName) {
            return $q(function (resolve, reject) {
                $http.post(SERVER_URL + '/auth/api/scripts/add/' + projectName, script)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.deleteScript = function (projectName, scriptName) {
            return $q(function (resolve, reject) {
                $http.delete(SERVER_URL + '/auth/api/scripts/delete/' + projectName + '/' + scriptName)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.editScript = function (projectName, script) {
            return $q(function (resolve, reject) {
                $http.put(SERVER_URL + '/auth/api/scripts/edit/' + projectName, script)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

    });