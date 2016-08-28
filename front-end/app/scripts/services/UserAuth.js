'use strict';

angular
    .module('openvillage')
    .service('userAuthService', function ($rootScope, $q, $window) {

        this.getAuthKey = function () {

            if($window.sessionStorage.token && $window.sessionStorage.sessionUsername) {
                return true;
            }

            return false;
        };

        this.clearAuthKey = function () {

            delete $window.sessionStorage.token;
            delete $window.sessionStorage.sessionUsername;
        };
});