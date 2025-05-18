import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LogIn,
  UserPlus,
  Leaf,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email || !password || (!isLogin && !name)) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const url = isLogin
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register';

      const body = isLogin ? { email, password } : { name, email, password };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem('token', data.token);
          setSuccess('Logged in successfully! Redirecting...');
          if (onAuthSuccess) onAuthSuccess(); 
          window.location.href = '/home';
        } else {
          setSuccess('Account created! You can now log in.');
          setIsLogin(true);
          setName('');
        }
      } else {
        throw new Error(data.message || "Authentication failed.");
      }
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-green-50 to-white p-4 sm:p-8">
      <motion.div
        className="w-full max-w-md bg-white/20 backdrop-blur-lg rounded-xl shadow-lg border border-white/10 p-6 sm:p-10 space-y-6 sm:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="flex items-center justify-center" variants={itemVariants}>
          <Leaf className="w-12 h-12 text-green-500 mr-3" />
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700 tracking-tight">NutriAI</h1>
        </motion.div>

        <motion.h2
          className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center transition-colors duration-300"
          variants={itemVariants}
        >
          {isLogin ? 'Login to your account' : 'Create an account'}
        </motion.h2>

        <form onSubmit={handleAuth} className="space-y-4 sm:space-y-6">
          {!isLogin && (
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="mt-1 w-full p-2.5 rounded-lg bg-white/20 text-gray-900 border border-green-300 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 transition"
                required
              />
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="mt-1 w-full p-2.5 rounded-lg bg-white/20 text-gray-900 border border-green-300 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-1 w-full p-2.5 rounded-lg bg-white/20 text-gray-900 border border-green-300 placeholder:text-gray-400 focus:ring-green-500 focus:border-green-500 transition"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-green-500 text-white font-semibold py-2.5 rounded-lg hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-500/50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  {isLogin ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                  {isLogin ? 'Login' : 'Sign Up'}
                </>
              )}
            </button>
          </motion.div>
        </form>

        <motion.div className="text-center text-gray-700" variants={itemVariants}>
          {isLogin ? (
            <button
              onClick={() => setIsLogin(false)}
              className="text-green-500 hover:text-green-600 font-medium underline transition focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
              Don't have an account? Sign up
            </button>
          ) : (
            <button
              onClick={() => setIsLogin(true)}
              className="text-green-500 hover:text-green-600 font-medium underline transition focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
              Already have an account? Login
            </button>
          )}
        </motion.div>

        {(error || success) && (
          <motion.div
            className={`p-3 rounded-md text-center ${
              error
                ? 'bg-red-500/20 text-red-500 border border-red-500/30'
                : 'bg-green-500/20 text-green-600 border border-green-500/30'
            }`}
            variants={itemVariants}
          >
            <div className="flex items-center justify-center gap-2">
              {error ? <AlertTriangle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
              {error || success}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
