import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import SurveyFormPage from "./pages/SurveyFormPage";
import LoginPage from "./pages/LoginPage";
import SurveyListPage from "./pages/SurveyListPage";
import { Routes as AppRoutes } from "./constants/routes.constant";
import "./App.css";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={AppRoutes.HOME} element={<HomePage />} />
          <Route path={AppRoutes.SURVEY_FORM} element={<SurveyFormPage />} />
          <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
          <Route path={AppRoutes.SURVEY_LIST} element={<SurveyListPage />} />
          <Route path="*" element={<Navigate to={AppRoutes.HOME} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
