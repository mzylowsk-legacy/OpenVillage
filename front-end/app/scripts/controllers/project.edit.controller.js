'use strict';

angular.module('openvillage')
    .controller('ProjectEditCtrl', function ($scope, $window, $stateParams, projectsService, SweetAlert, $state, messages) {

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
                    SweetAlert.swal(messages.errors.GET_PROJECT_DETAILS);
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
                    SweetAlert.swal(messages.errors.SAVING_CHANGES_FAILED);
                });
        };
    });