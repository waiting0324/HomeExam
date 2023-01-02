import express from 'express'
import { Routes } from './interfaces/routes.interfaces'
import { PORT } from './configs/config';
import { logger } from './utils/logger';
import errorMiddleware from './middlewares/error.middleware';

class App {

    public app: express.Application;
    public port: number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = PORT;

        this.initMiddlewares();
        this.initRoutes(routes);
        this.initializeErrorHandling();
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
    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;