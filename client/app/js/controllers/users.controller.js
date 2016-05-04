'use strict';

angular.module('ProjectsBuilderPlatformApp')
    .controller('UsersCtrl', function ($scope, usersService, $window) {

        $scope.logIn = function (username, password) {
            usersService.logIn(username, password)
                .then(function (tokenResult) {
                    $window.sessionStorage.token = tokenResult.token;
                    $window.sessionStorage.sessionUsername = username;
                }, function (err) {
                    $scope.error = err;
                });
        };

    });
