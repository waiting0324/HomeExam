import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '../interfaces/users.interfaces.js';

// 創建一個新的 User 類型，將原來的屬性變成可選的
type UserCreationAttributes = Optional<User, 'id' | 'email' | 'password'>;

class UserModel extends Model {

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