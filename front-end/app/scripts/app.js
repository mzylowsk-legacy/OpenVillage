/**
 * INSPINIA - Responsive Admin Theme
 *
 */
'use strict';

(function () {
    angular.module('openvillage', [
            'ui.router',                    // Routing
            'ui.bootstrap'                 // Bootstrap
        ])
        .config(function ($locationProvider) {
            $locationProvider.html5Mode(true);
        });

})();