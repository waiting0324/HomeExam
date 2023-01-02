import express from 'express'
import { Routes } from './interfaces/routes.interfaces'
import { PORT } from './config/config.js';
import { logger } from './utils/logger.js';

class App {

    public app: express.Application;
    public port: number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = PORT;
        this.initRoutes(routes);
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
}

export default App;