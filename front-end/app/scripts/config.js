/**
 * INSPINIA - Responsive Admin Theme
 *
 * Inspinia theme use AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 *
 */
'use strict';

function config($stateProvider, $urlRouterProvider, $loginProvider) {
    $urlRouterProvider.otherwise('login');

    $stateProvider

        .state('index', {
            abstract: true,
            url: '/index',
            templateUrl: 'views/common/content.html'
        })
        .state('index.main', {
            url: '/main',
            templateUrl: 'views/main.html',
            data:
            {
                pageTitle: 'Example view' ,
                requireLogin: true,
                saveState: false
            }
        })
        .state('index.minor', {
            url: '/minor',
            templateUrl: 'views/minor.html',
            data: {
                pageTitle: 'Example view',
                requireLogin: true,
                saveState: false
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'UsersCtrl',
            data: {
                pageTitle: 'Login',
                specialClass: 'gray-bg',
                requireLogin: false
            }
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'UsersCtrl',
            data: {
                pageTitle: 'Register',
                specialClass: 'gray-bg',
                requireLogin: false
            }
        })
        .state('forgot_password', {
            url: '/forgot_password',
            templateUrl: 'views/forgot_password.html',
            controller: 'UsersCtrl',
            data: {
                pageTitle: 'Forgot password',
                specialClass: 'gray-bg',
                requireLogin: false
            }
        })
        .state('activation-success', {
            url: '/activation-success',
            templateUrl: 'views/activation-success.html',
            data: {
                pageTitle: 'Activation Success',
                specialClass: 'gray-bg',
                requireLogin: false
            }
        })
        .state('activation-error', {
            url: '/activation-error',
            templateUrl: 'views/activation-error.html',
            data: {
                pageTitle: 'Activation Error',
                specialClass: 'gray-bg',
                requireLogin: false
            }
        });

    $loginProvider
        .setDefaultLoggedInState ('index.main')
        .setFallbackState('login')
        .setAuthModule('userAuthService')
        .setAuthClearMethod('clearAuthKey')
        .setAuthGetMethod('getAuthKey')
        .setCookieName('__loginState');

}
angular
    .module('openvillage')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });