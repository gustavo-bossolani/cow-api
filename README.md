## Description

Based on [Nest](https://github.com/nestjs/nest) the cow-api helps you  providing a general overview for you monthly/general statements.

You can access more information on `/api` resource with your browser.

## Installation

```bash
$ npm install
```

## Setting the .env config

You need to change the `.env` values to provide to the application the correct connection and rules.

The application already have a configured `.env` file with mock and local information, if you want to change some value is up to you. You can use the example bellow:

```enviroment
# ENV
ENV=dev

# HOST
HOST_PORT=3000

# DATABASE
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=docker
DATABASE_PASSWORD=docker
DATABASE_DATABASE=cow

# JWT
JWT_SECRET=P3ZANUFqZjtCcV50JFhSZQ==
JWT_EXPIRESIN=3600

```
All the information provided on `.env` file is being validated with [Joi](https://docs.nestjs.com/techniques/configuration#schema-validation).

## Running the application


```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```bash
# run the migrations and build the database
$ migration:run

# revert migrations one by one
$ migration:revert

# create a new migration
$ migration:create [name]

# drop the database
$ db:revert
```