/**
 * INSPINIA - Responsive Admin Theme
 *
 */

/**
 * MainCtrl - controller
 */
'use strict';

function MainCtrl($window) {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    this.userName = $window.sessionStorage.sessionUsername;
}


angular
    .module('openvillage')
    .controller('MainCtrl', MainCtrl);