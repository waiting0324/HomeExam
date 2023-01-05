import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import UserService from '../services/user.service';
import { UserListDto, UserProfileDto } from '../dtos/user.dto';
import AuthService from '../services/auth.service';
import { User } from '../interfaces/users.interfaces'
import DateUtil from '../utils/date';

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

    /**
     * 驗證用戶信箱
     */
    public verifiedEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {

            // 對驗證碼進行校驗，校驗失敗則拋出異常
            await this.userService.verifiedEmail(req.params.email, req.params.code);

            // 讓瀏覽器 302 跳轉到首頁
            res.redirect(302, '/');
        } catch (error) {
            next(error);
        }
    }

    /**
     * 獲取所有用戶
     */
    public getAllUser = async (req: Request, res: Response, next: NextFunction) => {

        // 查詢所有用戶
        const userList: User[] = await this.userService.getAllUser();

        // 封裝用戶屬性轉成 DTO
        const userDtoList: UserListDto[] = [];
        for (let user of userList) {
            const userDto: UserListDto = new UserListDto();
            userDto.email = user.email;
            userDto.name = user.name;
            userDto.signUpTime = DateUtil.format(user.signUpTime);
            userDto.loggedInTimes = user.loggedInTimes;
            userDto.lastVisitedTime = DateUtil.format(user.lastVisitedTime);
            userDtoList.push(userDto);
        }

        res.status(200).json({ data: userDtoList });
    }

}

export default UserController;