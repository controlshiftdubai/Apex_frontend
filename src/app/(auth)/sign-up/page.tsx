"use client";

import { AuthAPI } from "@/utils/api/handlers/auth";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      toast.error("Please enter a valid phone number");
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
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      };

      const result = await AuthAPI.userSignUp({ payload });

      if (!result.data.error) {
        toast.success(result.data.message || "Account created successfully! Please verify your email.");
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 2000);
      } else {
        toast.error(result.data.message || "Sign up failed");
      }
    } catch (error) {
      toast.error("An error occurred during sign up");
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 p-8 sm:p-10">
          <div className="mb-8">
            <h2 className="relative inline-block mb-3" style={{ ["--underline-color" as any]: "#FDB3CA" }}>
              <span className="relative z-10 text-3xl font-semibold">Sign Up</span>
              <span
                className="absolute bottom-0 h-[12px] bg-[var(--underline-color)]"
                style={{ left: '-8px', right: '-8px' }}
                aria-hidden="true"
              />
            </h2>
            <p className="text-gray-600 mt-3">Create your account to get started.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDB3CA] focus:border-[#FDB3CA] transition-colors"
                />
              </div>

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
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDB3CA] focus:border-[#FDB3CA] transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  autoComplete="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDB3CA] focus:border-[#FDB3CA] transition-colors"
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
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDB3CA] focus:border-[#FDB3CA] transition-colors"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full px-3 py-2 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDB3CA] focus:border-[#FDB3CA] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 border-gray-300 text-black focus:ring-[#FDB3CA] cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700 cursor-pointer"
              >
                I agree to the{" "}
                <a href="/terms" className="font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
