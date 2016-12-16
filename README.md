# OpenVillage
Light and simple webservice tool for management of GitHub projects builds.

The main functions:
* multi user platform,
* GitHub repositories cloning/checkouts,
* running scripts for building and testing software.

## Prerequisites
Prepare Linux dev machine, for example Ubuntu.
For running webservice neccessary dependencies should be installed. Follow the commands below:
* Refresh system packages list: `sudo apt-get update`.
* Install python pip: `sudo apt install python-pip`.
* Install ansible in 2.2.0.0 version: `sudo pip install ansible==2.2.0.0`.
* Go to [ansible-deployment](https://github.com/GroupProjectWETI/OpenVillage/tree/master/prepare_env/ansible-deployment) directory and run ansible script for installing neccessary dependencies: `./run.sh --ask-sudo-pass`.
