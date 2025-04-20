# [www.daroach.net](https://www.daroach.net) source code

Dear reader, welcome to my piece of our digial & physical world. Feel free to contibute, distribute, or modify as you wish **<3**.

## Technology Stack

**Frontend**

* Vue 3
* Nuxt 3
* TailwindCSS

**Backend**

* Docker
* Archlinux

## Developer Guide

### System Setup

```sh
# Install Node Version Manager
yay nvm

# Install nodejs stable
nvm install --lts
```

### Running Dev Server

```sh
# Enter the web root directory
cd www

# Install nodejs packages
npm install

# Run dev server on local port
npm run dev
```

## Docker Deployment

This application is designed to be deployed using Docker in production environments. The Docker setup is optimized for production use with security features and health checks.

### Features
- Production-optimized builds
- Security features (non-root user)
- Health checks
- Environment variable support

### Using with Docker Compose

Include this service in your docker-compose.yml:

```yaml
version: '3.8'

services:
  # Your other services...
  
  www:
    build:
      context: ../www.daroach.net
      dockerfile: docker/Dockerfile.prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/"]
      interval: 30s
      timeout: 3s
      retries: 3
    networks:
      - your-network

networks:
  your-network:
    driver: bridge
```

### Requirements
- Docker installed and running
- Any environment that can run Docker containers

### Notes
- Uses multi-stage builds for smaller images
- Implements non-root user for security
- Includes health checks for production monitoring
