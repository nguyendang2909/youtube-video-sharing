## Introduction
Youtube Video Sharing App

## Prerequisites
docker
docker-compose

## Installation & Configuration
Make sure you have docker and docker-compose installed
Make sure ports 3000, 8330, 5432 are free
```
docker-compose -f deployment.yml up -d 
```

## Running the Application
```
http://localhost:3000
```

## Test
# UI
```
cd api
yarn install
yarn test
yarn test:coverage
```
# API
```
cd api
yarn install
yarn test
yarn test:coverage
```

## Test
