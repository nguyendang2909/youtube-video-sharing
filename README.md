## Introduction
Youtube Video Sharing App

## Prerequisites
docker
docker-compose
Make sure ports 3000, 8330, 5432 are free

## Installation & Configuration
```
docker-compose -f deployment.yml up -d
```

## Running the Application
```
docker-compose -f deployment.yml up -d
```

http://localhost:3000

## Test
UI
```
cd api
yarn install
yarn test
yarn test:coverage
```
API
```
cd api
yarn install
yarn test
yarn test:coverage
```

## Test
