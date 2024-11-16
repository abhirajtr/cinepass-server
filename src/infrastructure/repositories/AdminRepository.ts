import { Admin } from "../../domain/entities/Admin";
import { IAdminRepository } from "../../domain/interfaces/IAdminRepository";
import { AdminModel } from "../models/AdminModel";

export class AdminRepository implements IAdminRepository {
    async findByEmail(email: string): Promise<Admin | null> {
        return await AdminModel.findOne({ email });
    }
}