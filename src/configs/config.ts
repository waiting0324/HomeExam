// --- 服務相關的配置 ---
const PORT: number = 8080;

// --- 數據庫相關的配置 ---
const DB_HOST: string = '104.199.176.25';
const DB_PORT: number = 3306;
const DB_USER: string = 'root';
const DB_PASSWORD: string = '*****';
const DB_DATABASE: string = 'aha';

// --- Auth0相關的配置 ---
const AUTH0_BASEURL: string = 'http://localhost';
const AUTH0_LOGIN_CALLBACK_ROUTE: string = '/login/callback';
const AUTH0_LOGIN_RECORD_ROUTE: string = '/login/record';

// --- SMTP相關的配置 ---
const SMTP_HOST: string = 'smtp.gmail.com';
const SMTP_PORT: number = 465;
const SMTP_USER: string = 'weicardstw@gmail.com';
const SMTP_PASSWORD: string = '*****';

// --- 驗證郵件相關配置 ---
const MAIL_FROM: string = 'weicardstw@gmail.com';
const MAIL_SUBTITLE: string = 'Aha Exam Verified Mail';
const MAIL_TEMPLATE: string =
  `請點擊此連結進行信箱驗證 : <a target="_blank" ` +
  `href="${AUTH0_BASEURL}:${PORT}/user/{EMAIL}/verified/{CODE}">` +
  `${AUTH0_BASEURL}:${PORT}/user/{EMAIL}/verified/{CODE}</a>`;

export {
  PORT,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  AUTH0_BASEURL,
  AUTH0_LOGIN_CALLBACK_ROUTE,
  AUTH0_LOGIN_RECORD_ROUTE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  MAIL_FROM,
  MAIL_SUBTITLE,
  MAIL_TEMPLATE,
};
