'use strict';

angular.module('openvillage')
    .controller('ReportsCtrl', function ($scope, reportsService, SweetAlert, $state) {
        $scope.periods = ['day', 'week', 'month', 'year'];
        $scope.format = 'yyyy/MM/dd';
        $scope.date = new Date();
        $scope.maxDate = Date.now();

        $scope.sendReport = function(isValid) {
            if (isValid) {
                var reportData = '';
                //TODO

                reportsService.sendNewReport(reportData)
                    .then(function () {
                        $scope.submitted = true;

                        SweetAlert.swal({
                            title: 'Report sent',
                            type: 'success',
                            confirmButtonText: 'OK'
                        }, function() {
                            $state.go('index');
                        });

                    }, function (err) {
                        $scope.submitted = true;
                        console.log(err);

                        SweetAlert.swal({
                            title: 'Error occurred',
                            type: 'error',
                            text: JSON.stringify(err)
                        });
                    });

                //TODO
            }
        };
    });
