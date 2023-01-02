import DB from '../databases/database'
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../interfaces/users.interfaces'
import { HttpException } from '../exceptions/HttpException'
import bycrypt from 'bcrypt';

class AuthService {

    private users = DB.Users;

    public async signup(userData: CreateUserDto): Promise<User> {

        // 當 Email 已存在，則註冊失敗
        const findUser: User | null = await this.users.findOne({ where: { email: userData.email } });
        if (findUser) {
            throw new HttpException(409, `該 Email 已被重複註冊: ${userData.email} `);
        }

        // 將密碼加密，並替換要存儲的 password，再存到 MySQL 中
        const hashedPassword = bycrypt.hashSync(userData.password, 10);
        const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

        return createUserData;
    }
}

export default AuthService;