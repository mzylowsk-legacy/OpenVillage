'use strict';

angular.module('openvillage')
    .controller('ScriptsCtrl', function ($scope, usersService, scriptsService, $window, SweetAlert, $state, $stateParams) {

        $scope.userName = $window.sessionStorage.sessionUsername;
        $scope.projectName = $stateParams.name;

        $scope.script = {
            name: $stateParams.scriptName,
            code: ''
        };

        $scope.addScript = function (script) {
            if(script.code.length <= 1) {
                SweetAlert.swal({
                    title: 'Error occurred',
                    type: 'error',
                    text: 'Code cannot be empty'
                });
                return;
            }

            scriptsService.addNewScript(script)
                .then(function () {
                    SweetAlert.swal({
                        title: 'Script created',
                        type: 'success',
                        confirmButtonText: 'Back to list',
                    }, function() {
                        $state.go('index.projects.details', {name: $scope.projectName});
                    });
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.getScriptsList = function() {
            scriptsService.getList()
                .then(function(res) {
                    $scope.scripts = res;
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.loadScriptData = function() {
            scriptsService.getScriptContent($scope.script.name)
                .then(function(res) {
                    $scope.script.code = res;
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.editScript = function (script) {
            if(script.code.length <= 1) {
                SweetAlert.swal({
                    title: 'Error occurred',
                    type: 'error',
                    text: 'Code cannot be empty'
                });
                return;
            }

            scriptsService.editScript(script)
                .then(function() {
                    SweetAlert.swal({
                        title: 'Script edited',
                        type: 'success',
                        confirmButtonText: 'Back to list',
                    }, function() {
                        $state.go('index.projects.details', {'name': $scope.projectName});
                    });
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.editorOptions =  {
            lineNumbers: true,
            matchBrackets: true,
            styleActiveLine: true
        };



    });