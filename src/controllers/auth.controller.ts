import { NextFunction, Request, Response } from 'express';
import DB from '../databases/database'
import { CreateUserDto } from '../dtos/user.dto';
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

    public loginRecord = async (req: Request, res: Response, next: NextFunction) => {
        logger.info('21111111')
    }

}

export default AuthController;