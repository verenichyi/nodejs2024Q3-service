import { DataSourceOptions } from 'typeorm';

import 'dotenv/config';

import { User } from '../entities/user.entity';
import { Artist } from '../entities/artist.entity';
import { Album } from '../entities/album.entity';
import { Track } from '../entities/track.entity';
import { Migration1711301298546 } from './migrations/1711301298546-Migration';

const { DB_HOST, DB_HOST_DOCKER, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
  process.env;
const url = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST_DOCKER}:${DB_PORT}/${DB_NAME}`;

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  url,
  entities: [User, Artist, Album, Track],
  synchronize: false,
  logging: true,
  migrations: [Migration1711301298546],
  migrationsRun: true,
};
