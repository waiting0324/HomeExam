import {NextFunction, Request, Response} from 'express';
import {HttpException} from '../exceptions/HttpException';
import {logger} from '../utils/logger';

/**
 * 統一異常處理中間件
 * @param {HttpException} error 異常對象
 * @param {Request} req 請求對象
 * @param {Response} res 響應對象
 * @param {NextFunction} next 下一個中間件函數
 */
const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // HTTP 狀態碼，未指定則默認為 500
  const status: number = error.status || 500;
  const message: string = error.message || '未知的錯誤';

  // 向前端返回錯誤信息
  logger.error(
    `[${req.method}] ${req.path} 
    >> StatusCode:: ${status}, Message:: ${message}`,
  );
  res.status(status).json({message});
};

export default errorMiddleware;
