import { useState, useEffect } from "react"
import { Loader2, Shield, CreditCard, Truck } from "lucide-react"
import AnimateOnViewOnce from "@/components/AnimateOnViewOnce";

export default function PaymentStep({
  total,
  selectedPayment,
  setSelectedPayment,
  onBack,
  onNext,
  isProcessing
}: any) {
  const [card, setCard] = useState({ num: "", name: "", month: "", year: "", cvv: "" });

  useEffect(() => {
    if (!selectedPayment) {
      setSelectedPayment("CASH_ON_DELIVERY");
    }
  }, [selectedPayment, setSelectedPayment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="bg-white border border-gray-300 px-4 lg:px-8 py-10 shadow-sm">
      <h1 className="relative inline-block mb-8" style={{ ["--underline-color" as any]: "#FDB3CA" }}>
        <span className="relative z-10 text-3xl font-medium tracking-tight">Payment Information</span>
        <span className="absolute bottom-0 left-0 right-0 h-[12px] bg-[var(--underline-color)]" aria-hidden="true" />
      </h1>

      <div className="flex gap-4 sm:gap-10 flex-col md:flex-row">
        <div className="flex-1 min-w-[300px]">
          {/* Payment method selector with elegant styling */}
          <div className="flex flex-col items-center gap-6 mb-10 border-b border-gray-100 pb-6">
            <div className="flex gap-6 flex-wrap justify-center w-full">
              <button
                className="py-3 px-5 transition-all relative cursor-pointer"
                onClick={() => setSelectedPayment("CARD")}
              >
                <span
                  className={`relative cursor-pointer text-sm uppercase tracking-wide transition-colors duration-200 nav-link-animate ${
                    selectedPayment === "CARD" ? "active text-[#28a745] font-medium" : "text-gray-500"
                  }`}
                  style={{
                    ["--underline-color" as any]: "#a4d7b0",
                    ["--underline-offset" as any]: "5px"
                  }}
                >
                  <CreditCard className={`w-4 h-4 inline-block mr-2 ${selectedPayment === "CARD" ? "text-green-500" : "text-gray-400"}`} />
                  Credit/Debit Card
                </span>
              </button>
              <button
                className="py-3 px-5 transition-all relative cursor-pointer"
                onClick={() => setSelectedPayment("PAYPAL")}
              >
                <span
                  className={`relative cursor-pointer text-sm uppercase tracking-wide transition-colors duration-200 nav-link-animate ${
                    selectedPayment === "PAYPAL" ? "active text-[#416ccc] font-medium" : "text-gray-500"
                  }`}
                  style={{
                    ["--underline-color" as any]: "#A5C1FF",
                    ["--underline-offset" as any]: "5px"
                  }}
                >
                  <svg className={`w-4 h-4 inline-block mr-2 ${selectedPayment === "PAYPAL" ? "text-blue-500" : "text-gray-400"}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.384a.64.64 0 0 1 .632-.544h6.964c2.075 0 3.662.434 4.715 1.289.499.406.87.915 1.104 1.52.238.615.273 1.29.109 2.020l-.008.039v.367c-.901 4.551-3.713 6.9-8.356 6.9h-2.124c-.525 0-.974.376-1.055.897l-.799 5.479a.644.644 0 0 1-.636.546z" />
                    <path d="M19.713 7.139a.563.563 0 0 0-.74.048.578.578 0 0 0-.049.75 7.133 7.133 0 0 1-.465 8.54c-1.495 2.046-3.715 3.09-6.58 3.09H8.731a.572.572 0 0 0-.562.468L6.83 28.565a.571.571 0 0 0 .56.675h3.782c.466 0 .865-.34.937-.804l.039-.182.748-4.861.047-.26c.07-.465.47-.804.936-.804h.591c3.819 0 6.803-1.56 7.676-6.07.366-1.888.176-3.466-.79-4.574a3.284 3.284 0 0 0-.943-.873l-.1-.064" fill="#C0CCDA" />
                  </svg>
                  PayPal
                </span>
              </button>
            </div>
            <button
              className="py-3 px-5 transition-all relative cursor-pointer"
              onClick={() => setSelectedPayment("CASH_ON_DELIVERY")}
            >
              <span
                className={`relative cursor-pointer text-sm uppercase tracking-wide transition-colors duration-200 nav-link-animate ${
                  selectedPayment === "CASH_ON_DELIVERY" ? "active text-[#e69d00] font-medium" : "text-gray-500"
                }`}
                style={{
                  ["--underline-color" as any]: "#fbbc04",
                  ["--underline-offset" as any]: "5px"
                }}
              >
                <Truck className={`w-4 h-4 inline-block mr-2 ${selectedPayment === "CASH_ON_DELIVERY" ? "text-amber-500" : "text-gray-400"}`} />
                Cash on Delivery
              </span>
            </button>
          </div>

          {selectedPayment === "CASH_ON_DELIVERY" && (
            <div className="pb-6">
              <div className="mb-8 text-gray-600 text-sm bg-amber-50 border-l-4 border-amber-400 p-4">
                You will pay <b>cash</b> upon delivery to the address below. Our delivery personnel will accept exact payment.
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-bold py-4 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all border-l-4 border-yellow-500"
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)} (COD)`}
              </button>
            </div>
          )}

          {(selectedPayment === "CARD" || selectedPayment === "PAYPAL") && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              {selectedPayment === "CARD" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Cardholder Name</label>
                    <input
                      value={card.name}
                      required
                      onChange={e => setCard({ ...card, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Card Number</label>
                    <input
                      value={card.num}
                      required
                      maxLength={19}
                      onChange={e => setCard({ ...card, num: e.target.value })}
                      placeholder="1234 5678 9101 1121"
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-50"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label className="block text-gray-700 font-medium mb-2">Exp. Date</label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          required
                          maxLength={2}
                          value={card.month}
                          onChange={e => setCard({ ...card, month: e.target.value.replace(/[^0-9]/g, "") })}
                          placeholder="MM"
                          className="w-1/2 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-50 text-center"
                        />
                        <input
                          type="text"
                          required
                          maxLength={2}
                          value={card.year}
                          onChange={e => setCard({ ...card, year: e.target.value.replace(/[^0-9]/g, "") })}
                          placeholder="YY"
                          className="w-1/2 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-50 text-center"
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700 font-medium mb-2">CVV</label>
                      <input
                        type="password"
                        required
                        value={card.cvv}
                        maxLength={4}
                        onChange={e => setCard({ ...card, cvv: e.target.value.replace(/[^0-9]/g, "") })}
                        placeholder="CVV"
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 bg-gray-50"
                      />
                    </div>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-300 text-black text-lg font-bold py-4 mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all border-l-4 border-green-500"
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          )}
        </div>

        <div className="w-full md:w-96 flex flex-col gap-6">
          <div className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-700 p-5 shadow-sm">
            <div className="flex items-center gap-2 font-medium mb-3 text-gray-800">
              <Shield className="w-4 h-4 text-green-600" />
              Payment Security
            </div>
            <p className="text-gray-600">
              {selectedPayment === "CASH_ON_DELIVERY"
                ? "Your order will be confirmed immediately. Pay when you receive your items."
                : "Your payment information is secure and encrypted with industry-standard protection."}
            </p>
          </div>
          
       
        </div>
      </div>

      <button
        className="mt-12 cursor-pointer "
        onClick={onBack}
        disabled={isProcessing}
      >
         <AnimateOnViewOnce
                        delay={300}
                        className="link-highlight link-highlight-yellow"
                      >
                        <span className="relative z-10">Back to Delivery</span>
                      </AnimateOnViewOnce>
                      
      </button>
    </div>
  )
}
