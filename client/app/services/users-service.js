'use strict';

angular.module('openVillageApp')
    .service('usersService', function ($http, $q) {

        this.register = function (newUser) {
            return $q(function (resolve, reject) {
                $http.post('/api/users/add', newUser)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.logIn = function (login, password) {
            var body = {
                username: login,
                password: password
            };
            return $q(function (resolve, reject) {
                $http.post('/api/users/login', body)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.forgotPassword = function (email) {
            var body = {
                email: email
            };
            return $q(function (resolve, reject) {
                $http.post('/api/users/forgot_password', body)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.resetPasswordRequest = function(newPassword, mail, hash) {
            var body = {
                newPassword: newPassword
            };
            return $q(function(resolve, reject) {
                $http.post('/api/users/reset_password/' + mail + '/' + hash, body)
                    .success(function(data) {
                        resolve(data);
                    })
                    .error(function(err) {
                        reject(err);
                    });
            });
        };

    });
