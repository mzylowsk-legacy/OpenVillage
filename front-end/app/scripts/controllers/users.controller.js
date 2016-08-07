'use strict';

angular.module('openvillage')
    .controller('UsersCtrl', function ($scope, usersService, $window, $stateParams, $location, $state) {

        $scope.logIn = function (username, password) {
            usersService.logIn(username, password)
                .then(function (tokenResult) {
                    $window.sessionStorage.token = tokenResult.token;
                    $window.sessionStorage.sessionUsername = username;
                    $state.go('index.main');
                }, function (err) {
                    $scope.error = err;
                });
        };

        $scope.register = function (user) {
            usersService.register(user)
                .then(function () {
                    $scope.submitted = true;
                    $scope.info = 'User has been created. Check your email address.';
                }, function (err) {
                    $scope.submitted = true;
                    $scope.info = err;
                });
        };

        $scope.forgotPassword = function (email) {
            usersService.forgotPassword(email)
                .then(function () {
                    $scope.submitted = true;
                    $scope.info = 'Reset password token has been sent.';
                }, function (err) {
                    $scope.submitted = true;
                    $scope.info = err;
                });
        };

        $scope.resetPassword = function(newPassword) {
            usersService.resetPasswordRequest(newPassword, $stateParams.username, $stateParams.token)
                .then(function() {
                    $scope.submitted = true;
                    $scope.info = 'Password has been changed.';
                }, function(err) {
                    $scope.submitted = true;
                    $scope.info = err;
                });
        };

    });