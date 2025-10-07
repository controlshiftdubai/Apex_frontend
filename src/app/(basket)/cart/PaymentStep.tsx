import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

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
    <div className="bg-white border border-gray-300 px-4 lg:px-6 py-8">
      <h1 className="relative inline-block mb-5" style={{ ["--underline-color" as any]: "#FDB3CA" }}>
        <span className="relative z-10 text-2xl font-semibold">Payment Information</span>
        <span className="absolute bottom-0 left-0 right-0 h-[12px] bg-[var(--underline-color)]" aria-hidden="true" />
      </h1>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex-1 min-w-[300px]">
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                className={`py-2 px-5 font-semibold transition-all relative cursor-pointer ${selectedPayment === "CARD" ? "text-[#28a745]" : "text-gray-500"
                  }`}
                onClick={() => setSelectedPayment("CARD")}
              >
                <span className="relative inline-block uppercase text-sm">
                  <span className="relative z-10">Credit/Debit Card</span>
                  {selectedPayment === "CARD" && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#a4d7b0]"
                      style={{ left: '-4px', right: '-4px' }}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </button>
              <button
                className={`py-2 px-5 font-semibold transition-all relative cursor-pointer ${selectedPayment === "PAYPAL" ? "text-[#416ccc]" : "text-gray-500"
                  }`}
                onClick={() => setSelectedPayment("PAYPAL")}
              >
                <span className="relative inline-block uppercase text-sm">
                  <span className="relative z-10">PayPal</span>
                  {selectedPayment === "PAYPAL" && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#A5C1FF]"
                      style={{ left: '-4px', right: '-4px' }}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </button>
            </div>
            <button
              className={`py-2 px-5 font-semibold transition-all relative cursor-pointer ${selectedPayment === "CASH_ON_DELIVERY" ? "text-[#e69d00]" : "text-gray-500"
                }`}
              onClick={() => setSelectedPayment("CASH_ON_DELIVERY")}
            >
              <span className="relative inline-block uppercase text-sm">
                <span className="relative z-10">Cash on Delivery</span>
                {selectedPayment === "CASH_ON_DELIVERY" && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#fbbc04]"
                    style={{ left: '-4px', right: '-4px' }}
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          </div>

          {selectedPayment === "CASH_ON_DELIVERY" && (
            <div className="pb-4">
              <div className="mb-6 text-gray-600 text-sm">
                You will pay <b>cash</b> upon delivery to the address below.
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-bold py-3 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)} (COD)`}
              </button>
            </div>
          )}

          {(selectedPayment === "CARD" || selectedPayment === "PAYPAL") && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {selectedPayment === "CARD" && (
                <>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Cardholder Name</label>
                    <input
                      value={card.name}
                      required
                      onChange={e => setCard({ ...card, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">Card Number</label>
                    <input
                      value={card.num}
                      required
                      maxLength={19}
                      onChange={e => setCard({ ...card, num: e.target.value })}
                      placeholder="1234 5678 9101 1121"
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block text-gray-700 font-medium mb-1">Exp. Date</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          maxLength={2}
                          value={card.month}
                          onChange={e => setCard({ ...card, month: e.target.value.replace(/[^0-9]/g, "") })}
                          placeholder="MM"
                          className="w-1/2 px-2 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                        <input
                          type="text"
                          required
                          maxLength={2}
                          value={card.year}
                          onChange={e => setCard({ ...card, year: e.target.value.replace(/[^0-9]/g, "") })}
                          placeholder="YY"
                          className="w-1/2 px-2 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                        />
                      </div>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-gray-700 font-medium mb-1">CVV</label>
                      <input
                        type="password"
                        required
                        value={card.cvv}
                        maxLength={4}
                        onChange={e => setCard({ ...card, cvv: e.target.value.replace(/[^0-9]/g, "") })}
                        placeholder="CVV"
                        className="w-full px-2 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                      />
                    </div>
                  </div>
                </>
              )}
              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-300 text-black text-lg font-bold py-3 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isProcessing}
              >
                {isProcessing && <Loader2 className="w-5 h-5 animate-spin" />}
                {isProcessing ? "Processing..." : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          )}
        </div>

        <div className="w-full md:w-96 flex flex-col gap-6 items-center">
          <div className="w-full bg-gray-50 border text-sm text-gray-700 p-4 text-center">
            {selectedPayment === "CASH_ON_DELIVERY"
              ? "Your order will be confirmed immediately. Pay when you receive your items."
              : "Your payment information is secure and encrypted."}
          </div>
        </div>
      </div>

      <button
        className="mt-8 border border-gray-400 text-gray-700 py-2 px-6 font-semibold hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50"
        onClick={onBack}
        disabled={isProcessing}
      >
        Back to Delivery
      </button>
    </div>
  )
}
