import {Router} from 'express';
import UserController from '../controllers/user.controller';
import {Routes} from '../interfaces/routes.interfaces';
import {requiresAuth} from 'express-openid-connect';

/**
 * 用戶相關的路由
 */
class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  /**
   * 構造函數
   */
  constructor() {
    this.initRoutes();
  }

  /**
   * 綁定 API 請求路徑 與 具體執行函數
   */
  private initRoutes() {
    // 獲取當前登入用戶的數據
    this.router.get(`${this.path}/profile`, this.userController.getUserProfile);
    // 更新用戶名稱
    this.router.post(
      `${this.path}/name`,
      requiresAuth(),
      this.userController.updateUsername,
    );
    // 發送驗證信件
    this.router.post(
      `${this.path}/email/verification`,
      requiresAuth(),
      this.userController.sendVerifiedEmail,
    );
    // 驗證用戶信箱
    this.router.get(
      `${this.path}/:email/verification/:code`,
      this.userController.verifiedEmail,
    );
    // 獲取所有用戶
    this.router.get(
      `${this.path}/all`,
      requiresAuth(),
      this.userController.getAllUser,
    );
    // 獲取所有用戶統計信息
    this.router.get(
      `${this.path}/all/statistic`,
      requiresAuth(),
      this.userController.getAllUserStatistic,
    );
    // 更新用戶密碼
    this.router.post(
      `${this.path}/password`,
      requiresAuth(),
      this.userController.updatePassword,
    );
  }
}

export default UserRoute;
