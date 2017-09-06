'use strict';

angular.module('openvillage')
    .controller('UsersCtrl', function ($scope, usersService, $window, $stateParams, $location, $state, SweetAlert) {

        $scope.birthdayPicker = {
            opened: false
        };

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

        $scope.logOut = function() {
            if($window.sessionStorage.token) {
                delete $window.sessionStorage.token;
                $state.go('login');
            }
        };

        $scope.register = function (user) {
            usersService.register(user)
                .then(function () {
                    SweetAlert.swal({
                        title: 'User has been created.',
                        type: 'success',
                        text: ' Check your email address.',
                        confirmButtonText: 'OK'
                    }, function() {
                        $state.go('login');
                    });
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: 'Cannot create a user. Check the fields in the registration form.'
                    });
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

        $scope.openBirthdayPicker = function () {
            $scope.birthdayPicker.opened = true;
        };

    });