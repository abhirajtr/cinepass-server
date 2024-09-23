import { Admin } from "../../domain/entities/Admin";
import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";
import { AdminModel } from "../models/AdminModel";
export class AdminRepository implements IAdminRepository {
    async createAdmin(admin: Admin): Promise<Admin> {
        const createdAdmin = new AdminModel(admin);
        await createdAdmin.save();
        return createdAdmin.toObject();
    }
    async findAdminById(adminId: string): Promise<Admin | null> {
        const Admin = await AdminModel.findOne({ adminId });
        return Admin ? Admin.toObject() : null;
    }

    async findAdminByEmail(email: string): Promise<Admin | null> {
        const admin = await AdminModel.findOne({ email });
        return admin ? admin.toObject() : null;
    }
}