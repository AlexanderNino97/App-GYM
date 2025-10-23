import { User, UserRole } from '../entities/User';

export interface IUserRepository {
    create(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    update(id: number, userData: Partial<User>): Promise<void>;
    findAll(): Promise<User[]>;
    updateStatus(id: number, status: boolean): Promise<void>;
}