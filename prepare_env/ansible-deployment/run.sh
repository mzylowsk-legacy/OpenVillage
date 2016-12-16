#!/bin/bash -x

# Instructions for installing nsible v2 modele:
# http://docs.ansible.com/ansible/intro_installation.html#latest-releases-via-apt-ubuntu
#
# For running script => ./run.sh -u <username> -k --ask-sudo-pass
#

ansible-playbook site.yml -i inventory.yml $@

RET_CODE=$?
echo "Exit code: $RET_CODE"
exit $RET_CODE
