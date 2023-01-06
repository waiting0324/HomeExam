import Sequelize from 'sequelize';
import {
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
} from '../configs/config';
import UserModel from '../models/user.model';

/**
 * 配置 ORM 框架
 */
const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  timezone: '+08:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true, // 將屬性映射為下划線命名法
    freezeTableName: true, // 不將表名自動轉換成複數形式
  },
  // 連接池配置
  pool: {
    min: 0,
    max: 5,
  },
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

export default DB;
