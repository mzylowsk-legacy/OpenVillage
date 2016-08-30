/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
'use strict';

function MainCtrl($scope, $window, projectsService) {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    this.userName = $window.sessionStorage.sessionUsername;

    $scope.loadNumberOfProjects = function() {
        $scope.numberOfProjectsOwned = -1;
        projectsService.getList()
            .then(function (result) {
                $scope.numberOfProjectsOwned = result.length;
            }, function (err) {
                console.log(err);
                window.alert(err);
            });
    };
}

angular
    .module('openvillage')
    .controller('MainCtrl', MainCtrl);