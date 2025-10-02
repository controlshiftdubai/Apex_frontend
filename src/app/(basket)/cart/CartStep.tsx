import Image from "next/image"
import { Trash2 } from "lucide-react"

export default function CartStep({ cart, setCart, onNext }: any) {
  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCart((c: any) => c.map((ci: any) => ci.id === id ? { ...ci, quantity: newQty } : ci));
  };
  const removeItem = (id: string) => setCart((c: any) => c.filter((ci: any) => ci.id !== id));

  return (
    <div className="bg-white border border-gray-300 p-6">
      <h1 className="relative inline-block mb-6" style={{ ["--underline-color" as any]: "#A5C1FF" }}>
        <span className="relative z-10 text-2xl font-semibold">Shopping Bag</span>
        <span className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]" aria-hidden="true" />
      </h1>
      {cart.length === 0 ? (
        <div className="text-gray-500 text-center py-10">Your cart is empty.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="uppercase text-sm text-gray-600 border-b border-gray-200">
                  <th className="font-medium text-left py-2">Product</th>
                  <th className="font-medium text-center py-2">Price</th>
                  <th className="font-medium text-center py-2">Qty</th>
                  <th className="font-medium text-right py-2">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: any) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="flex gap-3 items-center py-3">
                      <Image src={item.image} alt={item.name} width={60} height={80} className="object-cover border border-gray-200" />
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-gray-500">Color: {item.color}</div>
                      </div>
                    </td>
                    <td className="text-center font-medium">{item.price.toFixed(2)} {item.currency}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-center border border-gray-200 w-fit mx-auto">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 cursor-pointer" disabled={item.quantity <= 1}>-</button>
                        <span className="px-3">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 cursor-pointer">+</button>
                      </div>
                    </td>
                    <td className="text-right font-bold text-[#A5C1FF]">{(item.price * item.quantity).toFixed(2)} {item.currency}</td>
                    <td className="text-right pl-4">
                      <button className="text-red-500 cursor-pointer" onClick={() => removeItem(item.id)}>
                        <Trash2 className="w-4 h-4 mr-1 inline" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button className="text-gray-600 font-medium hover:text-black border border-gray-200 py-2 px-7 cursor-pointer" onClick={() => setCart([])}>Clear Cart</button>
            <button className="bg-black text-white px-7 py-2 font-semibold hover:bg-gray-800 cursor-pointer" onClick={onNext}>Next: Delivery</button>
          </div>
        </>
      )}
    </div>
  )
}
