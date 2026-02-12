import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, ArrowLeft, Loader, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();

  // Email VerifyOTP page se aayega
  const email = location.state?.email || '';

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Agar email nahi hai toh forgot-password pe redirect karo
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    setLoading(true);
    const result = await resetPassword(email, formData.newPassword, formData.confirmPassword);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
    } else {
      setErrors({ submit: result.message || 'Failed to reset password' });
    }
  };

  // Password strength check
  const getPasswordStrength = (password) => {
    if (!password) return null;
    if (password.length < 6) return { label: 'Too Short', color: 'bg-red-400', width: 'w-1/4' };
    if (password.length < 8) return { label: 'Weak', color: 'bg-orange-400', width: 'w-2/4' };
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return { label: 'Strong', color: 'bg-green-500', width: 'w-full' };
    return { label: 'Medium', color: 'bg-yellow-400', width: 'w-3/4' };
  };

  const strength = getPasswordStrength(formData.newPassword);

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h2>
            <p className="text-gray-500 text-sm mb-2">
              Your password has been updated successfully.
            </p>
            <p className="text-gray-400 text-xs">Redirecting to login...</p>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-1">
              <div className="bg-[#6B2D5C] h-1 rounded-full animate-[width_2.5s_ease-in-out]" style={{ width: '100%', transition: 'width 2.5s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Back Button */}
          <Link
            to="/verify-otp"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6B2D5C] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#6B2D5C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#6B2D5C]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Create a new strong password for your account
            </p>
            <p className="text-[#6B2D5C] font-medium text-sm mt-1">{email}</p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-[#6B2D5C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Min. 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
              )}
              {/* Password Strength Bar */}
              {strength && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Password Strength</span>
                    <span className={`text-xs font-medium ${
                      strength.label === 'Strong' ? 'text-green-600' :
                      strength.label === 'Medium' ? 'text-yellow-600' :
                      strength.label === 'Weak' ? 'text-orange-600' : 'text-red-600'
                    }`}>{strength.label}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className={`${strength.color} ${strength.width} h-1.5 rounded-full transition-all duration-300`}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-[#6B2D5C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Re-enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
              {/* Password Match Indicator */}
              {formData.confirmPassword && formData.newPassword && (
                <p className={`text-xs mt-1 ${
                  formData.newPassword === formData.confirmPassword ? 'text-green-600' : 'text-red-500'
                }`}>
                  {formData.newPassword === formData.confirmPassword ? '✅ Passwords match' : '❌ Passwords do not match'}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B2D5C] text-white py-3 rounded-md font-semibold hover:bg-[#6f4163] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Updating Password...
                </>
              ) : (
                'Update Password'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;