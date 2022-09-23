# server-nest
API server built with the [Nest JS](https://github.com/nestjs/nest) framework.


## Installation
```sh
npm install
```


## Running the app
Development mode (watch files and perform live reload)
```sh
npm run serve
```

Build and run in production mode
```sh
# Build app first before running the app
npm run build

# Run the build output
npm run start
```

Debug mode
```sh
npm run start:debug
```


## Deployment
Build docker image
```sh
npm run docker:build
```

Run docker image
```sh
npm run docker:run
```

Run docker image and attach it to current shell
```sh
npm run docker:run-attached
```


## Test
```sh
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```