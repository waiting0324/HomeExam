/**
 * 創建帳號
 */
export class CreateUserDto {
  public email: string; // 用戶信箱
  public name: string; // 用戶名稱
  public signUpTime: Date; // 註冊時間
  public lastVisitedTime: Date; // 最後訪問時間
  public loggedInTimes: number; // 登入次數
  public isVerified: boolean; // 是否已驗證過信箱
}

/**
 * 首頁用戶信息
 */
export class UserProfileDto {
  public isAuthenticated: boolean; // 是否已登入
  public isVerified: boolean; // 是否已驗證過信箱
  public email: string; // 用戶信箱
  public name: string; // 用戶名稱
  public pic: string; // 用戶相片
}

/**
 * 用戶列表的用戶信息
 */
export class UserListDto {
  public email: string; // 用戶信箱
  public name: string; // 用戶姓名
  public signUpTime: string; // 註冊時間
  public loggedInTimes: number; // 登入次數
  public lastVisitedTime: string; // 上次訪問時間
  public allowChangePassword: boolean; // 是否可以更改密碼(通過密碼方式註冊的帳號)
}

/**
 * 用戶統計信息
 */
export class UserStatisticDto {
  public allUserCount: number; // 所有註冊用戶數量
  public todayUserCount: number; // 今天訪問的用戶數量
  public weekUserCount: number; // 7天內訪問的用戶數量
}
