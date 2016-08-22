# OpenVillage
Software for building and testing projects.

### Prerequisites
* Install ansible:
```
$ sudo apt-get install software-properties-common
$ sudo apt-add-repository ppa:ansible/ansible
$ sudo apt-get update
$ sudo apt-get install ansible
```
* Run ansible script for installing all necessary system dependencies:
```
cd prepare_env
./run.sh -u <username> -k --ask-sudo-pass
```
* Run `node -v `. If you can see version of this component, you can go to the next step, else you should run `sudo ln -s /usr/bin/nodejs /usr/sbin/node` command.
* Enter into the main directory of the project and run following commands:
  * `bower install`
  * `npm install`
* Build project using `grunt` command.

### Development
For running:
* development mode run `grunt serve` command. After changes in source code you will be able to see applying your changes in real-time;
* production mode run `grunt serve:dist`. Now your changes won't be applied to your running code. In this mode you can see how looks your compiled version of source.
* `grunt test` - runs tests.

If you want to check your database content you can run mongo client `mongo`, select your database and run some queries.
