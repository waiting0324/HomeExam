import DB from '../databases/database'
import { HttpException } from '../exceptions/HttpException'
import { User } from '../interfaces/users.interfaces'
import AuthService from './auth.service';
import bycrypt from 'bcrypt';

class UserService {

    private users = DB.Users;
    private authService: AuthService = new AuthService();

    /**
     * 根據用戶 email 查找 用戶對象
     * @param email 用戶 email
     */
    public async getUser(email: string): Promise<User> {

        const findUser: User | null = await this.users.findOne({ where: { email: email } });
        if (findUser == null) {
            throw new HttpException(404, `該 Email 對應的用戶不存在: ${email} `);
        }

        return findUser;
    }

    /**
     * 更改 Email 對應用戶的 用戶名稱
     * @param email 用戶的 Email
     * @param name 更改後的用戶名稱
     */
    public async updateUsername(email: string, name: string): Promise<void> {
        const findUser: User = await this.getUser(email);
        this.users.update({ ...findUser, name: name }, { where: { id: findUser.id } });
    }

    /**
     * 驗證 信箱 對應的 驗證碼
     * @param email 信箱
     * @param code 驗證碼
     */
    public async verifiedEmail(email: string, code: string): Promise<void> {

        // 根據 Email 查找對應帳號
        const findUser: User = await this.getUser(email);

        // 驗證碼不匹配，則報錯
        if (findUser.verifiedCode !== code) {
            throw new HttpException(403, `${code} 與該 Email 對應帳號的驗證碼不匹配: ${email}`);
        }

        // 驗證碼匹配，則更新帳號的認證狀態
        await DB.sequelize.query('UPDATE users SET is_verified = true WHERE id = :id', {
            replacements: { id: findUser.id },
            type: DB.Sequelize.QueryTypes.UPDATE,
        });
    }

    /**
     * 查詢所有帳號
     * @returns 所有帳號
     */
    public async getAllUser(): Promise<User[]> {
        const findUsers: User[] = await this.users.findAll();
        return findUsers;
    }

    /**
     * 獲取 所有註冊帳號 數量
     */
    public async getAllUserCount(): Promise<number> {
        const result = await DB.sequelize.query('SELECT COUNT(1) as count FROM users', {
            type: DB.Sequelize.QueryTypes.SELECT,
        });
        return result[0].count;
    }

    /**
     * 獲取 今天內有進行訪問 的 帳號數量
     */
    public async getTodayUserCount(): Promise<number> {
        const result = await DB.sequelize.query('SELECT COUNT(1) as count FROM users WHERE last_visited_time >= CURDATE()', {
            type: DB.Sequelize.QueryTypes.SELECT,
        });
        return result[0].count;
    }

    /**
     * 獲取 7 天內有進行訪問 的 帳號數量
     */
    public async getWeekUserCount(): Promise<number> {
        const result = await DB.sequelize.query('SELECT COUNT(*) as count FROM users WHERE last_visited_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)', {
            type: DB.Sequelize.QueryTypes.SELECT,
        });
        return result[0].count;
    }

    /**
     * 根據 Email 更新密碼
     * @param email 用戶的 Email
     * @param passowrd 新密碼
     */
    public async updatePassword(email: string, password: string): Promise<void> {

        // 更新密碼
        await DB.sequelize.query('UPDATE users SET password = :password WHERE email = :email', {
            replacements: { email: email, password: bycrypt.hashSync(password, 10) },
            type: DB.Sequelize.QueryTypes.UPDATE,
        });
    }

}

export default UserService;