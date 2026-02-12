import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader, Send } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      // Email save karo aur OTP page pe jaao
      setTimeout(() => {
        navigate('/verify-otp', { state: { email } });
      }, 1500);
    } else {
      setError(result.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Back Button */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6B2D5C] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#6B2D5C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-[#6B2D5C]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Enter your registered email. We'll send you a 6-digit OTP.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-600 text-sm">
                ✅ OTP sent successfully! Redirecting...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  disabled={loading || success}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#6B2D5C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-[#6B2D5C] text-white py-3 rounded-md font-semibold hover:bg-[#6f4163] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send OTP
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/login" className="text-[#6B2D5C] hover:text-[#6f4163] font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;