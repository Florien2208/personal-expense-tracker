"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
  Lock,
  Check,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PasswordResetForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
const router = useRouter();
  // Password validation rules
  const passwordRules = {
    minLength: newPassword.length >= 8,
    hasUppercase: /[A-Z]/.test(newPassword),
    hasLowercase: /[a-z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  };

  const isPasswordValid = Object.values(passwordRules).every((rule) => rule);
  const doPasswordsMatch =
    newPassword === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!isPasswordValid) {
      newErrors.password = "Password does not meet requirements";
    }

    if (!doPasswordsMatch) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 2000);
    }
  };

  const PasswordStrengthIndicator = ({ rule, text }) => (
    <div
      className={`flex items-center space-x-2 text-sm ${
        rule ? "text-green-400" : "text-slate-400"
      }`}
    >
      {rule ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">ExpenseTracker</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Information */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm">Secure Password Reset</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight">
              Create Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                New Password
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-md">
              Choose a strong password to keep your account secure. Make sure
              it's something you'll remember!
            </p>

            {/* Security Tips */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    Strong & Unique
                  </div>
                  <div className="text-slate-400 text-sm">
                    Use a password you don't use elsewhere
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    Encrypted Storage
                  </div>
                  <div className="text-slate-400 text-sm">
                    Your password is encrypted and secure
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
              {!isSuccess ? (
                // Reset Form
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Reset Password
                    </h2>
                    <p className="text-slate-400">
                      Enter your new password below
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* New Password Input */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={`w-full pl-12 pr-12 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.password
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                              : "border-slate-600 focus:border-purple-500 focus:ring-purple-500/20"
                          }`}
                          placeholder="Enter your new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Password Requirements */}
                    {newPassword && (
                      <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-4">
                        <h4 className="text-white font-semibold mb-3 text-sm">
                          Password Requirements
                        </h4>
                        <div className="space-y-2">
                          <PasswordStrengthIndicator
                            rule={passwordRules.minLength}
                            text="At least 8 characters"
                          />
                          <PasswordStrengthIndicator
                            rule={passwordRules.hasUppercase}
                            text="One uppercase letter"
                          />
                          <PasswordStrengthIndicator
                            rule={passwordRules.hasLowercase}
                            text="One lowercase letter"
                          />
                          <PasswordStrengthIndicator
                            rule={passwordRules.hasNumber}
                            text="One number"
                          />
                          <PasswordStrengthIndicator
                            rule={passwordRules.hasSpecial}
                            text="One special character"
                          />
                        </div>
                      </div>
                    )}

                    {/* Confirm Password Input */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full pl-12 pr-12 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.confirm
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                              : confirmPassword && doPasswordsMatch
                              ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                              : "border-slate-600 focus:border-purple-500 focus:ring-purple-500/20"
                          }`}
                          placeholder="Confirm your new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {errors.confirm && (
                        <p className="text-red-400 text-sm mt-2 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.confirm}
                        </p>
                      )}
                      {confirmPassword && doPasswordsMatch && (
                        <p className="text-green-400 text-sm mt-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Passwords match
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={
                        isLoading || !isPasswordValid || !doPasswordsMatch
                      }
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Updating Password...
                        </>
                      ) : (
                        <>
                          Update Password
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                // Success State
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Password Updated!
                    </h2>
                    <p className="text-slate-400">
                      Your password has been successfully reset.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Success Message */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            All Set!
                          </h4>
                          <p className="text-slate-300 text-sm">
                            You can now sign in to your account using your new
                            password.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Sign In Button */}
                    <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                      Sign In to Your Account
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </>
              )}

              {/* Help Section */}
              <div className="mt-8 pt-6 border-t border-slate-600">
                <div className="text-center text-slate-400 text-sm">
                  <p className="mb-2">Need help?</p>
                  <a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Contact our support team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3">
          <div className="flex items-center space-x-2 text-slate-400 text-sm">
            <Shield className="w-4 h-4" />
            <span>Password encrypted with bank-level security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
