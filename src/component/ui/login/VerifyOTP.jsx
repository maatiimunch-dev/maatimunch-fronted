import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Loader, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, forgotPassword } = useAuth();

  // Email ForgotPassword page se aayega
  const email = location.state?.email || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = useRef([]);

  // Agar email nahi hai toh forgot-password pe redirect karo
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  // Resend countdown timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    // Sirf numbers allow karo
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Sirf last character lo
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace pe previous input pe jaao
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    // Last filled input pe focus karo
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    setLoading(true);
    const result = await verifyOTP(email, otpString);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 1500);
    } else {
      setError(result.message || 'Invalid OTP. Please try again.');
      // OTP clear karo on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setResending(true);
    setError('');
    const result = await forgotPassword(email);
    setResending(false);

    if (result.success) {
      setResendTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } else {
      setError(result.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Back Button */}
          <Link
            to="/forgot-password"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#6B2D5C] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#6B2D5C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-[#6B2D5C]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Verify OTP</h2>
            <p className="text-gray-500 mt-2 text-sm">
              We sent a 6-digit OTP to
            </p>
            <p className="text-[#6B2D5C] font-semibold text-sm mt-1">{email}</p>
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
                ✅ OTP verified! Redirecting to reset password...
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Boxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Enter 6-Digit OTP
              </label>
              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    disabled={loading || success}
                    className={`w-11 h-12 text-center text-lg font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B2D5C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-all ${
                      digit ? 'border-[#6B2D5C] bg-[#6B2D5C]/5' : 'border-gray-300'
                    } ${error ? 'border-red-400' : ''}`}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || success || otp.join('').length !== 6}
              className="w-full bg-[#6B2D5C] text-white py-3 rounded-md font-semibold hover:bg-[#6f4163] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-4 text-center">
            {canResend ? (
              <button
                onClick={handleResendOtp}
                disabled={resending}
                className="text-sm text-[#6B2D5C] hover:text-[#6f4163] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resending ? (
                  <span className="flex items-center gap-1 justify-center">
                    <Loader className="w-4 h-4 animate-spin" />
                    Resending...
                  </span>
                ) : (
                  'Resend OTP'
                )}
              </button>
            ) : (
              <p className="text-sm text-gray-500">
                Resend OTP in{' '}
                <span className="font-semibold text-[#6B2D5C]">{resendTimer}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;