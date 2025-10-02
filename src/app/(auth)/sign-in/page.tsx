"use client";

import { AuthAPI } from "@/utils/api/handlers/auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await AuthAPI.userSignIn({ payload: formData });

      if (!result.data.error) {
        toast.success(result.data.message || "Login successful!");
        window.location.href = "/";
      } else {
        toast.error(result.data.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="relative inline-block mb-3" style={{ ["--underline-color" as any]: "#A5C1FF" }}>
              <span className="relative z-10 text-3xl font-semibold">Sign In</span>
              <span
                className="absolute bottom-0 h-[12px] bg-[var(--underline-color)]"
                style={{ left: '-8px', right: '-8px' }}
                aria-hidden="true"
              />
            </h2>
            <p className="text-gray-600 mt-3">Welcome back! Please sign in to continue.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A5C1FF] focus:border-[#A5C1FF] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A5C1FF] focus:border-[#A5C1FF] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 text-black focus:ring-[#A5C1FF] cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-gray-700 hover:text-black transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div> */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
