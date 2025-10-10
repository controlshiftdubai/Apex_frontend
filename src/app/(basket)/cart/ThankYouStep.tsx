import AnimateOnViewOnce from "@/components/AnimateOnViewOnce";
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ThankYouStep({ onBackHome, orderId }: { onBackHome: () => void; orderId: string | null }) {
  return (
    <div className="bg-white border border-gray-300 p-8 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-20 h-20 text-green-500" />
      </div>
      <h1 className="text-3xl  mb-4">Thank You for Your Order!</h1>
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
          className=" cursor-pointer inline-block"
        >
          <AnimateOnViewOnce
                      delay={1700}
                      className="link-highlight link-highlight-yellow"
                    >
                      <span className="!cursor-pointer px-5 relative inline-block text-lg md:text-[22px] text-black">
                        View Order Details
                      </span>
                    </AnimateOnViewOnce>
        </Link>
        <button
          onClick={onBackHome}
          className=" cursor-pointer"
        >
         <AnimateOnViewOnce
                     delay={1700}
                     className="link-highlight link-highlight-yellow"
                   >
                     <span className="!cursor-pointer px-5 relative inline-block text-lg md:text-[22px] text-black">
                       Continue Shopping
                     </span>
                   </AnimateOnViewOnce>

        </button>
      </div>
    </div>
  )
}
