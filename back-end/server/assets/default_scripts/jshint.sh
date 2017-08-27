#!/usr/bin/env bash

FILES=`find . -name "*.js"`

if [ "$FILES" = "" ]; then
  exit 0
fi

pass=true
for file in ${FILES}; do
  echo "Validating ${file} file..."
  result=$(jshint ${file})
  if ["$result" != "" ]; then
    echo "$result"
    pass=false
  fi
done

if ! $pass; then
  exit 1
else
  exit 0
fi
