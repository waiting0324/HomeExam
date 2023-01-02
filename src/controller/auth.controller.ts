import { NextFunction, Request, Response } from 'express';

class AuthController {

    public signup = async (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json('請求成功')
    }

}

export default AuthController;