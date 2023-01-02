import { NextFunction, Request, Response } from 'express';
import DB from '../databases/database.js'
import { CreateUserDto } from '../dtos/user.dto.js';
import { logger } from '../utils/logger.js';

class AuthController {

    public users = DB.Users;

    public signup = async (req: Request, res: Response, next: NextFunction) => {

        const userData: CreateUserDto = req.body;

        this.users.create({ ...userData });

        const findUsers = this.users.findAll();
        logger.info(findUsers)

        res.status(200).json('請求成功')
    }

}

export default AuthController;