#!/bin/sh

# Run this script with root priviliges

#prerequisites

# mongodb
echo "INSTALLING MONGODB..."

apt-get install -y  mongodb curl mongodb-server mongodb-clients

mongod

# nodejs
echo "INSTALLING NODEJS"

curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -

apt-get install -y nodejs

apt-get install -y npm

npm -g install grunt-cli

# bower
echo "INSTALLING BOWER"

npm -g install bower

# python
echo "INSTALLING PYTHON PREREQUISITES"

apt-get install -y python-dev libffi-dev libssl-dev

curl 'https://bootstrap.pypa.io/ez_setup.py' -o - | sudo -E python

pip install --upgrade tox

# java
echo "INSTALLING JAVA PREREQUISITES"

add-apt-repository -y ppa:webupd8team/java

apt-get update

apt-get install -y oracle-java8-installer oracle-java8-set-default

apt-get install -y maven

