#!/bin/bash

# Check if Docker is installed and running
check_docker() {
    if ! command -v docker &> /dev/null; then
        handle_error "Docker is not installed. Please install Docker first."
    fi
    
    if ! docker info &> /dev/null; then
        handle_error "Docker daemon is not running. Please start Docker first."
    fi
}

# Function to handle errors
handle_error() {
    echo "Error: $1"
    exit 1
}

# Function to clean up containers
cleanup() {
    echo "Cleaning up containers..."
    docker rm -f wwwdnet-dev-container wwwdnet-prod-container 2>/dev/null
}

# Function to launch the development Docker container
launch_dev() {
    echo "Building and launching development container..."
    
    # Build the container
    if ! docker build -f docker/Dockerfile.dev -t wwwdnet-dev .; then
        handle_error "Failed to build development container"
    fi
    
    # Run the container with volume mounting for hot-reloading
    if ! docker run -it --rm \
        -p 3000:3000 \
        -v "$(pwd)/www:/nuxt_app" \
        -e NODE_ENV=development \
        --name wwwdnet-dev-container \
        wwwdnet-dev; then
        handle_error "Failed to run development container"
    fi
}

# Function to launch the production Docker container
launch_prod() {
    echo "Building and launching production container..."
    
    # Build the container
    if ! docker build -f docker/Dockerfile.prod -t wwwdnet-prod .; then
        handle_error "Failed to build production container"
    fi
    
    # Run the container
    if ! docker run -it --rm \
        -p 3000:3000 \
        -e NODE_ENV=production \
        --name wwwdnet-prod-container \
        wwwdnet-prod; then
        handle_error "Failed to run production container"
    fi
}

# Set up trap for cleanup on script exit
trap cleanup EXIT

# Check Docker installation and status
check_docker

# Check the argument and call the appropriate function
if [ "$1" == "-dev" ]; then
    launch_dev
elif [ "$1" == "-prod" ]; then
    launch_prod
else
    echo "Usage: $0 [-dev|-prod]"
    echo "  -dev   Launch development container"
    echo "  -prod  Launch production container"
    exit 1
fi
