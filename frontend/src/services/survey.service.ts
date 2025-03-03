import { apiClient } from "../api/api-client";
import { Survey, ApiResponse } from "../types/survey.types";

export const SurveyService = {
  submitSurvey: async (surveyData: Survey): Promise<ApiResponse<Survey>> => {
    try {
      const response = await apiClient.post<ApiResponse<Survey>>(
        "/surveys",
        surveyData
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  getSurveys: async (): Promise<ApiResponse<Survey[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<Survey[]>>("/surveys");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },

  getSurveyById: async (id: string): Promise<ApiResponse<Survey>> => {
    try {
      const response = await apiClient.get<ApiResponse<Survey>>(
        `/surveys/${id}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }
      throw error;
    }
  },
};
