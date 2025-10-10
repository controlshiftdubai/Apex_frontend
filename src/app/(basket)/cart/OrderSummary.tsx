import Image from "next/image"
import { ShoppingCart, Headphones, MessageCircle, Gift } from "lucide-react"

export default function OrderSummary({ cart, subtotal, shipping, discount, total, address, step }: any) {
  return (
    <div className="lg:w-[340px] w-full">
      <div className="bg-white border border-gray-300 w-full p-6 mb-6">
        <h2 className="relative inline-block uppercase  text-lg mb-5" style={{ ["--underline-color" as any]: "#FDB3CA" }}>
          <span className="relative z-10">Summary</span>
          <span className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]" aria-hidden="true" />
        </h2>
        <div className="text-xs text-gray-500 mb-1">{cart.length} items in your bag.</div>
        {cart.map((item: any) => (
          <div className="flex gap-3 items-center justify-between mb-3" key={item.id}>
            <div className="flex gap-2 items-center">
              <div className="w-12 h-16 relative">
                <Image src={item.image} alt={item.name} fill className="object-cover border border-gray-200" />
              </div>
              <div>
                <div className="font-medium leading-tight text-sm">{item.name}</div>
                <div className="text-xs text-gray-500">{item.color}</div>
              </div>
            </div>
            <div className="text-right font-bold text-sm">
              {item.currency === "USD" ? "$" : item.currency}{item.price.toFixed(2)}
            </div>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-3 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Cart Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping & Handling</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-500">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2 flex justify-between font-bold text-base">
            <span>Cart Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        {(step === "delivery" || step === "payment" || step === "thankyou") && address.addressInput && (
          <div className="border-t border-gray-200 pt-5 mt-5">
            <div className="font-semibold text-sm text-gray-600 mb-2">Shipment Address</div>
            <div className="text-xs text-gray-700">
              {address.addressInput}, {address.cityState}, {address.country}
              {address.zipCode ? `, ${address.zipCode}` : ""}
            </div>
          </div>
        )}
      </div>
      {(step === "cart" || step === "thankyou") && (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-100 p-4 flex flex-col items-center text-center border border-purple-200">
            <div className="w-12 h-12 bg-purple-200 flex items-center justify-center mb-2">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Free Shipping</h4>
            <p className="text-xs text-gray-600">Orders over $50 or more</p>
          </div>
          <div className="bg-yellow-100 p-4 flex flex-col items-center text-center border border-yellow-200">
            <div className="w-12 h-12 bg-yellow-200 flex items-center justify-center mb-2">
              <Headphones className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Call Us Anytime</h4>
            <p className="text-xs text-gray-600">+44 123 456 789</p>
          </div>
          <div className="bg-green-100 p-4 flex flex-col items-center text-center border border-green-200">
            <div className="w-12 h-12 bg-green-200 flex items-center justify-center mb-2">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Chat With Us</h4>
            <p className="text-xs text-gray-600">We offer 24-hour chat support</p>
          </div>
          <div className="bg-orange-100 p-4 flex flex-col items-center text-center border border-orange-200">
            <div className="w-12 h-12 bg-orange-200 flex items-center justify-center mb-2">
              <Gift className="w-6 h-6 text-orange-600" />
            </div>
            <h4 className="font-semibold text-sm mb-1">Gift Cards</h4>
            <p className="text-xs text-gray-600">For your loved one, in any amount</p>
          </div>
        </div>
      )}
    </div>
  )
}
