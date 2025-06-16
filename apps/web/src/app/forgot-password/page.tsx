"use client";
import React, { useState } from "react";
import {
  DollarSign,
  Mail,
  ArrowRight,
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleResendEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden flex items-center justify-center">
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
            <button type="button" onClick={()=> router.push("/login")} className="flex items-center text-slate-300 hover:text-white transition-colors">
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
            <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
              <Shield className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm">Secure Password Recovery</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight">
              Reset Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Password
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-md">
              Don't worry, it happens to the best of us. We'll send you a secure
              link to reset your password.
            </p>

            {/* Security Features */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    Secure Reset Link
                  </div>
                  <div className="text-slate-400 text-sm">
                    Encrypted and expires in 15 minutes
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">
                    Account Protection
                  </div>
                  <div className="text-slate-400 text-sm">
                    Your data remains safe and encrypted
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Quick Recovery</div>
                  <div className="text-slate-400 text-sm">
                    Usually delivered within 2 minutes
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
              {!isSubmitted ? (
                // Initial Form
                <>
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Forgot Password?
                    </h2>
                    <p className="text-slate-400">
                      Enter your email address and we'll send you a link to
                      reset your password.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Email Input */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="Enter your email address"
                          required
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !email}
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending Reset Link...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>

                    {/* Alternative Options */}
                    <div className="text-center space-y-4">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-slate-800 text-slate-400">
                            Or
                          </span>
                        </div>
                      </div>

                      <button className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                        Try a different email address
                      </button>
                    </div>
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
                      Check Your Email
                    </h2>
                    <p className="text-slate-400">
                      We've sent a password reset link to
                    </p>
                    <p className="text-purple-400 font-semibold mt-1">
                      {email}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Instructions */}
                    <div className="bg-slate-700/30 border border-slate-600 rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-white font-semibold mb-2">
                            What's next?
                          </h4>
                          <ul className="text-slate-300 text-sm space-y-1">
                            <li>• Check your email inbox</li>
                            <li>
                              • Click the reset link (expires in 15 minutes)
                            </li>
                            <li>• Create a new secure password</li>
                            <li>• Sign in with your new password</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Resend Button */}
                    <button
                      onClick={handleResendEmail}
                      disabled={isLoading}
                      className="w-full border border-slate-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Resending...
                        </>
                      ) : (
                        "Resend Email"
                      )}
                    </button>

                    {/* Back to Login */}
                    <div className="text-center">
                      <button className="text-purple-400 hover:text-purple-300 font-semibold transition-colors flex items-center justify-center mx-auto">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Sign In
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Help Section */}
              <div className="mt-8 pt-6 border-t border-slate-600">
                <div className="text-center text-slate-400 text-sm">
                  <p className="mb-2">Still having trouble?</p>
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
            <span>Your account security is our top priority</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
