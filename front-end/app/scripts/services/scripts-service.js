'use strict';

angular.module('openvillage')
    .service('scriptsService', function ($http, $q) {

        var SERVER_URL = 'http://localhost:8080';

        this.getList = function () {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/scripts/list')
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

        this.getScriptContent = function (scriptName) {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/scripts/content/' + scriptName)
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

        this.editScript = function (script) {
            return $q(function (resolve, reject) {
                $http.put(SERVER_URL + '/auth/api/scripts/edit', script)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

    });