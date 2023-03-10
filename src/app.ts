import express from 'express';
import {Routes} from './interfaces/routes.interfaces';
import {
  AUTH0_BASEURL,
  PORT,
  AUTH0_LOGIN_CALLBACK_ROUTE,
  AUTH0_LOGIN_RECORD_ROUTE,
} from './configs/config';
import {logger} from './utils/logger';
import errorMiddleware from './middlewares/error.middleware';
import visitedTimeMiddleware from './middlewares/visit.middleware';
import dotenv from 'dotenv';
import {auth} from 'express-openid-connect';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

/**
 * 應用基礎配置類
 */
class App {
  public app: express.Application;
  public port: number;

  /**
   * 構造函數
   * @param {Routes[]} routes 路由對象集合
   */
  constructor(routes: Routes[]) {
    dotenv.config({path: `.env`});

    this.app = express();
    this.port = PORT;

    this.initAuth0();
    this.initMiddlewares();
    this.initRoutes(routes);
    this.initErrorMiddleware();
    this.initSwagger();
  }

  /**
   * 啟動服務
   */
  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  /**
   * 將 路由對象 註冊到 服務 中
   * @param {Routes[]} routes 路由對象集合
   */
  private initRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  /**
   * 初始化 中間件
   */
  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.static(__dirname + '/public'));
    this.app.use(visitedTimeMiddleware);
  }

  /**
   * 註冊 錯誤處理中間件
   */
  private initErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

  /**
   * 初始化 Auth0 組件
   */
  private initAuth0() {
    const config = {
      authRequired: false,
      auth0Logout: true,
      baseURL: `${AUTH0_BASEURL}:${PORT}`,
      routes: {
        callback: AUTH0_LOGIN_CALLBACK_ROUTE, // Auth0 處理 302 跳轉的 API 路徑
      },
      getLoginState(req, options) {
        return {
          returnTo: AUTH0_LOGIN_RECORD_ROUTE, // 登入完成後，用於紀錄用戶數據的 API
        };
      },
    };
    this.app.use(auth(config));
  }

  /**
   * 初始化 Swagger 文檔服務
   */
  private initSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
}

export default App;
