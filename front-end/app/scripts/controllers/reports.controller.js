'use strict';

angular.module('openvillage')
    .controller('ReportsCtrl', function ($scope) {
        $scope.periods = ['day', 'week', 'month', 'year'];

        $scope.saveReports = function(isValid) {
            if (isValid) {
                //TODO
            }
        };
    });
