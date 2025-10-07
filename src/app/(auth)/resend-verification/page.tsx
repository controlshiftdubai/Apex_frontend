"use client";

import { useResendVerification } from "@/utils/api/hooks/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

export default function ResendVerificationPage() {
  const router = useRouter();
  const resendVerification = useResendVerification();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const result = await resendVerification.mutateAsync({ email });

      if (!result.error) {
        toast.success(result.message || "Verification code sent!");
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(result.message || "Failed to send verification code");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to send verification code");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white border border-gray-300 p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto w-16 h-16 bg-[#FDB3CA] bg-opacity-10 flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-[#FDB3CA]" />
            </div>

            <h2 className="relative inline-block mb-3" style={{ ["--underline-color" as any]: "#FDB3CA" }}>
              <span className="relative z-10 text-3xl font-semibold">Resend Verification</span>
              <span
                className="absolute bottom-0 h-[12px] bg-[var(--underline-color)]"
                style={{ left: '-8px', right: '-8px' }}
                aria-hidden="true"
              />
            </h2>

            <p className="text-gray-600 mt-3">
              Enter your email to receive a new verification code
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDB3CA] focus:border-[#FDB3CA] transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={resendVerification.isPending}
              className="w-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {resendVerification.isPending ? "Sending..." : "Send Verification Code"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Remember your credentials?{" "}
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
