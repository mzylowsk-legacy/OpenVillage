'use strict';

angular.module('openvillage')
    .controller('ProfileCtrl', function ($scope, usersService, projectsService, $window) {

        $scope.userName = $window.sessionStorage.sessionUsername;

        $scope.getUserData = function() {
            usersService.getUserProfile($scope.userName)
                .then(function(res) {
                    $scope.userProfile = res;
                }, function (err) {
                    console.log(err);
                    window.alert(err);
                });
        };

        $scope.formatDateTime = function(datetime) {
            return new Date(datetime).toLocaleDateString(navigator.language);
        };

        $scope.numberOfProjectsOwned = -1;
        $scope.getNumberOfProjectsOwned = function() {
            projectsService.getList()
                .then(function(res) {
                    $scope.numberOfProjectsOwned = res.length;
                }, function (err) {
                    console.log(err);
                    window.alert(err);
                });
        };

        $scope.getUserData();
        $scope.getNumberOfProjectsOwned();

    });