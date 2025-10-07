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
import { useCreateOrder } from '@/utils/api/hooks/order'
import Loading from '@/components/loading'
import { toast } from 'sonner'
import { PaymentMethod } from '@/types/order'

const stepList = ["cart", "delivery", "payment", "thankyou"] as const;
type StepKey = typeof stepList[number];

export default function CartPage() {
  const [step, setStep] = useState<StepKey>("cart");
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();

  const { data, isLoading, error } = useCart({ params: {}, payload: {} });
  const removeFromCartMutation = useRemoveFromCart();
  const updateCartMutation = useUpdateCartQuantity();
  const createOrderMutation = useCreateOrder();

  const [addressInput, setAddressInput] = useState("");
  const [country, setCountry] = useState("");
  const [cityState, setCityState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(PaymentMethod.CASH_ON_DELIVERY);

  const cartItems = data?.payload?.items || [];
  const cart = cartItems.map((item: any) => ({
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    currency: item.product.currency,
    image: item.product.thumbnail,
    stock: item.product.stock,
    color: "Default",
    size: "",
    inStock: item.product.stock > 0
  }));

  const appliedDiscount = 0;
  const subtotal = cart.reduce((t: number, i: any) => t + i.price * i.quantity, 0);
  const shipping = 50;
  const total = Math.max(subtotal + shipping - appliedDiscount, 0);
  const stepIndex = stepList.indexOf(step);

  const validateStock = () => {
    const outOfStockItems = cart.filter((item: any) => item.stock === 0);
    if (outOfStockItems.length > 0) {
      const itemNames = outOfStockItems.map((item: any) => item.name).join(", ");
      toast.error(`Out of stock: ${itemNames}. Please remove or wait for restock.`);
      return false;
    }

    const insufficientStockItems = cart.filter((item: any) => item.quantity > item.stock);
    if (insufficientStockItems.length > 0) {
      const itemNames = insufficientStockItems.map((item: any) =>
        `${item.name} (Available: ${item.stock})`
      ).join(", ");
      toast.error(`Insufficient stock: ${itemNames}`);
      return false;
    }

    return true;
  };

  const updateQuantity = (id: string, productId: string, newQty: number) => {
    if (newQty < 1) return;

    const item = cart.find((i: any) => i.productId === productId);
    if (item && newQty > item.stock) {
      toast.error(`Only ${item.stock} items available in stock`);
      return;
    }

    updateCartMutation.mutate({ itemId: productId, quantity: newQty });
  };

  const removeItem = (productId: string) => {
    removeFromCartMutation.mutate({ itemId: productId });
  };

  const clearCart = () => {
    cart.forEach((item: any) => {
      removeFromCartMutation.mutate({ itemId: item.productId });
    });
  };

  const handleCartNext = () => {
    if (!validateStock()) return;
    setStep("delivery");
  };

  const handlePayment = async () => {
    if (!validateStock()) return;

    const deliveryNotes = `
      Address: ${addressInput}
      City/State: ${cityState}
      Country: ${country}
      ${zipCode ? `ZIP: ${zipCode}` : ''}
    `.trim();

    try {
      const result = await createOrderMutation.mutateAsync({
        paymentMethod: selectedPayment,
        notes: deliveryNotes,
        shippingFee: shipping,
        discount: appliedDiscount,
      });

      if (!result.error) {
        setOrderId(result.payload?.order?.id || null);

        if (result.payload?.requiresPayment) {
          // For online payments, you might redirect to payment gateway
          toast.info("Redirecting to payment gateway...");
          // Handle online payment here
        }

        toast.success("Order placed successfully!");
        setStep("thankyou");
      } else {
        toast.error(result.message || "Failed to create order");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to create order");
    }
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
              onNext={handleCartNext}
              validateStock={validateStock}
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
              onNext={handlePayment}
              isProcessing={createOrderMutation.isPending}
            />
          )}
          {step === "thankyou" && (
            <ThankYouStep
              onBackHome={() => router.push('/')}
              orderId={orderId}
            />
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
