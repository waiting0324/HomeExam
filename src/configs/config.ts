
// --- 服務相關的配置 ---
const PORT: number = 8080;

// --- 數據庫相關的配置 ---
const DB_HOST: string = 'localhost';
const DB_PORT: number = 3306;
const DB_USER: string = 'root';
const DB_PASSWORD: string = 'password';
const DB_DATABASE: string = 'aha';

// --- Auth0相關的配置 ---
const AUTH0_BASEURL: string = 'http://localhost';
const AUTH0_LOGIN_CALLBACK_ROUTE = '/login/callback';

export { PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, AUTH0_BASEURL, AUTH0_LOGIN_CALLBACK_ROUTE }