#!/bin/bash

# Function to launch the development Docker container
launch_dev() {
    echo "Building and launching development container..."
    docker build -f docker/Dockerfile.dev -t wwwdnet-dev .
    docker run -it --rm -p 3000:3000 --name wwwdnet-dev-container wwwdnet-dev
}

# Function to launch the production Docker container
launch_prod() {
    echo "Building and launching production container..."
    docker build -f docker/Dockerfile.prod -t wwwdnet-prod .
    docker run -it --rm -p 3000:3000 --name wwwdnet-prod-container wwwdnet-prod
}

# Check the argument and call the appropriate function
if [ "$1" == "-dev" ]; then
    launch_dev
elif [ "$1" == "-prod" ]; then
    launch_prod
else
    echo "Invalid argument. Please use '-dev' for development or '-prod' for production."
    exit 1
fi
