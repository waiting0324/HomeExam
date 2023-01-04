import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import UserService from '../services/user.service';
import { UserProfileDto } from '../dtos/user.dto';
import AuthService from '../services/auth.service';

class UserController {

    private userService: UserService = new UserService();
    private authService: AuthService = new AuthService();

    /**
     * 獲取當前登入用戶的數據
     */
    public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userInfoDto: UserProfileDto = new UserProfileDto();
            userInfoDto.isAuthenticated = req.oidc.isAuthenticated();

            // 只有登入之後，才能獲取到以下數據
            if (userInfoDto.isAuthenticated && req.oidc.user != undefined) {
                userInfoDto.email = req.oidc.user.email;
                userInfoDto.name = (await this.userService.getUser(userInfoDto.email)).name;
                userInfoDto.pic = req.oidc.user.picture;
            }

            res.status(200).json({ data: userInfoDto });
        } catch (error) {
            next(error);
        }
    }

    /**
     * 更新用戶名稱
     */
    public updateUsername = async (req: Request, res: Response, next: NextFunction) => {

        try {
            if (req.oidc.user == undefined) {
                throw new HttpException(403, '帳號未登入');
            }

            // 從 Token 與 請求參數 獲取數據
            const email = req.oidc.user.email;
            const name = req.body.name;

            // 更新 用戶名稱
            this.userService.updateUsername(email, name);
            res.status(200).json({ message: '請求成功' });
        } catch (error) {
            next(error);
        }
    }

}

export default UserController;