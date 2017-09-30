'use strict';

angular.module('openvillage')
    .controller('ProjectEditCtrl', function ($scope, $window, $stateParams, projectsService, SweetAlert, $state) {

        $scope.userName = $window.sessionStorage.sessionUsername;
        $scope.projectName = $stateParams.name;

        $scope.getProjectDetails = function() {
            projectsService.getProjectDetails($scope.projectName)
                .then(function (res) {
                    if (!res.isPrivate) {
                        delete res.password;
                    }
                    $scope.project = res;
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.editProject = function () {
            projectsService.editProject($scope.project)
                .then(function () {
                    SweetAlert.swal({
                        title: 'Project changes saved!',
                        type: 'success',
                        confirmButtonText: 'OK'
                    }, function() {
                        $state.go('index.projects');
                    });
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };
    });