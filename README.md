## Description

Based on [Nest](https://github.com/nestjs/nest) the cow-api helps you  providing a general overview for you monthly/general statements.

You can access more information on `/api` resource with your browser.

## Installation

```bash
$ npm install
```

## Setting the .env config

You need to create the `.env` file to provide to the application the correct connection and rules.

You can use the example bellow:

```yml
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
All the information provided on <b>.env</b> file is being validated with [Joi](https://docs.nestjs.com/techniques/configuration#schema-validation).

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

## Docker 

The cow-api holds a Dockerfile for a new docker image build.

```bash
# Choose a unique tag name for your image docker compose will use it. 
# to create a new image run
docker build . --tag cow-api-dev
```
### Compose

The project also holds a <b>docker-compose</b> file.

For the compose file take a look on the <b>cow-api-dev -> image -> value</b>.

```yml
# ---------
services:
    # ---------
    cow-api-dev:
      image: cow-api-dev # <- this value requires to be equal of image's name.
    # ---------
  # ---------
# ---------
```

```bash
# to run all the necessary components for the app run
docker-compose up
```
Note: the compose file mention environment variables, you can use the .env file to fill those.