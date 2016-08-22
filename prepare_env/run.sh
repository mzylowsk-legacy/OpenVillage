#!/bin/bash -x
export ANSIBLE_SSH_CONTROL_PATH='%(directory)s/%%h-%%r'
export ANSIBLE_HOST_KEY_CHECKING=False

ansible-playbook site.yml -i inventory.yml $@

RET_CODE=$?
echo "Exit code: $RET_CODE"
exit $RET_CODE
