/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
'use strict';

function MainCtrl($scope, $window, projectsService, scriptsService, $state, SweetAlert) {

    $scope.$state = $state;
    this.userName = $window.sessionStorage.sessionUsername;

    $scope.loadWidgets = function() {
        $scope.numberOfProjectsOwned = -1;
        $scope.numberOfScripts = -1;

        projectsService.getList()
            .then(function (result) {
                $scope.numberOfProjectsOwned = result.length;
            }, function (err) {
                SweetAlert.swal({
                    title: 'Error occurred',
                    type: 'error',
                    text: JSON.stringify(err)
                });
            });

        scriptsService.getList()
            .then(function (result) {
                $scope.numberOfScripts = result.scripts.length;
            }, function (err) {
                SweetAlert.swal({
                    title: 'Error occurred',
                    type: 'error',
                    text: JSON.stringify(err)
                });
            });
    };

}

angular
    .module('openvillage')
    .controller('MainCtrl', MainCtrl);