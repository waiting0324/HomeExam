export interface User {
  id: number; // 用戶 id
  email: string; // 用戶信箱
  password: string; // 用戶密碼
  name: string; // 用戶名稱
  verifiedCode: string; // 信箱驗證碼
  isVerified: boolean; // 信箱是否已經經過驗證
  signUpTime: Date; // 註冊時間
  lastVisitedTime: Date; // 上次訪問時間
  loggedInTimes: number; // 登入次數
}
