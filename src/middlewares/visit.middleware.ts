import {NextFunction, Request, Response} from 'express';
import DB from '../databases/database';

/**
 * 紀錄用戶訪問時間 中間件
 * @param {Request} req 請求對象
 * @param {Response} res 響應對象
 * @param {NextFunction} next 下一個中間件函數
 */
const visitedTimeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 只有當前為登入狀態，才會記錄訪問時間
  if (req.oidc.user != undefined) {
    // 根據用戶信箱，更新訪問時間
    const email = req.oidc.user.email;
    DB.sequelize.query(
      'UPDATE users SET last_visited_time = :time WHERE email = :email',
      {
        replacements: {time: new Date(), email: email},
        type: DB.Sequelize.QueryTypes.UPDATE,
      },
    );
  }

  next();
};

export default visitedTimeMiddleware;
