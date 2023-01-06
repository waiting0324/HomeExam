/**
 * 創建帳號
 */
export class CreateUserDto {
  public email: string;
  public name: string;
  public signUpTime: Date;
  public lastVisitedTime: Date;
  public loggedInTimes: number;
  public isVerified: boolean;
}

/**
 * 首頁用戶信息
 */
export class UserProfileDto {
  public isAuthenticated: boolean;
  public isVerified: boolean;
  public email: string;
  public name: string;
  public pic: string;
}

/**
 * 用戶列表的用戶信息
 */
export class UserListDto {
  public email: string;
  public name: string;
  public signUpTime: string;
  public loggedInTimes: number;
  public lastVisitedTime: string;
}

/**
 * 用戶統計信息
 */
export class UserStatisticDto {
  public allUserCount: number;
  public todayUserCount: number;
  public weekUserCount: number;
}
