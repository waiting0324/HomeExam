import DB from '../databases/database'
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../interfaces/users.interfaces'
import { HttpException } from '../exceptions/HttpException'
import bycrypt from 'bcrypt';
import { logger } from '../utils/logger';
import userModel from '../models/user.model';
import MailUtil from '../utils/mail';
import { MAIL_FROM, MAIL_SUBTITLE, MAIL_TEMPLATE, AUTH0_BASEURL, PORT } from '../configs/config'

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

    /**
     * 在用戶登入時，紀錄登入的相關信息
     * @param email 登入用戶信箱
     * @param name 登入用戶名稱
     */
    public async loginRecord(email: string, name: string): Promise<void> {

        // 當 Email 已存在，則表示該用戶之前已經註冊過，則只更新登入次數
        const findUser: User | null = await this.users.findOne({ where: { email: email } });
        if (findUser != null) {

            // 如果用戶郵箱尚未驗證，則發送驗證郵件
            if (!findUser.isVerified) {
                await this.sendVerifiedEmail(findUser.email);
            }

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
        createUser.lastVisitedTime = new Date();
        createUser.isVerified = true;
        await this.users.create({ ...createUser });
    }

    public async sendVerifiedEmail(email: string): Promise<void> {

        // 查詢該信箱相關的帳號
        const findUser: User | null = await this.users.findOne({ where: { email: email } });
        if (findUser == null) {
            throw new HttpException(404, `找不到該 Email 對應的帳號: ${email}`);
        }

        // 信件相關數據
        const mailFrom: string = MAIL_FROM;
        const mailSubtitle: string = MAIL_SUBTITLE;
        const mailContent: string = MAIL_TEMPLATE.replaceAll('{CODE}', findUser.verifiedCode).replaceAll('{EMAIL}', encodeURIComponent(email));

        // 發送驗證信件
        MailUtil.sendMail({
            from: mailFrom,
            to: email,
            subject: mailSubtitle,
            html: mailContent,
        }).then(info => {
            console.log({ info });
        }).catch(console.error);

    }

}

export default AuthService;