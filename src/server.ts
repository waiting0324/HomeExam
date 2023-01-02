import App from './app';
import AuthRoute from './routes/auth.route';

// 初始化 與 註冊 路由 到 服務 中
const app = new App([new AuthRoute()]);

// 啟動服務
app.listen();