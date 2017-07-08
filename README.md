# Help Reactor

A help desk application used by Hack Reactor students.

## Legacy Team
  - [Pablo Boserman](https://github.com/pboserman)
  - [Kai Mashima](https://github.com/kai-mashima)
  - [Jeff Shindelus](https://github.com/shindelus)

## Original Team
  - [David Gould](https://github.com/davidgould112)
  - [David Vassett](https://github.com/DavidVassett)
  - [Eric Mai](https://github.com/enmai1988)
  - [Jacob Penney](https://github.com/OneCent01)

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Setup Database](#setup-redis)
    3. [Setup Redis](#setup-redis)
    4. [Start Node Server](#start-node-server)
    5. [Start Webpack](#start-webpack)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)

## Requirements

- Node 6.11.x
- Postgresql 9.1.x
- Redis 3.2.x

## Development

### Installing Dependencies

```sh
npm install
```

### Setup Database

#### Create Database

```sh
npm run db-create
```

#### Start Database

```sh
npm run db-start
```

#### Migrate and Seed Database

The below script will drop, create, and seed the database tables with sample data found in `database/sampleData.js`.

```sh
npm run db-migrate
```

#### Access Database

To access your database from within terminal use the below command.

```sh
psql helpReactor
```

Once you are connected to the database you can you the below query to update a users role.

```sh
UPDATE users SET role='admin' WHERE id=1;
```

#### Create Database

```sh
npm run db-create
```

### Setup Redis

Redis is an open source, in-memory data structure store, used as a database, cache and message broker.

#### Install Redis

```sh
brew install redis
```

#### Start Redis

```sh
redis-server
```

### Start Node Server

```sh
npm run server-dev
```

### Start Webpack

```sh
npm run react-dev
```

### Roadmap

View the project roadmap [here](LINK_TO_DOC)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
