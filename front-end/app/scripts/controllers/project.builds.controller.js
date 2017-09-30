'use strict';

angular.module('openvillage')
    .controller('ProjectBuildsCtrl', function ($scope, usersService, projectsService, scriptsService, buildsService,
                                                $window, $stateParams, $location, $anchorScroll, SweetAlert, $state, DTOptionsBuilder,
                                                DTColumnDefBuilder) {

        $scope.userName = $window.sessionStorage.sessionUsername;
        $scope.projectName = $stateParams.name;

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bFilter', false)
            .withOption('order', [1, 'desc'])
            .withOption('lengthMenu', [2, 5, 10, 20, 50])
            .withOption('pageLength', 5);

        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0).notSortable(),
            DTColumnDefBuilder.newColumnDef(4).notSortable()
        ];

        $scope.formatDateTime = function(datetime) {
            moment.locale(navigator.language);
            return moment(datetime).format('L LTS');
        };

        $scope.getBuildsList = function() {
            buildsService.getBuildsByProjectName($scope.projectName)
                .then(function(res) {
                    $scope.buildsList = res;
                }, function (err) {
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.getBuildDetails = function(buildName) {
            buildsService.getBuildByName(buildName)
                .then(function (res) {
                    $scope.buildDetails = res;
                }, function (err) {
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.getDiff = function(buildName) {
            buildsService.getDiff(buildName)
                .then(function (res) {
                    $scope.diff = 'No code changes';

                    if (res && (res.toString().length > 1)) {
                        $scope.diff = res.toString();
                    }

                    $scope.showDiff = 1;

                    $location.hash('codeChanges');
                    $location.hash('codeChanges');
                    $anchorScroll();

                }, function (err) {
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        $scope.getZipPackage = function(commitSHA) {
            buildsService.getZipPackage($scope.projectName, commitSHA)
                .then(function (res) {
                    SweetAlert.swal({
                        title: 'Zip address generated',
                        text: 'Do you want to download a package?',
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonText: 'Download'
                    }, function (isConfirm) {
                        if (isConfirm) {
                            console.log('Zip package download confirmed');
                            window.open(res, '_blank');
                            window.focus();
                        } else {
                            console.log('Zip package download cancelled');
                        }
                    });
                }, function (err) {
                    SweetAlert.swal({
                        title: 'Error occurred',
                        type: 'error',
                        text: JSON.stringify(err)
                    });
                });
        };

        if($state.params.buildName) {
            $scope.getBuildDetails($state.params.buildName);
        }

        $scope.editorOptions =  {
            lineNumbers: true,
            matchBrackets: true,
            styleActiveLine: true,
            readOnly: true
        };

    });