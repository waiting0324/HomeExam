import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { Routes } from '../interfaces/routes.interfaces'
import { requiresAuth } from 'express-openid-connect';

class UserRoute implements Routes {

    public path = '/user';
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initRoutes();
    }

    /**
     * 綁定 API 請求路徑 與 具體執行函數 
     */
    private initRoutes() {
        this.router.post(`${this.path}/name`, this.userController.updateUsername);
        this.router.get(`${this.path}/profile`, this.userController.getUserProfile);
        this.router.get(`${this.path}/:email/verified/:code`, this.userController.verifiedEmail);
        this.router.get(`${this.path}/all`, this.userController.getAllUser);
        this.router.get(`${this.path}/all/statistic`, this.userController.getAllUserStatistic);
        this.router.get(`${this.path}/:email/verified`, this.userController.sendVerifiedEmail);
        this.router.post(`${this.path}/password`, this.userController.updatePassword);
    }
}

export default UserRoute;