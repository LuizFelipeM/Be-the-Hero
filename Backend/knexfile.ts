// Update with your config settings.
import 'ts-node/register';

export const development = {
  client: 'postgresql',
  connection: {
    user: 'knex',
    password: 'knex',
    database: 'be_the_hero',
    filename: './src/database/dev.postgresql'
  },
  migrations: {
    directory: './src/database/migrations'
  }
};
export const test = {
  client: 'postgresql',
  connection: {
    user: 'knex',
    password: 'knex',
    database: 'be_the_hero',
    filename: './src/database/test.postgresql'
  },
  migrations: {
    directory: './src/database/migrations'
  }
};
export const staging = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
export const production = {
  client: 'postgresql',
  connection: {
    database: 'my_db',
    user: 'username',
    password: 'password'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
