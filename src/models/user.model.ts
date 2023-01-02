import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '../interfaces/users.interfaces';


/**
 * 通過實現方式定義 Model，這樣後續使用可以直接通過 User 來操作
 */
class UserModel extends Model implements User {
  public id: number;
  public email: string;
  public password: string;

  // 將時間戳標記為只讀
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
                allowNull: false,
                type: DataTypes.STRING(255),
            },
        },
        {
            tableName: 'users',
            sequelize,
        },
    );

    return UserModel;
}