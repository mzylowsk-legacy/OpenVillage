# OpenVillage
Software for building and testing projects.

### Prerequisites
* Install necessary components:
``` sudo apt-get install mongodb nodejs npm mongodb-server mongodb-clients ```.
* Run mongo service using ```mongod```.
* Run ```node -v ```. If you can see version of this component, you can go to the next step, else you should run ```sudo ln -s /usr/bin/nodejs /usr/sbin/node``` command.
* Clone project repository: ``` git clone https://github.com/GroupProjectWETI/OpenVillage.git ``` (https access) or ```git clone git@github.com:GroupProjectWETI/OpenVillage.git``` (ssh access).
* Enter into projects catalog and run following commnands:
  * ```npm -g install grunt-cli```
  * ```sudo npm -g install bower```
  * ```bower install```
  * ```npm install```
* Build project using ```grunt``` command. 
* Install other necessary dependencies using `prepare_environment.sh` script. If everything is good, you can use this software or develop it.

### Development
For running:
* development mode run ```grunt serve``` command. After changes in source code you will be able to see applying your changes in real-time; 
* production mode run ```grunt serve:dist```. Now your changes won't be applied to your running code. In this mode you can see how looks your compiled version of source.
* ```grunt test``` - runs tests.

If you want to check your database content you can run mongo client ```mongo```, select your database and run some queries.
