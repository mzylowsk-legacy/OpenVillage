'use strict';

angular.module('openvillage')

    .controller('ReportsCtrl', function ($scope, reportsService, projectsService, buildsService, SweetAlert, $state) { 
        $scope.periods = ['day', 'week', 'month', 'year'];
        $scope.format = 'yyyy/MM/dd';
        $scope.date = new Date();
        $scope.maxDate = Date.now();
        $scope.selection = [];

        $scope.toggleSelection = function toggleSelection(p) {
            var idx = $scope.selection.indexOf(p);
            if (idx > -1) {
                $scope.selection.splice(idx, 1);
            } else {
                $scope.selection.push(p);
            }
        };

        $scope.getProjectsList = function() {
            projectsService.getList()
                .then(function(res) {
                    $scope.projects = res;
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.getAllProjectsNumber = function() {
          return $scope.projects.length;
        };

        $scope.getLatestProjectsInfo = function() {
            var count = 0;
            var info = '';
            angular.forEach($scope.projects, function(project) {
                var creationDate = new Date(project.creationDate);
                if (creationDate !== undefined && creationDate.getTime() > $scope.date.getTime()) {
                    count++;
                    info += project.name + '; ';
                }
            });
            return count + ': ' + info;
        };

        $scope.sendReport = function(isValid) {
            if (isValid) {
                var reportData = {
                    numOfAllProjects: $scope.getAllProjectsNumber(),
                    latestProjectsInfo: $scope.getLatestProjectsInfo(),
                    selectedDate: $scope.date,
                    selectedProjects: $scope.selection,
                    email: $scope.email
                };
                reportsService.sendReport(reportData)
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
            }
        };

    });
