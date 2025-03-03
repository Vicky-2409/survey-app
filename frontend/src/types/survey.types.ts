export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

export interface Survey {
  _id?: string;
  name: string;
  gender: Gender;
  nationality: string;
  email: string;
  phoneNumber: string;
  address: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
  errors?: any[];
}
