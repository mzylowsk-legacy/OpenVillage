'use strict';

angular.module('openvillage')
    .service('projectsService', function ($http, $q) {

        var SERVER_URL = 'http://localhost:8080';

        this.getList = function () {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/projects/list')
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

    });