// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const API_BASE = "https://maatimunch-backend.onrender.comapi/auth";
// const PRIMARY = "#6B2D5C";

// const Login = () => {
//   const [isRegister, setIsRegister] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     State: "",
//     city: "",
//     Address: "",
//     Pincode: "",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   // ================= LOGIN =================
//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: form.email,
//           password: form.password,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) return alert(data.message || "Login failed");

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));
//       window.location.href = "/";
//     } catch {
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= REGISTER =================
//   const handleRegister = async () => {
//     if (form.password !== form.confirmPassword)
//       return alert("Passwords do not match");

//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE}/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();
//       if (!res.ok) return alert(data.message || "Register failed");

//       alert("Registered successfully, please login");
//       setIsRegister(false);
//     } catch {
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f1f5] to-[#f0e4ec] px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 min-h-[620px]">

//           {/* LEFT IMAGE */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={isRegister ? "register-img" : "login-img"}
//               initial={{ opacity: 0, x: -60 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 60 }}
//               transition={{ duration: 0.6 }}
//               className="hidden md:flex relative"
//             >
//               <img
//                 src={
//                   isRegister
//                     ? "https://t3.ftcdn.net/jpg/11/40/33/60/360_F_1140336071_eKT0V8kfN06uUk5i92l3aWSgCFunShvA.jpg"
//                     : "https://images.unsplash.com/photo-1710421576768-ff985fa63b60"
//                 }
//                 className="h-full w-full object-cover"
//               />
//               <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-8">
//                 <h2 className="text-white text-3xl font-bold text-center leading-snug">
//                   {isRegister
//                     ? "Join the Premium Dry Fruits Experience"
//                     : "Welcome Back to Maati Munch"}
//                 </h2>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* FORM SIDE */}
//           <div className="p-8 md:p-12 flex flex-col justify-center">
//             <motion.h2
//               key={isRegister ? "register-title" : "login-title"}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//               className="text-3xl font-bold mb-2"
//               style={{ color: PRIMARY }}
//             >
//               {isRegister ? "Create Account" : "Login"}
//             </motion.h2>

//             <p className="text-gray-500 mb-8">
//               {isRegister
//                 ? "Fill your details to get started"
//                 : "Login to continue shopping"}
//             </p>

//             {/* ================= FORM ================= */}
//             <motion.div
//               key={isRegister ? "register-form" : "login-form"}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className="space-y-5"
//             >
//               {isRegister && (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <Input name="name" placeholder="Full Name" onChange={handleChange} />
//                   <Input name="phone" placeholder="Phone Number" onChange={handleChange} />
//                   <Input name="State" placeholder="State" onChange={handleChange} />
//                   <Input name="city" placeholder="City" onChange={handleChange} />
//                   <Input name="Pincode" placeholder="Pincode" onChange={handleChange} />
//                   <Input name="Address" placeholder="Address" onChange={handleChange} />
//                 </div>
//               )}

//               <Input
//                 name="email"
//                 type="email"
//                 placeholder="Email Address"
//                 onChange={handleChange}
//               />

//               <Input
//                 name="password"
//                 type="password"
//                 placeholder="Password"
//                 onChange={handleChange}
//               />

//               {isRegister && (
//                 <Input
//                   name="confirmPassword"
//                   type="password"
//                   placeholder="Confirm Password"
//                   onChange={handleChange}
//                 />
//               )}

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.97 }}
//                 disabled={loading}
//                 onClick={isRegister ? handleRegister : handleLogin}
//                 className="w-full text-white py-3 rounded-xl font-semibold tracking-wide shadow-md"
//                 style={{ backgroundColor: PRIMARY }}
//               >
//                 {loading
//                   ? "Please wait..."
//                   : isRegister
//                   ? "Create Account"
//                   : "Login"}
//               </motion.button>
//             </motion.div>

//             {/* SWITCH */}
//             <p className="text-center text-sm text-gray-600 mt-6">
//               {isRegister ? "Already have an account?" : "New user?"}{" "}
//               <button
//                 onClick={() => setIsRegister(!isRegister)}
//                 className="font-semibold hover:underline"
//                 style={{ color: PRIMARY }}
//               >
//                 {isRegister ? "Login" : "Register"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// /* ================= INPUT COMPONENT ================= */
// const Input = ({ ...props }) => (
//   <motion.input
//     whileFocus={{ scale: 1.01 }}
//     {...props}
//     className="w-full px-4 py-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6B2D5C]/40 transition"
//   />
// );

// export default Login;









import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      // Clear form after successful login
      setFormData({
        email: '',
        password: ''
      });
      navigate('/');
    } else {
      setErrors({ submit: result.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Login to your account</p>
          </div>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{errors.submit}</p>
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-[#6B2D5C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className={`w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-[#6B2D5C] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  disabled={loading}
                  className="w-4 h-4 text-[#6B2D5C] rounded focus:ring-[#6B2D5C] disabled:cursor-not-allowed"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-[#6B2D5C] hover:text-[#6f4163] font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6B2D5C] text-white py-3 rounded-md font-semibold hover:bg-[#6f4163] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#6B2D5C] hover:text-[#6f4163] font-semibold"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;