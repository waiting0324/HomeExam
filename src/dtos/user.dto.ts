
export class CreateUserDto {
    public email: string;
    public signUpTime: Date;
    public loggedInTimes: number;
}

export class UserProfileDto {
    public isAuthenticated: boolean;
}