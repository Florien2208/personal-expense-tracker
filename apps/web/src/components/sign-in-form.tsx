import React, { useState } from "react";
import {
  DollarSign,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Star,
  Shield,
  Check,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Loader from "./loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginPageProps {
  onSwitchToSignUp?: () => void;
}

interface FormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToSignUp }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const { isPending } = authClient.useSession();

  const form = useForm<
    FormValues,
    any, // TFormMeta
    any, // TFieldMeta
    any, // TFieldValue
    any, // TFieldInputValue
    any, // TFieldError
    any, // TFieldStore
    any, // TFieldApi
    any, // TFormApi
    any
  >({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    onSubmit: async ({ value }) => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
            toast.success("Sign in successful");
          },
          onError: (error: any) => {
            toast.error(error.error.message);
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        rememberMe: z.boolean().optional(),
      }),
    },
  });

  if (isPending) {
    return <Loader />;
  }

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

          <div className="flex items-center space-x-4">
            <span className="text-slate-300">New to ExpenseTracker?</span>
            <Button
              onClick={onSwitchToSignUp}
              variant="outline"
              className="border-slate-600 px-4 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 text-white border bg-transparent"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm">Welcome Back</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent leading-tight">
              Welcome Back to
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ExpenseTracker
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-md">
              Continue your journey to financial freedom. Sign in to access your
              personalized dashboard.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">Secure & Encrypted</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">Protected Data</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-300">Premium Features</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-slate-400">
                  Enter your credentials to access your account
                </p>
              </div>

              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void form.handleSubmit();
                }}
                className="space-y-6"
              >
                {/* Email Input */}
                <div>
                  <form.Field name="email">
                    {(field) => (
                      <div>
                        <Label className="block text-sm font-semibold text-slate-300 mb-2">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input
                            type="email"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => field.handleChange(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            placeholder="Enter your email"
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
                        <Label className="block text-sm font-semibold text-slate-300 mb-2">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => field.handleChange(e.target.value)}
                            className="w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                            placeholder="Enter your password"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-0 h-auto bg-transparent hover:bg-transparent"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </Button>
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

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <form.Field name="rememberMe">
                    {(field) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="rememberMe"
                          checked={field.state.value}
                          onCheckedChange={(checked: boolean) =>
                            field.handleChange(checked)
                          }
                          className="w-4 h-4 text-purple-500 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                        />
                        <Label
                          htmlFor="rememberMe"
                          className="text-sm text-slate-300 cursor-pointer"
                        >
                          Remember me
                        </Label>
                      </div>
                    )}
                  </form.Field>
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors bg-transparent border-none p-0 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <form.Subscribe>
                  {(state) => (
                    <Button
                      type="submit"
                      disabled={!state.canSubmit || state.isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-white border-0"
                    >
                      {state.isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </form.Subscribe>
              </form>

              <div className="text-center mt-6 text-slate-400">
                <span>Don't have an account? </span>
                <Button
                  onClick={onSwitchToSignUp}
                  variant="link"
                  className="text-purple-400 hover:text-purple-300 font-semibold transition-colors p-0 h-auto"
                >
                  Sign up here
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
