import express from 'express';
import { Routes } from './interfaces/routes.interfaces';
import { AUTH0_BASEURL, PORT, AUTH0_LOGIN_CALLBACK_ROUTE } from './configs/config';
import { logger } from './utils/logger';
import errorMiddleware from './middlewares/error.middleware';
import dotenv from 'dotenv';
import { auth } from 'express-openid-connect'
import auth0Middleware from './middlewares/auth0.middleware';

class App {

    public app: express.Application;
    public port: number;

    constructor(routes: Routes[]) {

        dotenv.config({ path: `.env` });

        this.app = express();
        this.port = PORT;

        this.initAuth0();
        this.initMiddlewares();
        this.initRoutes(routes);
        this.initErrorMiddleware();
    }

    /**
     * 啟動服務
     */
    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`🚀 App listening on the port ${this.port}`)
        })
    }

    /**
     * 將 路由對象 註冊到 服務 中
     * @param routes 路由對象集合
     */
    private initRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router)
        });
    }

    /**
     * 初始化 中間件
     */
    private initMiddlewares() {
        this.app.use(express.json());
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
                callback: AUTH0_LOGIN_CALLBACK_ROUTE,
            }
        };
        this.app.use(auth(config));
    }
}

export default App;