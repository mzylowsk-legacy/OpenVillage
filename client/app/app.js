'use strict';
angular.module('openVillageApp', [
    'openVillageApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
])
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
});
//# sourceMappingURL=app.js.map