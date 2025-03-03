import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginCredentials } from '../../types/survey.types';
import { useAuth } from '../../contexts/AuthContext';
import { Routes } from '../../constants/routes.constant';
import FormInput from '../UI/FormInput';
import Button from '../UI/Button';
import Notification from '../UI/Notification';

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'info'
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await login(credentials);
      
      if (result.success) {
        setNotification({
          show: true,
          message: result.message,
          type: 'success'
        });
        
        setTimeout(() => {
          navigate(Routes.SURVEY_LIST);
        }, 1500);
      } else {
        setNotification({
          show: true,
          message: result.message,
          type: 'error'
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        message: 'An unexpected error occurred.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
      
      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
        
        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />
        
        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

