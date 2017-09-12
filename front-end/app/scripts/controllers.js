/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
'use strict';

function MainCtrl($scope, $window, projectsService, scriptsService, $state, SweetAlert, messages) {

    $scope.$state = $state;
    this.userName = $window.sessionStorage.sessionUsername;

    $scope.loadWidgets = function() {
        $scope.numberOfProjectsOwned = -1;
        $scope.numberOfScripts = 0;

        projectsService.getList()
            .then(function (result) {
                $scope.numberOfProjectsOwned = result.length;
                angular.forEach(result, function (project) {
                    scriptsService.getList(project.name)
                        .then(function (result) {
                            $scope.numberOfScripts += result.scripts.length;
                        }, function (err) {
                            console.log(err);
                            SweetAlert.swal(messages.errors.GET_SCRIPTS);
                        });
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.GET_PROJECTS_FAILED);
                });
            });
    };

}

angular
    .module('openvillage')
    .controller('MainCtrl', MainCtrl);