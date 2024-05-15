#!/bin/zsh

tsc

if [ $? -eq 0 ] ; then
    echo "Typescript compilation completed successfully."
else
    echo "Typescrip compilation failed. Please check the error messages."
    exit 1
fi

docker compose build

if [ $? -eq 0 ]; then
  echo "Docker Compose build completed successfully."
else
  echo "Docker Compose build failed. Please check the error messages above."
  exit 1
fi
