"use client"

import { useState } from "react"
import CartStep from "./CartStep"
import DeliveryStep from "./DeliveryStep"
import PaymentStep from "./PaymentStep"
import ThankYouStep from "./ThankYouStep"
import OrderSummary from "./OrderSummary"
import ProgressStepper from "./ProgressStepper"
import { useRouter } from 'next/navigation'

const apiCart = {
  id: "68dd6cf0d0fc300c9015b718",
  userId: "68dcda597bc9bc7d459084a1",
  type: "CART",
  items: [
    {
      id: "68dd6cf0d0fc300c9015b719",
      basketId: "68dd6cf0d0fc300c9015b718",
      productId: "68dbe1f1cb37483def256b11",
      quantity: 25,
      product: {
        id: "68dbe1f1cb37483def256b11",
        name: "Zulay Kitchen Magia Clasica",
        price: 1056.58,
        thumbnail: "https://d33609liqwio9r.cloudfront.net/2025-09-30T13:49:16.054Z-Red%20and%20White%20Bordered%20Camera%20Day%20Social%20Media%20Graphic%20(4)%202.png",
        currency: "USD",
        slug: "zulay-kitchen-magia-clasica"
      }
    },
    {
      id: "68dd6d17d0fc300c9015b71a",
      basketId: "68dd6cf0d0fc300c9015b718",
      productId: "68dbe4fd5277631813553fcc",
      quantity: 50,
      product: {
        id: "68dbe4fd5277631813553fcc",
        name: "Elegant Wireless Earbuds",
        price: 89.99,
        thumbnail: "https://example.com/earbuds.png",
        currency: "USD",
        slug: "elegant-wireless-earbuds"
      }
    }
  ]
};

const stepList = ["cart", "delivery", "payment", "thankyou"] as const;
type StepKey = typeof stepList[number];

export default function CartPage() {
  const [step, setStep] = useState<StepKey>("cart");
  const router = useRouter();

  const initialCart = apiCart.items.map(item => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    currency: item.product.currency,
    image: item.product.thumbnail,
    color: "Default",
    size: "",
    inStock: true
  }));

  const [cart, setCart] = useState(initialCart);
  const [addressInput, setAddressInput] = useState("");
  const [country, setCountry] = useState("");
  const [cityState, setCityState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<"cod" | "credit" | "debit" | null>(null);

  const appliedDiscount = 4.5;
  const subtotal = cart.reduce((t, i) => t + i.price * i.quantity, 0);
  const shipping = 4;
  const total = Math.max(subtotal + shipping - appliedDiscount, 0);
  const stepIndex = stepList.indexOf(step);

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-8 flex flex-col items-center">
      <ProgressStepper currentStep={stepIndex} />
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto">
        <div className="flex-1 min-w-0">
          {step === "cart" && (
            <CartStep cart={cart} setCart={setCart} onNext={() => setStep("delivery")} />
          )}
          {step === "delivery" && (
            <DeliveryStep
              addressInput={addressInput}
              setAddressInput={setAddressInput}
              country={country}
              setCountry={setCountry}
              cityState={cityState}
              setCityState={setCityState}
              zipCode={zipCode}
              setZipCode={setZipCode}
              onBack={() => setStep("cart")}
              onNext={() => setStep("payment")}
            />
          )}
          {step === "payment" && (
            <PaymentStep
              total={total}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              onBack={() => setStep("delivery")}
              onNext={() => setStep("thankyou")}
            />
          )}
          {step === "thankyou" && (
            <ThankYouStep onBackHome={() => router.push('/')} />
          )}
        </div>
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          shipping={shipping}
          discount={appliedDiscount}
          total={total}
          address={{ addressInput, cityState, country, zipCode }}
          step={step}
        />
      </div>
    </div>
  )
}
