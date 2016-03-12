'use strict';

angular.module('ProjectsBuilderPlatformApp')
  .service('testService', function ($http, $q) {

    this.testService = function() {
      return $q(function(resolve, reject) {
        $http.get('enter-url-to-endpoint')
          .success(function(data) {
            resolve(data);
          })
          .error(function(error) {
            reject(error);
          });
      });
    };

  });
