var  Q = require('q'),
     GitHub = require("octocat");

module.exports.findAllBranchesForProject = function (project) {
    return Q.Promise(function (resolve, reject) {
        var client;
        if(project.isPrivate == true) {
            client = new GitHub({
                username: project.username,
                password: project.password
            });
        }
        else{
            client = new GitHub();
        }
        var repoName = project.url.replace('https://github.com/', '');
        const repo = client.repo(repoName);
        repo.branches().then(function (Page) {

            var all = [];
            var nextP = Page;
            all = all.concat(nextP.list);
            while(Page.hasNext()){
                nextP = nextP.next();
                all = all.concat(nextP.list);
            }
            project.versions = all;

            resolve(project);

        }).catch(function (err) {
            reject(err);
        });
    });
};