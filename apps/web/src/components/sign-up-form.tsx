import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Star,
  Shield,
  Check,
  Zap,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod/v4";
import { useRouter } from "next/navigation";
import Loader from "./loader";
type SignupPageProps = {
  onSwitchToSignIn: () => void;
};
type SignupFormValues = {
  name?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
};

const SignupPage: React.FC<SignupPageProps> = ({ onSwitchToSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm<
    SignupFormValues, // TFormData
    any, // TFormMeta
    any, // TFieldMeta
    any, // TFieldValue
    any, // TFieldInputValue
    any, // TFieldError
    any, // TFieldStore
    any, // TFieldApi
    any, // TFormApi
    any // TFormStore
  >({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      firstName: "",
      lastName: "",
      agreeToTerms: false,
      subscribeNewsletter: false,
    },
    onSubmit: async ({ value }) => {
      // Auto-generate name from firstName and lastName
      const fullName = `${value.firstName} ${value.lastName}`.trim();

      await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: fullName || value.name, // Use generated name or fallback to manual name
          firstName: value.firstName,
          lastName: value.lastName,
        } as any,
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign up successful");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        }
      );
    },
    validators: {
      onSubmit: z
        .object({
          name: z.string().optional(), // Make optional since it's auto-generated
          firstName: z.string().min(1, "First name is required"),
          lastName: z.string().min(1, "Last name is required"),
          email: z.string().email("Invalid email address"),
          password: z.string().min(8, "Password must be at least 8 characters"),
          confirmPassword: z.string().min(1, "Please confirm your password"),
          agreeToTerms: z
            .boolean()
            .refine((val) => val === true, "You must agree to the terms"),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords don't match",
          path: ["confirmPassword"],
        }),
    },
  });

  // Auto-update name field when firstName or lastName changes
  useEffect(() => {
    const firstName = form.getFieldValue("firstName");
    const lastName = form.getFieldValue("lastName");
    const fullName = `${firstName} ${lastName}`.trim();

    if (fullName) {
      form.setFieldValue("name", fullName);
    }
  }, [form.getFieldValue("firstName"), form.getFieldValue("lastName")]);

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, text: "Lightning-fast setup" },
    { icon: <Shield className="w-5 h-5" />, text: "Bank-level security" },
    { icon: <Star className="w-5 h-5" />, text: "Premium features included" },
  ];

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated Background Elements - Fixed positioning to prevent scroll issues */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">ExpenseTracker</span>
          </button>

          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-slate-300">Already have an account?</span>
            <button
              onClick={onSwitchToSignIn}
              className="border border-slate-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left py-8 lg:py-12">
            <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6 lg:mb-8">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm">Join 10,000+ Users</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight">
              Start Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Financial Journey
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-300 mb-6 lg:mb-8 max-w-md mx-auto lg:mx-0">
              Join thousands of users who have transformed their financial
              habits. Start tracking, analyzing, and saving money today.
            </p>

            {/* Benefits */}
            <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center lg:justify-start"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center mr-4">
                    {benefit.icon}
                  </div>
                  <span className="text-slate-300 text-base lg:text-lg">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center lg:text-left">
                <div className="text-xl lg:text-2xl font-bold text-white mb-1">
                  50K+
                </div>
                <div className="text-slate-400 text-xs lg:text-sm">
                  Transactions
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl lg:text-2xl font-bold text-white mb-1">
                  $2M+
                </div>
                <div className="text-slate-400 text-xs lg:text-sm">
                  Money Saved
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-xl lg:text-2xl font-bold text-white mb-1">
                  10K+
                </div>
                <div className="text-slate-400 text-xs lg:text-sm">
                  Happy Users
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 lg:p-8">
              <div className="text-center mb-6 lg:mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-slate-400 text-sm lg:text-base">
                  Start your free trial today - no credit card required
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void form.handleSubmit();
                }}
                className="space-y-4 lg:space-y-6"
              >
                {/* Name Inputs */}
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div>
                    <form.Field name="firstName">
                      {(field) => (
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            First Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
                            <input
                              id={field.name}
                              name={field.name}
                              type="text"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-2.5 lg:py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm lg:text-base"
                              placeholder="John"
                              required
                            />
                          </div>
                          {field.state.meta.errors.map((error, i) => {
                            const err = error as unknown;

                            if (typeof err === "string") {
                              return (
                                <p
                                  key={i}
                                  className="text-red-400 text-xs mt-1"
                                >
                                  {err}
                                </p>
                              );
                            }

                            if (
                              typeof err === "object" &&
                              err !== null &&
                              "message" in err
                            ) {
                              return (
                                <p
                                  key={i}
                                  className="text-red-400 text-xs mt-1"
                                >
                                  {(err as { message?: string }).message}
                                </p>
                              );
                            }

                            return null;
                          })}
                        </div>
                      )}
                    </form.Field>
                  </div>
                  <div>
                    <form.Field name="lastName">
                      {(field) => (
                        <div>
                          <label className="block text-sm font-semibold text-slate-300 mb-2">
                            Last Name
                          </label>
                          <input
                            id={field.name}
                            name={field.name}
                            type="text"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full px-3 lg:px-4 py-2.5 lg:py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm lg:text-base"
                            placeholder="Doe"
                            required
                          />
                          {field.state.meta.errors.map((error, i) => {
                            const err = error as unknown;

                            if (typeof err === "string") {
                              return (
                                <p
                                  key={i}
                                  className="text-red-400 text-xs mt-1"
                                >
                                  {err}
                                </p>
                              );
                            }

                            if (
                              typeof err === "object" &&
                              err !== null &&
                              "message" in err
                            ) {
                              return (
                                <p
                                  key={i}
                                  className="text-red-400 text-xs mt-1"
                                >
                                  {(err as { message?: string }).message}
                                </p>
                              );
                            }

                            return null;
                          })}
                        </div>
                      )}
                    </form.Field>
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <form.Field name="email">
                    {(field) => (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
                          <input
                            id={field.name}
                            name={field.name}
                            type="email"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full pl-10 lg:pl-12 pr-3 lg:pr-4 py-2.5 lg:py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm lg:text-base"
                            placeholder="john.doe@example.com"
                            required
                          />
                        </div>
                        {field.state.meta.errors.map((error, i) => {
                          const err = error as unknown;

                          if (typeof err === "string") {
                            return (
                              <p key={i} className="text-red-400 text-xs mt-1">
                                {err}
                              </p>
                            );
                          }

                          if (
                            typeof err === "object" &&
                            err !== null &&
                            "message" in err
                          ) {
                            return (
                              <p key={i} className="text-red-400 text-xs mt-1">
                                {(err as { message?: string }).message}
                              </p>
                            );
                          }

                          return null;
                        })}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Password Input */}
                <div>
                  <form.Field name="password">
                    {(field) => (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
                          <input
                            id={field.name}
                            name={field.name}
                            type={showPassword ? "text" : "password"}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-2.5 lg:py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm lg:text-base"
                            placeholder="Create a strong password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" />
                            ) : (
                              <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                            )}
                          </button>
                        </div>
                        {field.state.meta.errors.map((error, i) => {
                          const err = error as unknown;

                          if (typeof err === "string") {
                            return (
                              <p key={i} className="text-red-400 text-xs mt-1">
                                {err}
                              </p>
                            );
                          }

                          if (
                            typeof err === "object" &&
                            err !== null &&
                            "message" in err
                          ) {
                            return (
                              <p key={i} className="text-red-400 text-xs mt-1">
                                {(err as { message?: string }).message}
                              </p>
                            );
                          }

                          return null;
                        })}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Confirm Password Input */}
                <div>
                  <form.Field name="confirmPassword">
                    {(field) => (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
                          <input
                            id={field.name}
                            name={field.name}
                            type={showConfirmPassword ? "text" : "password"}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full pl-10 lg:pl-12 pr-10 lg:pr-12 py-2.5 lg:py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm lg:text-base"
                            placeholder="Confirm your password"
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
                              <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" />
                            ) : (
                              <Eye className="w-4 h-4 lg:w-5 lg:h-5" />
                            )}
                          </button>
                        </div>
                        {field.state.meta.errors.map((error, i) => {
                          const err = error as unknown;

                          if (typeof err === "string") {
                            return (
                              <p key={i} className="text-red-400 text-xs mt-1">
                                {err}
                              </p>
                            );
                          }

                          if (
                            typeof err === "object" &&
                            err !== null &&
                            "message" in err
                          ) {
                            return (
                              <p key={i} className="text-red-400 text-xs mt-1">
                                {(err as { message?: string }).message}
                              </p>
                            );
                          }

                          return null;
                        })}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 lg:space-y-4">
                  <form.Field name="agreeToTerms">
                    {(field) => (
                      <div>
                        <label className="flex items-start">
                          <input
                            type="checkbox"
                            checked={field.state.value}
                            onChange={(e) =>
                              field.handleChange(e.target.checked)
                            }
                            className="w-4 h-4 text-purple-500 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2 mt-0.5 flex-shrink-0"
                            required
                          />
                          <span className="ml-3 text-xs lg:text-sm text-slate-300">
                            I agree to the{" "}
                            <a
                              href="#"
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="#"
                              className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                        {field.state.meta.errors.map((error, i) => {
                          const err = error as unknown;

                          if (typeof err === "string") {
                            return (
                              <p key={i} className="text-red-400 text-xs mt-1">
                                {err}
                              </p>
                            );
                          }

                          if (
                            typeof err === "object" &&
                            err !== null &&
                            "message" in err
                          ) {
                            return (
                              <p key={i} className="text-red-400 text-xs mt-1">
                                {(err as { message?: string }).message}
                              </p>
                            );
                          }

                          return null;
                        })}
                      </div>
                    )}
                  </form.Field>
                </div>

                {/* Submit Button */}
                <form.Subscribe>
                  {(state) => (
                    <button
                      type="submit"
                      disabled={!state.canSubmit || state.isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold text-base lg:text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {state.isSubmitting
                        ? "Creating Account..."
                        : "Create Account"}
                      {!state.isSubmitting && (
                        <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                      )}
                    </button>
                  )}
                </form.Subscribe>
              </form>

              <div className="text-center mt-4 lg:mt-6 text-slate-400">
                <span className="text-sm">Already have an account? </span>
                <button
                  onClick={onSwitchToSignIn}
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors text-sm"
                >
                  Sign in here
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 lg:mt-16 text-center">
          <p className="text-slate-400 mb-6 lg:mb-8 text-sm lg:text-base">
            Trusted by thousands of users worldwide
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-12 opacity-50">
            <div className="text-lg lg:text-2xl font-bold">256-bit SSL</div>
            <div className="hidden sm:block w-px h-6 bg-slate-600"></div>
            <div className="text-lg lg:text-2xl font-bold">GDPR Compliant</div>
            <div className="hidden sm:block w-px h-6 bg-slate-600"></div>
            <div className="text-lg lg:text-2xl font-bold">SOC 2 Certified</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
