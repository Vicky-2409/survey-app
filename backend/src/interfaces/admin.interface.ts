export interface IAdmin {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword?(candidatePassword: string): Promise<boolean>;
}

export interface IAdminRepository {
  findByEmail(email: string): Promise<IAdmin | null>;
}
