import { CheckCircle2 } from "lucide-react"

export default function ThankYouStep({ onBackHome }: any) {
  return (
    <div className="bg-white border border-gray-200 w-full max-w-md mx-auto p-8">
      <div className="flex flex-col items-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
        <h1 className="relative inline-block mb-3" style={{ ["--underline-color" as any]: "#D1F5DB" }}>
          <span className="relative z-10 text-2xl font-semibold uppercase">Thank You!</span>
          <span className="absolute bottom-0 left-0 right-0 h-[12px] bg-[var(--underline-color)]" aria-hidden="true" />
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Your order has been placed. Check your email for confirmation.<br />
          Need help? Contact our support team anytime.
        </p>
        <button className="px-8 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer" onClick={onBackHome}>Back Home</button>
      </div>
    </div>
  )
}
