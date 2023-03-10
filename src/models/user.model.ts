import {Sequelize, DataTypes, Model} from 'sequelize';
import {User} from '../interfaces/users.interfaces';

/**
 * 通過實現方式定義 Model，這樣後續使用可以直接通過 User 來操作
 */
class UserModel extends Model implements User {
  public id: number;
  public email: string;
  public password: string;
  public name: string;
  public verifiedCode: string;
  public isVerified: boolean;
  public signUpTime: Date;
  public lastVisitedTime: Date;
  public loggedInTimes: number;

  // 將時間戳標記為只讀
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * 構建數據庫的 UserModel
 * @param {Sequelize} sequelize ORM 框架對象
 * @return {UserModel} 用戶模型
 */
export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      verifiedCode: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      isVerified: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      signUpTime: {
        allowNull: false,
        type: DataTypes.DATE(),
      },
      lastVisitedTime: {
        allowNull: false,
        type: DataTypes.DATE(),
      },
      loggedInTimes: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'users',
      sequelize,
    },
  );

  return UserModel;
}
