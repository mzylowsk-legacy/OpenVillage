/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
'use strict';

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider

        .state('index', {
            abstract: true,
            url: '/index',
            templateUrl: 'views/common/content.html',
        })
        .state('index.main', {
            url: '/main',
            templateUrl: 'views/main.html',
            data: { pageTitle: 'Example view' }
        })
        .state('index.minor', {
            url: '/minor',
            templateUrl: 'views/minor.html',
            data: { pageTitle: 'Example view' }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'UsersCtrl',
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'UsersCtrl',
            data: { pageTitle: 'Register', specialClass: 'gray-bg' }
        })
        .state('forgot_password', {
            url: '/forgot_password',
            templateUrl: 'views/forgot_password.html',
            controller: 'UsersCtrl',
            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
        })
        .state('activation-success', {
            url: '/activation-success',
            templateUrl: 'views/activation-success.html',
            data: { pageTitle: 'Activation Success', specialClass: 'gray-bg' }
        })
        .state('activation-error', {
            url: '/activation-error',
            templateUrl: 'views/activation-error.html',
            data: { pageTitle: 'Activation Error', specialClass: 'gray-bg' }
        });
}
angular
    .module('openvillage')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;


    });