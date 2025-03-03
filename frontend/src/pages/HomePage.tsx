import React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../constants/routes.constant";
import Layout from "../components/Layout/Layout";
import Button from "../components/UI/Button";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="text-center max-w-4xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Survey App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Share your feedback and help us improve our services
        </p>
        <div className="flex justify-center space-x-4">
          <Link to={Routes.SURVEY_FORM}>
            <Button variant="primary" className="px-8 py-3">
              Take Survey
            </Button>
          </Link>
          <Link to={Routes.LOGIN}>
            <Button variant="secondary" className="px-8 py-3">
              Admin Login
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
