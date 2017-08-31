#!/usr/bin/env bash

FILES=`find . -name "*.py"`

if [ "$FILES" = "" ]; then
  exit 0
fi

for file in ${FILES}; do
  result=$(pylint ${file})
  echo "$result"
done

exit 0
