"use client"

import { useState } from "react"
import CartStep from "./CartStep"
import DeliveryStep from "./DeliveryStep"
import PaymentStep from "./PaymentStep"
import ThankYouStep from "./ThankYouStep"
import OrderSummary from "./OrderSummary"
import ProgressStepper from "./ProgressStepper"
import { useRouter } from 'next/navigation'
import { useCart, useRemoveFromCart, useUpdateCartQuantity } from '@/utils/api/hooks/basket'
import Loading from '@/components/loading'

const stepList = ["cart", "delivery", "payment", "thankyou"] as const;
type StepKey = typeof stepList[number];

export default function CartPage() {
  const [step, setStep] = useState<StepKey>("cart");
  const router = useRouter();

  const { data, isLoading, error } = useCart({ params: {}, payload: {} });
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartMutation = useUpdateCartQuantity();

  const [addressInput, setAddressInput] = useState("");
  const [country, setCountry] = useState("");
  const [cityState, setCityState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<"cod" | "credit" | "debit" | null>(null);

  const cartItems = data?.payload?.items || [];
  const cart = cartItems.map((item: any) => ({
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    currency: item.product.currency,
    image: item.product.thumbnail,
    color: "Default",
    size: "",
    inStock: true
  }));

  const appliedDiscount = 4.5;
  const subtotal = cart.reduce((t: number, i: any) => t + i.price * i.quantity, 0);
  const shipping = 4;
  const total = Math.max(subtotal + shipping - appliedDiscount, 0);
  const stepIndex = stepList.indexOf(step);

  // Update quantity handler
  const updateQuantity = (id: string, productId: string, newQty: number) => {
    if (newQty < 1) return;
    updateCartMutation.mutate({ itemId: productId, quantity: newQty });
  };

  // Remove item handler
  const removeItem = (productId: string) => {
    removeFromCartMutation.mutate({ itemId: productId });
  };

  // Clear cart handler
  const clearCart = () => {
    cart.forEach((item: any) => {
      removeFromCartMutation.mutate({ itemId: item.productId });
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Error Loading Cart</h2>
          <p className="text-red-600 mb-4">{error.toString()}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-8 flex flex-col items-center">
      <ProgressStepper currentStep={stepIndex} />
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto">
        <div className="flex-1 min-w-0">
          {step === "cart" && (
            <CartStep
              cart={cart}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              clearCart={clearCart}
              onNext={() => setStep("delivery")}
            />
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
