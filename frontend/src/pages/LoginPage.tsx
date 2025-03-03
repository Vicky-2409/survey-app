import React from "react";
import Layout from "../components/Layout/Layout";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default LoginPage;
