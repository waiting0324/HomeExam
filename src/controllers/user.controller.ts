import {NextFunction, Request, Response} from 'express';
import {HttpException} from '../exceptions/HttpException';
import UserService from '../services/user.service';
import {UserListDto, UserProfileDto, UserStatisticDto} from '../dtos/user.dto';
import AuthService from '../services/auth.service';
import {User} from '../interfaces/users.interfaces';
import DateUtil from '../utils/date';
import bycrypt from 'bcrypt';
import PasswordUtil from '../utils/password';

/**
 * 用戶數據相關的 Controller
 */
class UserController {
  private userService: UserService = new UserService();
  private authService: AuthService = new AuthService();

  /**
   * 獲取當前登入用戶的數據
   * @param {Request} req 請求對象
   * @param {Response} res 響應對象
   * @param {NextFunction} next 下一個中間件函數
   */
  public getUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userInfoDto: UserProfileDto = new UserProfileDto();
      userInfoDto.isAuthenticated = req.oidc.isAuthenticated();

      // 只有登入之後，才能獲取到以下數據
      if (userInfoDto.isAuthenticated && req.oidc.user != undefined) {
        const findUser = await this.userService.getUser(req.oidc.user.email);
        userInfoDto.isVerified = findUser.isVerified;
        userInfoDto.email = req.oidc.user.email;
        userInfoDto.name = findUser.name;
        userInfoDto.pic = req.oidc.user.picture;
      }

      res.status(200).json({data: userInfoDto});
    } catch (error) {
      next(error);
    }
  };

  /**
   * 更新用戶名稱
   * @param {Request} req 請求對象
   * @param {Response} res 響應對象
   * @param {NextFunction} next 下一個中間件函數
   */
  public updateUsername = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (req.oidc.user == undefined) {
        throw new HttpException(403, '帳號未登入');
      }

      // 從 Token 與 請求參數 獲取數據
      const email = req.oidc.user.email;
      const name = req.body.name;

      // 更新 用戶名稱
      this.userService.updateUsername(email, name);
      res.status(200).json({message: '請求成功'});
    } catch (error) {
      next(error);
    }
  };

  /**
   * 驗證用戶信箱
   * @param {Request} req 請求對象
   * @param {Response} res 響應對象
   * @param {NextFunction} next 下一個中間件函數
   */
  public verifiedEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // 對驗證碼進行校驗，校驗失敗則拋出異常
      await this.userService.verifiedEmail(req.params.email, req.params.code);

      // 讓瀏覽器 302 跳轉到 Dashboard 頁面
      res.redirect(302, '/dashboard.html');
    } catch (error) {
      next(error);
    }
  };

  /**
   * 獲取所有用戶
   * @param {Request} req 請求對象
   * @param {Response} res 響應對象
   * @param {NextFunction} next 下一個中間件函數
   */
  public getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // 查詢所有用戶
      const userList: User[] = await this.userService.getAllUser();

      // 封裝用戶屬性轉成 DTO
      const userDtoList: UserListDto[] = [];
      for (const user of userList) {
        const userDto: UserListDto = new UserListDto();
        userDto.email = user.email;
        userDto.name = user.name;
        userDto.signUpTime = DateUtil.format(user.signUpTime);
        userDto.loggedInTimes = user.loggedInTimes;
        userDto.lastVisitedTime = DateUtil.format(user.lastVisitedTime);
        userDtoList.push(userDto);
      }

      res.status(200).json({data: userDtoList});
    } catch (error) {
      next(error);
    }
  };

  /**
   * 查詢用戶統計信息
   * @param {Request} req 請求對象
   * @param {Response} res 響應對象
   * @param {NextFunction} next 下一個中間件函數
   */
  public getAllUserStatistic = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // 查詢數據
      const allUserCount: number = await this.userService.getAllUserCount();
      const todayUserCount: number = await this.userService.getTodayUserCount();
      const weekUserCount: number = await this.userService.getWeekUserCount();

      // 封裝數據
      const userStatisticDto: UserStatisticDto = new UserStatisticDto();
      userStatisticDto.allUserCount = allUserCount;
      userStatisticDto.todayUserCount = todayUserCount;
      userStatisticDto.weekUserCount = weekUserCount;

      res.status(200).json({data: userStatisticDto});
    } catch (error) {
      next(error);
    }
  };

  /**
   * 發送驗證信件
   * @param {Request} req 請求對象
   * @param {Response} res 響應對象
   * @param {NextFunction} next 下一個中間件函數
   */
  public sendVerifiedEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (req.oidc.user == undefined) {
        throw new HttpException(403, '帳號未登入');
      }

      this.authService.sendVerifiedEmail(req.oidc.user.email);
    } catch (error) {
      next(error);
    }
  };

  /**
   * 更新用戶密碼
   * @param {Request} req 請求對象
   * @param {Response} res 響應對象
   * @param {NextFunction} next 下一個中間件函數
   */
  public updatePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // 獲取 請求數據
      const email: string = req.body.email;
      const oldPwd: string = req.body.oldPwd;
      const newPwd: string = req.body.newPwd;
      const checkNewPwd: string = req.body.checkNewPwd;

      // 校驗密碼
      if (!PasswordUtil.isValid(newPwd)) {
        throw new HttpException(
          403,
          '密碼不符合要求(小寫字母、大寫字母、數字、特殊字符,4種滿足其中3種; 且長度至少 8 位)',
        );
      }
      if (newPwd != checkNewPwd) {
        throw new HttpException(403, '新密碼 與 確認密碼 不一致');
      }
      const findUserPwd = (await this.userService.getUser(email)).password;
      if (!bycrypt.compareSync(oldPwd, findUserPwd)) {
        throw new HttpException(403, '原密碼不正確');
      }

      // 更新密碼
      await this.userService.updatePassword(email, newPwd);

      res.status(200).json({message: '密碼更新成功'});
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
