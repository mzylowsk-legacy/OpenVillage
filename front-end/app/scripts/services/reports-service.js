'use strict';

angular.module('openvillage')
    .service('reportsService', function($http, $q) {
        var SERVER_URL = 'http://localhost:8080';

        this.sendReport = function(reportData) {
            return $q(function (resolve, reject) {
                $http.post(SERVER_URL + '/auth/api/reports/send', reportData)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };
    });