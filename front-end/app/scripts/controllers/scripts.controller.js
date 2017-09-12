'use strict';

angular.module('openvillage')
    .controller('ScriptsCtrl', function ($scope, usersService, scriptsService, $window, SweetAlert, $state, $stateParams, messages) {

        $scope.userName = $window.sessionStorage.sessionUsername;
        $scope.projectName = $stateParams.name;

        $scope.script = {
            name: $stateParams.scriptName,
            code: ''
        };

        $scope.addScript = function (script) {
            if(script.code.length <= 1) {
                SweetAlert.swal(messages.errors.EMPTY_CODE);
                return;
            }

            scriptsService.addNewScript(script, $scope.projectName)
                .then(function () {
                    SweetAlert.swal({
                        title: 'Script created',
                        type: 'success',
                        confirmButtonText: 'Back to list'
                    }, function() {
                        $state.go('index.projects.details', {name: $scope.projectName});
                    });
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.ADDING_NEW_SCRIPT_FAILED);
                });
        };

        $scope.getScriptsList = function() {
            scriptsService.getList($scope.projectName)
                .then(function(res) {
                    $scope.scripts = res;
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.GET_SCRIPTS);
                });
        };

        $scope.loadScriptData = function() {
            scriptsService.getScriptContent($scope.script.name, $scope.projectName)
                .then(function(res) {
                    $scope.script.code = res;
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.GET_SCRIPT_DATA_FAILED);
                });
        };

        $scope.editScript = function (projectName, script) {
            if(script.code.length <= 1) {
                SweetAlert.swal(messages.errors.EMPTY_CODE);
                return;
            }

            scriptsService.editScript(projectName, script)
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
                    SweetAlert.swal(messages.errors.SAVING_CHANGES_FAILED);
                });
        };

        $scope.editorOptions =  {
            lineNumbers: true,
            matchBrackets: true,
            styleActiveLine: true
        };



    });