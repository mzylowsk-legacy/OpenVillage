'use strict';

angular.module('openvillage')
    .controller('ProjectDetailsCtrl', function ($scope, usersService, projectsService, scriptsService, buildsService,
                                                $window, $stateParams, SweetAlert, $state, DTOptionsBuilder,
                                                DTColumnDefBuilder, $interval, messages) {

        $scope.userName = $window.sessionStorage.sessionUsername;
        $scope.projectName = $stateParams.name;
        $scope.projectVersion = 'master';
        $scope.versions = [{name:'master'}];
        $scope.projectStatusDetails = '';
        var buildWatcher = null;
        $scope.buildName = null;
        $scope.isProjectBuilding = false;
        $scope.projectStatus = -1; // 2-during,0-ok,1-error
        $scope.selectedTasks = [];
        $scope.selectDays = [
            {name: 'Monday', value: 1, selected: false},
            {name: 'Tuesday', value: 2, selected: false},
            {name: 'Wednesday', value: 3, selected: false},
            {name: 'Thursday', value: 4, selected: false},
            {name: 'Friday', value: 5, selected: false},
            {name: 'Saturday', value: 6, selected: false},
            {name: 'Sunday', value: 7, selected: false}];
        $scope.cronTime = new Date();

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('bFilter', false)
            .withOption('order', [1, 'asc'])
            .withOption('lengthMenu', [2, 5, 10, 20, 50])
            .withOption('pageLength', 5);

        $scope.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(2).notSortable()
        ];

        $scope.dtOptionsPublicScripts = DTOptionsBuilder.newOptions()
            .withOption('bFilter', false)
            .withOption('order', [0, 'asc'])
            .withOption('lengthMenu', [2, 5, 10, 20, 50])
            .withOption('pageLength', 5);

        $scope.dtColumnDefsPublicScripts = [
            DTColumnDefBuilder.newColumnDef(1).notSortable()
        ];

        $scope.getProjectDetails = function() {
            projectsService.getProjectDetails($scope.projectName)
                .then(function (res) {
                    $scope.projectDetails = res;
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.GET_PROJECT_DETAILS);
                });
        };

        $scope.getProjectDetailsWithBranches = function() {
            projectsService.getProjectDetailsWithBranches($scope.projectName)
                .then(function (res) {
                    $scope.projectDetails = res;
                }, function (err) {
                    if (err.branchError) {
                        SweetAlert.swal(messages.info.GET_BRANCHES);
                        $scope.projectDetails = err;
                    } else {
                        SweetAlert.swal(messages.errors.GET_PROJECT_DETAILS_WITH_BRANCHES);
                    }
                });
        };

        $scope.getScriptsList = function() {
            scriptsService.getList($scope.projectName)
                .then(function(res) {
                    $scope.scripts = res.scripts;
                    scriptsService.getDefaultList()
                        .then(function(res) {
                            $scope.scriptsPublic = res.scripts;
                        }, function (err) {
                            console.log(err);
                            SweetAlert.swal(messages.errors.GET_SCRIPTS);
                        });

                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.GET_SCRIPTS);
                });
        };

        $scope.deleteScript = function(projectName, scriptName, index) {
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover this script!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: false
            }, function(isConfirm) {
                if(!isConfirm) {
                    return;
                }

                scriptsService.deleteScript(projectName, scriptName)
                    .then(function() {
                        $scope.scripts.splice(index, 1);
                        SweetAlert.swal(messages.success.DELETION_SCRIPT);
                    }, function (err) {
                        console.log(err);
                        SweetAlert.swal(messages.errors.DELETION_SCRIPT);
                    });
            });
        };

        $scope.getBuildDetails = function() {
            buildsService.getBuildByName($scope.buildName)
                .then(function (res) {
                    $scope.projectStatusDetails = 'Status code: '+ res.status_code;
                    var currentStep = '';
                    var i=0;
                    for(i=0; i<res.steps.length; i++) {
                        var step = res.steps[i];

                        currentStep = ' Current step: (' + step.order + ') ' + step.name;
                        if(step.status_code !== 0 && step.status_code !== 1) {
                            break;
                        }
                    }

                    $scope.projectStatusDetails += currentStep;
                    $scope.setBuildProgressBar(i, res.steps.length);

                    if(res.status_code === 0) {
                        $scope.stopWatchingBuild();
                        $scope.projectStatus = 0;
                        $scope.setBuildProgressBarSuccess();
                        return;
                    }
                    else if(res.status_code === 1) {
                        $scope.stopWatchingBuild();
                        $scope.projectStatus = 1;
                        $scope.setBuildProgressBarFailure();
                        return;
                    }

                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.GET_BUILD_DETAILS);
                });
        };

        $scope.runBuild = function() {
            $scope.isProjectBuilding = true;
            $scope.setBuildProgressBar(0, 1);
            $scope.projectStatus = 2;
            $scope.setBuildProgressBarActive();

            var body = {
                'projectVersion': $scope.projectVersion,
                'projectName': $scope.projectName,
                'steps': $scope.selectedTasks
            };

            buildsService.runBuild(body)
                .then(function (res) {
                    $scope.buildName = res.buildName;
                    buildWatcher = $interval(function() {
                        $scope.getBuildDetails();
                    }, 1000);
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.BUILD_WAS_NOT_RUNNING);
                });
        };

        $scope.setCronJob = function () {
            var body = {
                'projectVersion': $scope.projectVersion,
                'projectName': $scope.projectName,
                'steps': $scope.selectedTasks,
                'days': $scope.getCheckedDays(),
                'time': $scope.cronTime
            };

            buildsService.setCronJob(body)
                .then(function (res) {
                    console.log(res);
                    SweetAlert.swal(messages.success.CRON_BUILD_SAVED);
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.CRON_NOT_SET_CORRECTLY);
                });
        };

        $scope.updateCurrentTime = function () {
            $interval(function() {
                $scope.cronTime = new Date();
            }, 1000);
        };

        $scope.getCheckedDays = function () {
            return $scope.selectDays.filter(function (day) {
                return day.selected;
            });
        };

        $scope.stopWatchingBuild = function() {
            if (angular.isDefined(buildWatcher)) {
                $interval.cancel(buildWatcher);
                buildWatcher = undefined;
                $scope.isProjectBuilding = false;
            }
        };

        $scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            $scope.stopWatchingBuild();
        });

        $scope.setBuildProgressBar = function(currentStep, maxStep) {
            var value = currentStep / maxStep * 100;
          $('#buildInnerProgressBar').css('width', value+'%');
        };

        $scope.setBuildProgressBarSuccess = function() {
            $('#buildInnerProgressBar').removeClass('progress-bar-danger');
            $('#buildInnerProgressBar').removeClass('progress-bar-info');
            $('#buildProgressBar').removeClass('active');
        };

        $scope.setBuildProgressBarFailure = function() {
            $('#buildInnerProgressBar').removeClass('progress-bar-info');
            $('#buildInnerProgressBar').addClass('progress-bar-danger');
            $('#buildProgressBar').removeClass('active');
        };

        $scope.setBuildProgressBarActive = function() {
            $('#buildInnerProgressBar').removeClass('progress-bar-danger');
            $('#buildInnerProgressBar').addClass('progress-bar-info');
            $('#buildProgressBar').addClass('active');
        };

        $scope.sortableOptions = {
            connectWith: '.connectList'
        };

        $scope.setAsAutoScript = function(scriptName) {
            projectsService.setAsAutoScript($scope.projectName, scriptName)
                .then(function () {
                    $window.location.reload();
                });
        };

        $scope.queueTask = function(taskName, isPublic) {
            SweetAlert.swal({
                title: taskName,
                text: 'Add arguments if required:',
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: false,
                inputPlaceholder: 'Arguments go here'
            }, function(inputValue) {
                if (inputValue === false) {
                    return false;
                }

                var newTask = {
                    'scriptName': taskName,
                    'public': isPublic,
                    'args': inputValue
                };

                $scope.selectedTasks.push(newTask);
                SweetAlert.swal(messages.success.STEP_ADDED);
            });
        };

        $scope.removeTask = function(pos) {
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'You will remove this task from your build steps',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: false
            }, function(isConfirm) {
                if(!isConfirm) {
                    return;
                }

                $scope.selectedTasks.splice(pos, 1);
                SweetAlert.swal(messages.success.STEP_DELETED);
            });
        };

        $scope.getCronJobs = function () {
            buildsService.getCronJobs($scope.projectName)
                .then(function (res) {
                    res.forEach(function (cronJob) {
                        cronJob.data.days = cronJob.data.days.map(function (day) {
                            return day.name;
                        });
                        cronJob.data.time = new Date(cronJob.data.time).toTimeString();
                    });
                    $scope.cronJobs = res;
                }, function (err) {
                    console.log(err);
                    SweetAlert.swal(messages.errors.GET_CRON_JOB_FAILED);
                });
        };

        $scope.deleteCronJob = function (cronName) {
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'You will remove this cron job',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Yes, delete it!',
                closeOnConfirm: false
            }, function(isConfirm) {
                if(!isConfirm) {
                    return;
                }

                buildsService.deleteCronJob(cronName)
                    .then(function (res) {
                        $scope.cronJobs = $scope.cronJobs.filter(function (cronJob) {
                            return cronJob.name !== cronName;
                        });
                        console.log('Cron job deleted with status: ' + res.status);
                        SweetAlert.swal(messages.success.CRON_JOB_DELETED);
                    }, function (err) {
                        console.log(err);
                        SweetAlert.swal(messages.errors.DELETION_JOB_FAILED);
                    });
            });
        };

    });