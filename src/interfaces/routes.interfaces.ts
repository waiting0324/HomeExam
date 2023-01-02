import { Router } from 'express';

/**
 * 自定義路由對象
 */
export interface Routes {
    /**
     * 路由路徑
     */
    path?: string;
    /**
     * Express 的路由對象
     */
    router: Router;
}
