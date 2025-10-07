"use client";

import { useVerifyEmail, useResendVerification } from "@/utils/api/hooks/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { toast } from "sonner";
import { Mail, RefreshCw } from "lucide-react";

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const verifyEmail = useVerifyEmail();
  const resendVerification = useResendVerification();

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split("");
    setCode([...newCode, ...Array(6 - newCode.length).fill("")]);

    if (pastedData.length === 6) {
      document.getElementById(`code-5`)?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");

    if (verificationCode.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }

    try {
      const result = await verifyEmail.mutateAsync({
        email,
        code: verificationCode,
      });

      if (!result.error) {
        toast.success(result.message || "Email verified successfully!");
        setTimeout(() => {
          router.push("/sign-in");
        }, 1500);
      } else {
        toast.error(result.message || "Verification failed");
        setCode(["", "", "", "", "", ""]);
        document.getElementById("code-0")?.focus();
      }
    } catch (error: any) {
      toast.error(error?.message || "Verification failed");
      setCode(["", "", "", "", "", ""]);
      document.getElementById("code-0")?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const result = await resendVerification.mutateAsync({ email });

      if (!result.error) {
        toast.success(result.message || "Verification code sent!");
        setCanResend(false);
        setResendTimer(60);
      } else {
        toast.error(result.message || "Failed to resend code");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to resend code");
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
              <span className="relative z-10 text-3xl font-semibold">Verify Email</span>
              <span
                className="absolute bottom-0 h-[12px] bg-[var(--underline-color)]"
                style={{ left: '-8px', right: '-8px' }}
                aria-hidden="true"
              />
            </h2>

            <p className="text-gray-600 mt-3">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-gray-900 font-semibold">{email}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                Enter Verification Code
              </label>
              <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-semibold border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDB3CA] focus:border-[#FDB3CA] transition-colors"
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleVerify}
              disabled={verifyEmail.isPending || code.join("").length !== 6}
              className="w-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {verifyEmail.isPending ? "Verifying..." : "Verify Email"}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={!canResend || resendVerification.isPending}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <RefreshCw size={16} className={resendVerification.isPending ? "animate-spin" : ""} />
                {resendVerification.isPending
                  ? "Sending..."
                  : canResend
                    ? "Resend Code"
                    : `Resend in ${resendTimer}s`}
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => router.push("/sign-in")}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 w-32 mx-auto"></div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
