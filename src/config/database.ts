import config from 'config';
import { Dialect, Sequelize } from 'sequelize';

interface DbConfig {
  database: string;
  username: string;
  password: string;
  dialect: Dialect;
  storage: string;
  logging: boolean;
}

const dbConfig: DbConfig = config.get('database');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    storage: dbConfig.storage,
    logging: dbConfig.logging,
  }
);

export default sequelize;
