'use strict';

angular.module('openvillage')
    .controller('ProjectsCtrl', function ($scope, usersService, projectsService, $window, SweetAlert, $state, DTOptionsBuilder,
                                          DTColumnDefBuilder, messages) {

        $scope.userName = $window.sessionStorage.sessionUsername;

        $scope.project = {
            isPrivate: true
        };

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bFilter', false)
            .withOption('order', [1, 'asc']);

        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4).notSortable()
        ];

        $scope.addProject = function (project) {
            project.creationDate = new Date();
            projectsService.addNewProject(project)
                .then(function () {
                    $scope.submitted = true;

                    SweetAlert.swal({
                        title: 'Project created',
                        type: 'success',
                        confirmButtonText: 'Back to list'
                    }, function() {
                        $state.go('index.projects');
                    });

                }, function (err) {
                    $scope.submitted = true;
                    console.log(err);
                    SweetAlert.swal(messages.errors.PROJECT_SAVING_FAILED);
                });
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

        $scope.deleteProject = function(projectName, index) {
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover this project!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: false
            }, function(isConfirm) {
                if(!isConfirm) {
                    return;
                }

                projectsService.deleteProject(projectName)
                    .then(function() {
                        $scope.projects.splice(index, 1);
                        SweetAlert.swal(messages.success.DELETION_PROJECT);
                    }, function (err) {
                        console.log(err);
                        SweetAlert.swal(messages.errors.DELETION_PROJECT_FAILED);
                    });
            });
        };

    });