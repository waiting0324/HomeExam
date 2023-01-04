export interface User {
    id: number;
    email: string;
    name: string;
    verifiedCode: string;
    isVerified: boolean;
    signUpTime: Date;
    loggedInTimes: number;
}
