import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, UserProfileDto } from '../dtos/user.dto';
import { logger } from '../utils/logger';
import AuthService from '../services/auth.service';
import { HttpException } from '../exceptions/HttpException';

class AuthController {

    private authService = new AuthService();

    public signup = async (req: Request, res: Response, next: NextFunction) => {

        // 如果不使用 try catch，裡面的方法拋出異常後，錯誤處理中間件將無法進行攔截
        try {

            const userData: CreateUserDto = req.body;

            // 使用 await 關鍵字，表示需等待方法返回才能進行後續處理
            const signupUserData = await this.authService.signup(userData);

            res.status(200).json('請求成功');
        } catch (error) {
            next(error);
        }
    }

    /**
     * 給 Auth0 回調用的，用來紀錄用戶登入數據
     */
    public loginRecord = async (req: Request, res: Response, next: NextFunction) => {

        // 如果當前登入的用戶不為空，則進行紀錄
        if (req.oidc.user != undefined) {
            this.authService.loginRecord(req.oidc.user.email, req.oidc.user.name);
        }

        // 讓瀏覽器 302 跳轉到首頁
        res.redirect(302, '/');
    }

    /**
     * 獲取當前登入用戶的數據
     */
    public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {

        const userInfoDto: UserProfileDto = new UserProfileDto();
        userInfoDto.isAuthenticated = req.oidc.isAuthenticated();

        // 只有登入之後，才能獲取到以下數據
        if (userInfoDto.isAuthenticated && req.oidc.user != undefined) {
            userInfoDto.email = req.oidc.user.email;
            userInfoDto.name = (await this.authService.getUser(userInfoDto.email)).name;
            userInfoDto.pic = req.oidc.user.picture;
        }

        res.status(200).json({ data: userInfoDto });
    }

}

export default AuthController;