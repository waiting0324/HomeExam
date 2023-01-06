import {NextFunction, Request, Response} from 'express';
import AuthService from '../services/auth.service';

/**
 * 授權相關的 Controller
 */
class AuthController {
  private authService = new AuthService();

  /**
   * 給 Auth0 回調用的，用來紀錄用戶登入數據
   * @param {Request} req 請求對象
   * @param {Response} res 響應對象
   * @param {NextFunction} next 下一個中間件函數
   */
  public loginRecord = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // 如果當前登入的用戶不為空，則進行紀錄
      if (req.oidc.user != undefined) {
        this.authService.loginRecord(req.oidc.user.email, req.oidc.user.name);
      }

      // 讓瀏覽器 302 跳轉到首頁
      res.redirect(302, '/');
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
