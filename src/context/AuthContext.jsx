// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Component mount hone pe check karo user logged in hai ya nahi
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  };

  // Register new user
  const register = async (name, email, phone, password) => {
    try {
      const response = await api.post('/auth/register', {
        name,
        email,
        phone,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  // Forgot password - OTP send
  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (error) {
      console.error('Forgot password error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to send OTP' 
      };
    }
  };

  // Verify OTP
  const verifyOTP = async (email, otp) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return { 
        success: true, 
        message: response.data.message,
        resetToken: response.data.resetToken 
      };
    } catch (error) {
      console.error('OTP verification error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Invalid OTP' 
      };
    }
  };

  // Reset password
  const resetPassword = async (email, resetToken, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        email, 
        resetToken, 
        newPassword 
      });
      return { 
        success: true, 
        message: response.data.message 
      };
    } catch (error) {
      console.error('Reset password error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to reset password' 
      };
    }
  };

  // Get user profile
  const getUserProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Get profile error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to fetch profile' 
      };
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword,
    getUserProfile,
    isAuthenticated: !!user
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6B2D5C]"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};