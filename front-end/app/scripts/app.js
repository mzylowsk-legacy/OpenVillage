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
            'datatables'
        ]);

    angular.module('openvillage')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
    });

})();