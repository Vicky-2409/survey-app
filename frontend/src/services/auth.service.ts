import { apiClient } from "../api/api-client";
import { LoginCredentials, AuthResponse } from "../types/survey.types";

export const AuthService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  logout: (): void => {
    localStorage.removeItem("token");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  validateToken: async (): Promise<boolean> => {
    try {
      await apiClient.get("/auth/validate");
      return true;
    } catch (error) {
      AuthService.logout();
      return false;
    }
  },
};
