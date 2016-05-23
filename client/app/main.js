'use strict';

angular.module('ProjectsBuilderPlatformApp')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/login.html',
                controller: 'UsersCtrl',
                authentication: false
            })
            .when('/registration', {
                templateUrl: 'app/views/registration.html',
                controller: 'UsersCtrl',
                authentication: false
            })
            .when('/activated', {
                templateUrl: 'app/views/activation-success.html',
                controller: 'UsersCtrl',
                authentication: false
            })
            .when('/activation_error', {
                templateUrl: 'app/views/activation-error.html',
                controller: 'UsersCtrl',
                authentication: false
            })
            .when('/forgot', {
                templateUrl: 'app/views/forgot-password.html',
                controller: 'UsersCtrl',
                authentication: false
            })
            .when('/users/:username/resetPassword/:token', {
                templateUrl: 'app/views/reset-password.html',
                controller: 'UsersCtrl',
                authentication: false
            });
    })
    .run(function ($rootScope, $window, $location) {
        $rootScope.$on('$routeChangeStart', function (e, newUrl) {
            if (newUrl.$$route.authentication && !$window.sessionStorage.token) {
                $location.path('/');
            }
        });
    });
