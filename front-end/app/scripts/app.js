/**
 * INSPINIA - Responsive Admin Theme
 *
 */
'use strict';

(function () {
    angular.module('openvillage', [
            'ui.router',        // Routing
            'ui.bootstrap',     // Bootstrap
            'ui.router.login',   // Login module
            'oitozero.ngSweetAlert', //ngSweetAlert
            'datatables',
            'ui.sortable',
            'ui.codemirror'
        ]);

    angular.module('openvillage')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
    });

})();