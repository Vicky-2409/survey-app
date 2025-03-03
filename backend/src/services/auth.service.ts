import jwt from "jsonwebtoken";
import { AdminRepository } from "../repositories/admin.repository";
import { IAdminDocument } from "../models/admin.model";

export class AuthService {
  private adminRepository: AdminRepository;

  constructor() {
    this.adminRepository = new AdminRepository();
  }

  async login(email: string, password: string): Promise<string | null> {
    const admin = await this.adminRepository.findByEmail(email);

    if (!admin) return null;

    const isPasswordValid = await (admin as IAdminDocument).comparePassword(
      password
    );

    if (!isPasswordValid) return null;

    const token = jwt.sign(
      { email: admin.email },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1h" }
    );

    return token;
  }

  verifyToken(token: string): boolean {
    try {
      jwt.verify(token, process.env.JWT_SECRET || "fallback_secret");
      return true;
    } catch (error) {
      return false;
    }
  }
}
