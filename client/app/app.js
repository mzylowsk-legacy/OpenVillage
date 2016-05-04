'use strict';

angular.module('ProjectsBuilderPlatformApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'ngDialog',
        'jsonFormatter',
        'ngTable'
    ])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);

        $httpProvider.interceptors.push('authInterceptor');

    });

