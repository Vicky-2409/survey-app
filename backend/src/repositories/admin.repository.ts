import { IAdmin, IAdminRepository } from "../interfaces/admin.interface";
import AdminModel from "../models/admin.model";

export class AdminRepository implements IAdminRepository {
  async findByEmail(email: string): Promise<IAdmin | null> {
    const admin = await AdminModel.findOne({ email });
    return admin;
  }
}
