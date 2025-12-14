import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* Card */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[560px]">

          {/* IMAGE SIDE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isRegister ? "register-img" : "login-img"}
              initial={{ rotateY: -90, opacity: 0, x: -100 }}
              animate={{ rotateY: 0, opacity: 1, x: 0 }}
              exit={{ rotateY: 90, opacity: 0, x: 100 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block relative"
              style={{ perspective: 1200 }}
            >
              <img
                src={
                  isRegister
                    ? "https://t3.ftcdn.net/jpg/11/40/33/60/360_F_1140336071_eKT0V8kfN06uUk5i92l3aWSgCFunShvA.jpg"
                    : "https://images.unsplash.com/photo-1710421576768-ff985fa63b60"
                }
                alt="Auth Visual"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-3xl font-bold text-center px-6 leading-snug">
                  {isRegister
                    ? "Join the Premium Dry Fruits Club"
                    : "Welcome Back to Maati Munch"}
                </h2>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* FORM SIDE */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {showForgot
                ? "Forgot Password"
                : isRegister
                ? "Create Account"
                : "Login"}
            </h2>

            <p className="text-gray-500 mb-6">
              {showForgot
                ? "We’ll send you a reset link"
                : isRegister
                ? "Create an account to continue"
                : "Login to your account"}
            </p>

            {/* FORGOT PASSWORD */}
            {showForgot ? (
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                />

                <button className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition">
                  Send Reset Link
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgot(false)}
                  className="text-sm text-purple-700 hover:underline w-full text-center"
                >
                  Back to Login
                </button>
              </form>
            ) : (
              <>
                {/* LOGIN / REGISTER */}
                <motion.form
                  key={isRegister ? "register" : "login"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {isRegister && (
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                    />
                  )}

                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                  />

                  {isRegister && (
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                    />
                  )}

                  {!isRegister && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowForgot(true)}
                        className="text-sm text-purple-700 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <button className="w-full bg-purple-700 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition transform hover:scale-[1.02]">
                    {isRegister ? "Register" : "Login"}
                  </button>
                </motion.form>

                {/* SWITCH */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  {isRegister ? "Already have an account?" : "New user?"}{" "}
                  <button
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-purple-700 font-semibold hover:underline"
                  >
                    {isRegister ? "Login" : "Register"}
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
