import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ThankYouStep({ onBackHome, orderId }: { onBackHome: () => void; orderId: string | null }) {
  return (
    <div className="bg-white border border-gray-300 p-8 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="text-gray-600 mb-2">
        Your order has been placed successfully.
      </p>
      {orderId && (
        <p className="text-sm text-gray-500 mb-6">
          Order ID: <span className="font-mono font-semibold">{orderId}</span>
        </p>
      )}
      {/* <p className="text-gray-600 mb-8">
        You will receive an email confirmation shortly.
      </p> */}
      <div className="flex gap-4 justify-center">
        <Link
          href={orderId ? `/account` : "/"}
          className="px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 cursor-pointer inline-block"
        >
          View Order Details
        </Link>
        <button
          onClick={onBackHome}
          className="px-6 py-3 border border-gray-400 text-gray-700 font-semibold hover:bg-gray-100 cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}
