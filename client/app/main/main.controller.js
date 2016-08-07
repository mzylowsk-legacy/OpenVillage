'use strict';
(function () {
    var MainController = (function () {
        function MainController($http) {
            this.$http = $http;
            this.awesomeThings = [];
        }
        MainController.prototype.$onInit = function () {
            var _this = this;
            this.$http.get('/api/things').then(function (response) {
                _this.awesomeThings = response.data;
            });
        };
        return MainController;
    }());
    angular.module('openVillageApp')
        .component('main', {
        templateUrl: 'app/main/main.html',
        controller: MainController
    });
})();
//# sourceMappingURL=main.controller.js.map