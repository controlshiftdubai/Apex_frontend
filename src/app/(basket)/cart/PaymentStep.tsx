import { useState, useEffect } from "react"
import Image from "next/image"

export default function PaymentStep({ total, selectedPayment, setSelectedPayment, onBack, onNext }: any) {
  const [processing, setProcessing] = useState(false);
  const [card, setCard] = useState({ num: "", name: "", month: "", year: "", cvv: "" });

  useEffect(() => {
    if (!selectedPayment) {
      setSelectedPayment("credit");
    }
  }, [selectedPayment, setSelectedPayment]);

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
                className={`py-2 px-5 font-semibold transition-all relative cursor-pointer ${selectedPayment === "credit" ? "text-[#28a745]" : "text-gray-500"
                  }`}
                onClick={() => setSelectedPayment("credit")}
              >
                <span className="relative inline-block uppercase text-sm">
                  <span className="relative z-10">Credit Card</span>
                  {selectedPayment === "credit" && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#a4d7b0]"
                      style={{ left: '-4px', right: '-4px' }}
                      aria-hidden="true"
                    />
                  )}
                </span>
              </button>
              <button
                className={`py-2 px-5 font-semibold transition-all relative cursor-pointer ${selectedPayment === "debit" ? "text-[#416ccc]" : "text-gray-500"
                  }`}
                onClick={() => setSelectedPayment("debit")}
              >
                <span className="relative inline-block uppercase text-sm">
                  <span className="relative z-10">Debit Card</span>
                  {selectedPayment === "debit" && (
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
              className={`py-2 px-5 font-semibold transition-all relative cursor-pointer ${selectedPayment === "cod" ? "text-[#e69d00]" : "text-gray-500"
                }`}
              onClick={() => setSelectedPayment("cod")}
            >
              <span className="relative inline-block uppercase text-sm">
                <span className="relative z-10">Cash on Delivery</span>
                {selectedPayment === "cod" && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#fbbc04]"
                    style={{ left: '-4px', right: '-4px' }}
                    aria-hidden="true"
                  />
                )}
              </span>
            </button>
          </div>
          {selectedPayment === "cod" && (
            <div className="pb-4">
              <div className="mb-6 text-gray-600 text-sm">
                You will pay <b>cash</b> upon delivery to the address below.
              </div>
              <button
                onClick={() => {
                  setProcessing(true)
                  setTimeout(() => { onNext(); setProcessing(false) }, 1200)
                }}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-bold py-3 mt-4 cursor-pointer"
                disabled={processing}
              >
                {processing ? "Processing..." : `Pay $${total.toFixed(2)} (COD)`}
              </button>
            </div>
          )}
          {(selectedPayment === "credit" || selectedPayment === "debit") && (
            <form className="space-y-4" onSubmit={e => {
              e.preventDefault();
              setProcessing(true);
              setTimeout(() => { onNext(); setProcessing(false); }, 1200)
            }}>
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
              <button
                className="w-full bg-green-400 hover:bg-green-300 text-black text-lg font-bold py-3 mt-4 cursor-pointer"
                disabled={processing}
              >
                {processing ? "Processing..." : `Pay $${total.toFixed(2)} (${selectedPayment === "credit" ? "Credit Card" : "Debit Card"})`}
              </button>
            </form>
          )}
        </div>
        <div className="w-full md:w-96 flex flex-col gap-6 items-center">
          <div className="w-full bg-gray-50 border text-sm text-gray-700 p-4 text-center">
            The card security code is a unique three or four digit number—printed on the front (Amex) or back (Visa/MasterCard) of your card.
          </div>
        </div>
      </div>
      <button className="mt-8 border border-gray-400 text-gray-700 py-2 px-6 font-semibold hover:bg-gray-100 transition-colors cursor-pointer" onClick={onBack}>
        Back to Delivery
      </button>
    </div>
  )
}
