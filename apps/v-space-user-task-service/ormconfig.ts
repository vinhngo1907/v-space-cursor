import "dotenv/config"
import { DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: process.env.NODE_ENV === 'production' ? false : true,
  entities: ['src/datasource/postgresql/entity/**/*.ts'],
  migrations: ['src/datasource/postgresql/migration/**/*.ts'],
  subscribers: ['src/datasource/postgresql/subscriber/**/*.ts'],
};

export default options;
