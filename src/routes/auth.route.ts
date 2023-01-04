import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { Routes } from '../interfaces/routes.interfaces'
import { AUTH0_LOGIN_RECORD_ROUTE } from '../configs/config'

class AuthRoute implements Routes {

    public path = '';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initRoutes();
    }

    /**
     * 綁定 API 請求路徑 與 具體執行函數 
     */
    private initRoutes() {
        this.router.post(`${this.path}/signup`, this.authController.signup);
        this.router.get(`${this.path}${AUTH0_LOGIN_RECORD_ROUTE}`, this.authController.loginRecord);
    }
}

export default AuthRoute;