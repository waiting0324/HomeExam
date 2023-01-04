import DB from '../databases/database'
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../interfaces/users.interfaces'
import { HttpException } from '../exceptions/HttpException'
import bycrypt from 'bcrypt';
import { logger } from '../utils/logger';
import userModel from '../models/user.model';

class AuthService {

    private users = DB.Users;

    public async signup(userData: CreateUserDto): Promise<User> {

        // 當 Email 已存在，則註冊失敗
        const findUser: User | null = await this.users.findOne({ where: { email: userData.email } });
        if (findUser) {
            throw new HttpException(409, `該 Email 已被重複註冊: ${userData.email} `);
        }

        // 將密碼加密，並替換要存儲的 password，再存到 MySQL 中
        // const hashedPassword = bycrypt.hashSync(userData.password, 10);
        const createUserData: User = await this.users.create({ ...userData });

        return createUserData;
    }

    public async loginRecord(email: string, name: string): Promise<void> {

        // 當 Email 已存在，則表示該用戶之前已經註冊過，則只更新登入次數
        const findUser: User | null = await this.users.findOne({ where: { email: email } });
        if (findUser) {
            await this.users.update({ ...findUser, loggedInTimes: findUser.loggedInTimes + 1 }, { where: { id: findUser.id } })
            return;
        }

        // 當 Email 不存在，表示是通過 Google 或 Facebook 授權的用戶
        // 註: 通過 帳號、密碼 創建的帳號，會由 Auth0 那邊執行腳本寫入到 MySQL 中
        const createUser: CreateUserDto = new CreateUserDto();
        createUser.email = email;
        createUser.name = name;
        createUser.loggedInTimes = 1;
        createUser.signUpTime = new Date();
        await this.users.create({ ...createUser });
    }
}

export default AuthService;