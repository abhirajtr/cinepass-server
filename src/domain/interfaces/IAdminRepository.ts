import { Admin } from "../entities/Admin";

export interface IAdminRepository {
    createAdmin(admin: Admin): Promise<Admin>;
    findAdminById(adminId: string): Promise<Admin | null>;
    findAdminByEmail(email: string): Promise<Admin | null>;
    // updateUser(userId: string, updatedData: Partial<User>): Promise<User | null>;
    // userExistsByEmail(email: string): Promise<boolean>;
    // getAllUsers(): Promise<User[]>;
    // updateUserByEmail(email: string, updatedData: Partial<User>): Promise<User | null>;
}