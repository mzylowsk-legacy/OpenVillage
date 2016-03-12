'use strict';

angular.module('ProjectsBuilderPlatformApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home.html',
        controller: 'MainCtrl'
      });
  });
