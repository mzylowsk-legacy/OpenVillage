'use strict';

angular.module('openvillage')

    .controller('ReportsCtrl', function ($scope, $window, usersService, reportsService, projectsService, buildsService,
                                         SweetAlert, $state, messages) {
        $scope.periods = ['day', 'week', 'month', 'year'];
        $scope.format = 'yyyy/MM/dd';
        $scope.date = new Date();
        $scope.maxDate = Date.now();
        $scope.selection = [];
        $scope.ifCountProjectBeforeDate = false;

        $scope.getCurrentUserEmail = function () {
            usersService.getUserProfile($window.sessionStorage.sessionUsername)
                .then(function (res) {
                   $scope.email = res.email;
                }, function (err) {
                    console.log(err);
                });
        };

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
                    SweetAlert.swal(messages.errors.GET_PROJECTS_FAILED);
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
            if (count === 0) {
                info = 'no projects added';
            }
            return count + ': ' + info;
        };

        $scope.sendReport = function(isValid) {
            if (isValid) {
                var reportData = {
                    numOfAllProjects: $scope.getAllProjectsNumber(),
                    latestProjectsInfo: $scope.getLatestProjectsInfo(),
                    ifCountProjectBeforeDate: $scope.ifCountProjectBeforeDate,
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
                            $state.go('index.reports');
                        });

                    }, function (err) {
                        $scope.submitted = true;
                        console.log(err);
                        SweetAlert.swal(messages.errors.SENDING_REPORT_FAILED);
                    });
            }
        };

    });
