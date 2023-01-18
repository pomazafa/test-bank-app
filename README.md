## Description

It is necessary to implement modules for the user management system.
Implement REST API for banking transactions.

## Requirements

1. Account creation
2. Account replenishment
3. Getting the current balance
4. Withdrawal
5. Account blocking
6. Transaction history
7. Limitation on the number of requests for a current account per day (without additional tables)
8. Checking where the requests come from and denying if the request is from an unknown source

## Installation

```
$ git clone https://github.com/pomazafa/test-bank-app.git

$ cd test-bank-app

$ cp .env.dev .env

$ npm install
```

## Running the app

```bash

$ cd docker

$ docker-compose --env-file .env.dev up -d

$ cd ..

$ npm run start:dev
```

## Swagger

You can see Swagger documentation by following the <a href="http://localhost:3000/swagger">link</a> while app is running
