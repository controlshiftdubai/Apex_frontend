import Image from "next/image"
import { Trash2, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useDebounce } from '@/utils/api/hooks/useDebounce';

interface CartStepProps {
  cart: any[];
  updateQuantity: (id: string, productId: string, newQty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  onNext: () => void;
  validateStock: () => boolean;
}

function QuantityInput({
  item,
  updateQuantity
}: {
  item: any;
  updateQuantity: (id: string, productId: string, newQty: number) => void;
}) {
  const [localQuantity, setLocalQuantity] = useState(item.quantity.toString());
  const debouncedQuantity = useDebounce(localQuantity, 800);

  useEffect(() => {
    setLocalQuantity(item.quantity.toString());
  }, [item.quantity]);

  useEffect(() => {
    const qty = parseInt(debouncedQuantity);
    if (!isNaN(qty) && qty !== item.quantity && qty > 0) {
      if (qty > item.stock) {
        toast.error(`Only ${item.stock} items available in stock`);
        setLocalQuantity(item.stock.toString());
        updateQuantity(item.id, item.productId, item.stock);
      } else {
        updateQuantity(item.id, item.productId, qty);
      }
    }
  }, [debouncedQuantity]);

  const handleDecrement = () => {
    const qty = parseInt(localQuantity) || 1;
    if (qty > 1) {
      setLocalQuantity((qty - 1).toString());
    }
  };

  const handleIncrement = () => {
    const qty = parseInt(localQuantity) || 0;
    if (qty < item.stock) {
      setLocalQuantity((qty + 1).toString());
    } else {
      toast.error(`Only ${item.stock} items available in stock`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only numbers
    if (value === '' || parseInt(value) <= item.stock) {
      setLocalQuantity(value);
    } else {
      toast.error(`Only ${item.stock} items available in stock`);
      setLocalQuantity(item.stock.toString());
    }
  };

  const handleBlur = () => {
    const qty = parseInt(localQuantity);
    if (isNaN(qty) || qty < 1) {
      setLocalQuantity('1');
    } else if (qty > item.stock) {
      setLocalQuantity(item.stock.toString());
    }
  };

  return (
    <div className="flex items-center justify-center border border-gray-200 w-fit mx-auto">
      <button
        onClick={handleDecrement}
        className="px-2 py-1 cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={parseInt(localQuantity) <= 1 || item.stock === 0}
      >
        -
      </button>
      <input
        type="text"
        value={localQuantity}
        onChange={handleInputChange}
        onBlur={handleBlur}
        className="w-12 text-center outline-none focus:bg-gray-50 transition-colors"
        disabled={item.stock === 0}
      />
      <button
        onClick={handleIncrement}
        className="px-2 py-1 cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={parseInt(localQuantity) >= item.stock || item.stock === 0}
      >
        +
      </button>
    </div>
  );
}

export default function CartStep({
  cart,
  updateQuantity,
  removeItem,
  clearCart,
  onNext,
  validateStock
}: CartStepProps) {
  const outOfStockItems = cart.filter((item: any) => item.stock === 0);
  const hasOutOfStock = outOfStockItems.length > 0;

  return (
    <div className="bg-white border border-gray-300 p-6">
      <h1 className="relative inline-block mb-6" style={{ ["--underline-color" as any]: "#A5C1FF" }}>
        <span className="relative z-10 text-2xl font-semibold">Shopping Bag</span>
        <span className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]" aria-hidden="true" />
      </h1>

      {/* ✅ Out of stock warning */}
      {hasOutOfStock && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 mb-1">Items Out of Stock</h3>
            <p className="text-sm text-red-700">
              The following items are out of stock. Please remove them or wait for restock to continue:
            </p>
            <ul className="mt-2 text-sm text-red-700">
              {outOfStockItems.map((item: any) => (
                <li key={item.id} className="flex items-center gap-2">
                  • {item.name}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-xs underline hover:text-red-900"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gray-500 mb-4">Your cart is empty.</div>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="uppercase text-sm text-gray-600 border-b border-gray-200">
                  <th className="font-medium text-left py-2">Product</th>
                  <th className="font-medium text-center py-2">Price</th>
                  <th className="font-medium text-center py-2">Qty</th>
                  <th className="font-medium text-center py-2">Stock</th>
                  <th className="font-medium text-right py-2">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item: any) => (
                  <tr
                    key={item.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 ${item.stock === 0 ? 'bg-red-50' : ''
                      }`}
                  >
                    <td className="flex gap-3 items-center py-3">
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={80}
                          className="object-cover border border-gray-200"
                        />
                        {item.stock === 0 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">OUT OF STOCK</span>
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-gray-500">Color: {item.color}</div>
                        {item.stock > 0 && item.stock < 10 && (
                          <div className="text-xs text-orange-600 font-medium mt-1">
                            Only {item.stock} left!
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-center font-medium">
                      {item.currency === "USD" ? "$" : item.currency}{item.price.toFixed(2)}
                    </td>
                    <td className="text-center">
                      <QuantityInput item={item} updateQuantity={updateQuantity} />
                    </td>
                    <td className="text-center">
                      <span className={`text-sm font-medium ${item.stock === 0 ? 'text-red-600' :
                        item.stock < 10 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                        {item.stock === 0 ? 'Out' : item.stock}
                      </span>
                    </td>
                    <td className="text-right font-bold text-[#A5C1FF]">
                      {item.currency === "USD" ? "$" : item.currency}{(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="text-right pl-4">
                      <button
                        className="text-red-500 cursor-pointer hover:text-red-700 text-sm"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="w-4 h-4 mr-1 inline" /> Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              className="text-gray-600 font-medium hover:text-black border border-gray-200 py-2 px-7 cursor-pointer hover:bg-gray-50"
              onClick={clearCart}
            >
              Clear Cart
            </button>
            <button
              className="bg-black text-white px-7 py-2 font-semibold hover:bg-gray-800 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={onNext}
              disabled={hasOutOfStock}
            >
              {hasOutOfStock ? "Remove Out of Stock Items" : "Next: Delivery"}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
