'use strict';

var Q = require('q'),
    GitHub = require("octocat"),
    securityTools = require('../lib/utils/security-tools');

var findAllBranchesForProject = function (project) {
    return Q.Promise(function (resolve, reject) {
        var client;
        if(project.isPrivate === true) {
            client = new GitHub({
                username: project.username,
                password: securityTools.decrypt(project.password)
            });
        }
        else{
            client = new GitHub();
        }
        var repoName = project.url.replace('https://github.com/', '');
        const repo = client.repo(repoName);
        repo.branches().then(function (page) {

            var all = [];
            var nextPage = page;
            all = all.concat(nextPage.list);
            while(page.hasNext()){
                nextPage = nextPage.next();
                all = all.concat(nextPage.list);
            }
            project.versions = all;

            resolve(project);

        }).catch(function (err) {
            reject(err);
        });
    });
};

module.exports = {
    findAllBranchesForProject: findAllBranchesForProject
}