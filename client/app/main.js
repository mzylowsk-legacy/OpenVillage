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
            .when('/reset', {
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
