import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Gem,
  Sparkles,
  EyeOff,
  Eye,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/authContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { toast } from "react-toastify";

const AuthPopup = ({
  isOpen,
  onClose,
  initialMode = "login",
  skipRedirectOnClose = false,
}) => {
  const [mode, setMode] = useState(initialMode);
  void motion;

  if (!isOpen) return null;

  const switchMode = () => {
    setTimeout(() => {
      setMode(mode === "login" ? "register" : "login");
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex min-h-150">
              {/* Left Side - Logo/Info Section (Sliding) */}
              <AnimatePresence mode="wait">
                {mode === "login" ? (
                  <motion.div
                    key="login-info"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="hidden w-1/2 bg-linear-to-br from-cyan-600 to-cyan-700 p-8 text-white md:block"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <div className="mb-8 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                            <span className="text-2xl font-bold">R</span>
                          </div>
                          <h2 className="text-2xl font-bold">Rent SaaS</h2>
                        </div>
                        <h3 className="mb-4 text-3xl font-bold">
                          Welcome Back!
                        </h3>
                        <p className="mb-8 text-cyan-100">
                          Sign in to access your dashboard, manage your
                          subscriptions, and discover new software solutions.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <CheckCircle size={20} className="text-cyan-300" />
                            <span className="text-sm">
                              Access your software
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle size={20} className="text-cyan-300" />
                            <span className="text-sm">
                              Manage subscriptions
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle size={20} className="text-cyan-300" />
                            <span className="text-sm">Get 24/7 support</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-cyan-100">
                          New to Rent SaaS?{" "}
                          <button
                            onClick={switchMode}
                            className="font-semibold underline hover:text-white"
                          >
                            Create an account
                          </button>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register-info"
                    initial={{ x: 0, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="hidden w-1/2 bg-linear-to-br from-cyan-600 to-cyan-700 p-8 text-white md:block"
                  >
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <div className="mb-8 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                            <span className="text-2xl font-bold">R</span>
                          </div>
                          <h2 className="text-2xl font-bold">Rent SaaS</h2>
                        </div>
                        <h3 className="mb-4 text-3xl font-bold">
                          Join Rent SaaS
                        </h3>
                        <p className="mb-8 text-cyan-100">
                          Create your account and start accessing premium
                          software solutions today.
                        </p>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Sparkles size={20} className="text-cyan-300" />
                            <span className="text-sm">14-day free trial</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Sparkles size={20} className="text-cyan-300" />
                            <span className="text-sm">
                              No credit card required
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Sparkles size={20} className="text-cyan-300" />
                            <span className="text-sm">Cancel anytime</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-cyan-100">
                          Already have an account?{" "}
                          <button
                            onClick={switchMode}
                            className="font-semibold underline hover:text-white"
                          >
                            Sign in
                          </button>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Right Side - Form Section (Sliding) */}
              <AnimatePresence mode="wait">
                {mode === "login" ? (
                  <motion.div
                    key="login-form"
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full md:w-1/2"
                  >
                    <LoginForm
                      switchMode={switchMode}
                      onClose={onClose}
                      skipRedirect={skipRedirectOnClose}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="register-form"
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="w-full md:w-1/2"
                  >
                    <RegisterForm switchMode={switchMode} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile View - Simple Stacked Layout */}
            <div className="block md:hidden">
              <div className="bg-linear-to-br from-cyan-600 to-cyan-700 p-6 text-center text-white">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <span className="text-2xl font-bold">R</span>
                  </div>
                </div>
                {mode === "login" ? (
                  <>
                    <h3 className="mb-2 text-xl font-bold">Welcome Back!</h3>
                    <p className="text-sm text-cyan-100">
                      Sign in to continue to your account
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="mb-2 text-xl font-bold">Join Rent SaaS</h3>
                    <p className="text-sm text-cyan-100">
                      Create your account to get started
                    </p>
                  </>
                )}
              </div>
              <div className="p-6">
                {mode === "login" ? (
                  <LoginForm switchMode={switchMode} onClose={onClose} />
                ) : (
                  <RegisterForm switchMode={switchMode} />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoginForm = ({ switchMode, onClose, skipRedirect = false }) => {
  const { login, setAccessToken, api } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    const loginPromise = api.post(
      "/api/login",
      { email, password },
      { withCredentials: true },
    );

    toast.promise(loginPromise, {
      pending: "Logging in...",
      success: {
        render({ data }) {
          const { accessToken } = data.data;
          login(accessToken);
          setAccessToken(accessToken);

          setTimeout(() => {
            onClose();
            if (!skipRedirect) {
              const from = location.state?.from?.pathname || "/";
              navigate(from, { replace: true });
            }
          }, 500);

          return "Login successful!";
        },
      },
      error: {
        render({ data }) {
          return (
            data?.response?.data?.error ||
            "An error occurred during login. Please try again."
          );
        },
      },
    });
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sign In</h2>
        <p className="mt-1 text-sm text-gray-500">
          Access your Rent SaaS account
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleLogin}>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-12 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-cyan-600 hover:text-cyan-700"
          >
            Forgot password?
          </button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full rounded-lg bg-cyan-600 py-2.5 font-semibold text-white transition-colors hover:bg-cyan-700"
        >
          Sign In
        </motion.button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="space-y-3">
        <SignedOut>
          <SignInButton mode="modal">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </motion.button>
          </SignInButton>
        </SignedOut>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={switchMode}
          className="font-medium text-cyan-600 hover:text-cyan-700"
        >
          Create account
        </button>
      </p>
    </div>
  );
};

LoginForm.propTypes = {
  switchMode: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const RegisterForm = ({ switchMode }) => {
  const { api } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const registerPromise = api.post("/api/register", formData, {
      withCredentials: true,
    });

    toast.promise(registerPromise, {
      pending: "Creating account...",
      success: {
        render() {
          setTimeout(() => {
            switchMode();
          }, 2000);
          return "Account created successfully! Please sign in.";
        },
      },
      error: {
        render({ data }) {
          return data?.response?.data?.error || "Failed to create account";
        },
      },
    });
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="mt-1 text-sm text-gray-500">
          Start your 14-day free trial
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-12 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-12 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full rounded-lg bg-cyan-600 py-2.5 font-semibold text-white transition-colors hover:bg-cyan-700"
        >
          Create Account
        </motion.button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={switchMode}
            className="font-medium text-cyan-600 hover:text-cyan-700"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};

RegisterForm.propTypes = {
  switchMode: PropTypes.func.isRequired,
};

AuthPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  initialMode: PropTypes.string,
};

export default AuthPopup;
