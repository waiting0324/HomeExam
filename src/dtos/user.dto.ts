/**
 * 創建帳號
 */
export class CreateUserDto {
    public email: string;
    public name: string;
    public signUpTime: Date;
    public loggedInTimes: number;
}

/**
 * 首頁用戶信息
 */
export class UserProfileDto {
    public isAuthenticated: boolean;
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
    public lastVisitedTime: Date;
}