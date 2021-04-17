import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

const connectionOptions: ConnectionOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsRun: false,
  migrations: [join(__dirname, 'migrations/**/*.{ts,js}')],
  cli: {
    migrationsDir: 'migrations',
  },
  migrationsTableName: 'db_migrations',
};

export default connectionOptions;
