import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SurveyList from "../components/Survey/SurveyList";
import { useAuth } from "../contexts/AuthContext";
import { Routes } from "../constants/routes.constant";
import Spinner from "../components/UI/Spinner";
import { Messages } from "../constants/messages.constant";

const SurveyListPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(Routes.LOGIN);
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-10">
          <Spinner />
          <p className="mt-2 text-gray-600">{Messages.LOADING}</p>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <SurveyList />
    </Layout>
  );
};

export default SurveyListPage;
