import DB from '../databases/database'
import { HttpException } from '../exceptions/HttpException'
import { User } from '../interfaces/users.interfaces'

class UserService {

    private users = DB.Users;

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

}

export default UserService;