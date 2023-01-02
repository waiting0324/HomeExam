import { Router } from 'express';
import AuthController from '../controller/auth.controller';
import { Routes } from '../interfaces/routes.interfaces'

class AuthRoute implements Routes {

    public path = '/';
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initRoutes();
    }

    /**
     * 綁定 API 請求路徑 與 具體執行函數 
     */
    private initRoutes() {
        this.router.post(`${this.path}signup`, this.authController.signup);
    }
}

export default AuthRoute;