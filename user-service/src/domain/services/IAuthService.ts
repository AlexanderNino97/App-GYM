export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    generateToken(payload: { id: number; email: string; role: string }): string;
}