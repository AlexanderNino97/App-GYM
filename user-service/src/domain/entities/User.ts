export enum UserRole {
    CLIENT = 'client',
    ADMIN = 'admin',
    TRAINER = 'trainer'
}

export class User {
    public readonly id?: number;
    public name: string;
    public email: string;
    public passwordHash: string;
    public role: UserRole;
    public readonly createdAt?: Date;
    public updatedAt?: Date;

    constructor(name: string, email: string, passwordHash: string, role: UserRole = UserRole.CLIENT) {
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    // Método para no exponer el hash de la contraseña en las respuestas JSON
    public toJSON() {
        const { passwordHash, ...user } = this;
        return user;
    }
}