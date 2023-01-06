import {Router} from 'express';
import AuthController from '../controllers/auth.controller';
import {Routes} from '../interfaces/routes.interfaces';
import {AUTH0_LOGIN_RECORD_ROUTE} from '../configs/config';

/**
 * 授權相關的路由
 */
class AuthRoute implements Routes {
  public path = '';
  public router = Router();
  public authController = new AuthController();

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
    // 給 Auth0 回調用的，用來紀錄用戶登入數據
    this.router.get(
      `${this.path}${AUTH0_LOGIN_RECORD_ROUTE}`,
      this.authController.loginRecord,
    );
  }
}

export default AuthRoute;
