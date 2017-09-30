'use strict';

angular.module('openvillage')
    .service('projectsService', function ($http, $q) {

        var SERVER_URL = 'http://localhost:8080';

        this.getList = function () {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/projects/list')
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.addNewProject = function (project) {
            return $q(function (resolve, reject) {
                $http.post(SERVER_URL + '/auth/api/projects/add', project)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.deleteProject = function (projectName) {
            return $q(function (resolve, reject) {
                $http.delete(SERVER_URL + '/auth/api/projects/delete/' + projectName)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.getProjectDetails = function (projectName) {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/projects/' + projectName + '/details')
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.getProjectDetailsWithBranches = function (projectName) {
            return $q(function (resolve, reject) {
                $http.get(SERVER_URL + '/auth/api/projects/' + projectName + '/branches')
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.editProject = function (project) {
            return $q(function (resolve, reject) {
                $http.put(SERVER_URL + '/auth/api/projects/edit', project)
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

        this.setAsAutoScript = function (projectName, scriptName) {
            return $q(function (resolve, reject) {
                $http.put(SERVER_URL + '/auth/api/projects/' + projectName + '/autoScript', {scriptName: scriptName})
                    .success(function (data) {
                        resolve(data);
                    })
                    .error(function (err) {
                        reject(err);
                    });
            });
        };

    });