"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useCart, useUpdateCartQuantity, useRemoveFromCart } from '@/utils/api/hooks/basket'
import { toast } from 'sonner'
import Loading from '@/components/loading'
import { Trash2, Minus, Plus } from 'lucide-react'

export default function CartSection() {
  const { data, isLoading } = useCart({ params: {}, payload: {} });
  const updateCartMutation = useUpdateCartQuantity();
  const removeFromCartMutation = useRemoveFromCart();

  const cartItems = data?.payload?.items || [];
  const displayLimit = 4;
  const displayItems = cartItems.slice(0, displayLimit);
  const remainingCount = cartItems.length - displayLimit;

  const subtotal = cartItems.reduce((sum: number, item: any) =>
    sum + (item.product.price * item.quantity), 0
  );

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    try {
      updateCartMutation.mutate({ itemId, quantity });
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update quantity');
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      const result = await removeFromCartMutation.mutateAsync({ itemId });

      if (!result.error) {
        toast.success('Removed from cart');
      } else {
        toast.error(result.message || 'Failed to remove item');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to remove item');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="relative inline-block">
          <span className="relative z-10 text-2xl font-semibold">Shopping Cart</span>
        </h2>
        {cartItems.length > 0 && (
          <span className="text-sm text-gray-500">{cartItems.length} items</span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link
            href="/search"
            className="inline-block px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 cursor-pointer"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {displayItems.map((item: any) => (
              <div key={item.id} className="flex gap-4 border border-gray-200 p-4 relative group">
                <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                  <Link href={`/products/${item.product.slug}`}>
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>

                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer"
                  >
                    {item.product.name}
                  </Link>

                  <p className="text-lg font-bold text-gray-900 mt-2">
                    ${item.product.price.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1 || updateCartMutation.isPending}
                        className="px-3 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        disabled={updateCartMutation.isPending}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-500">
                      Total: ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(item.productId)}
                  disabled={removeFromCartMutation.isPending}
                  className="absolute top-4 right-4 p-2 hover:bg-red-50 rounded-full cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            ))}
          </div>

          {remainingCount > 0 && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 text-center">
              <p className="text-gray-600">
                +{remainingCount} more {remainingCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-semibold">Subtotal:</span>
              <span className="text-2xl font-bold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="space-y-3">
              <Link
                href="/cart"
                className="block w-full text-center px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {remainingCount > 0 ? 'View Full Cart & Checkout' : 'Proceed to Checkout'}
              </Link>

              {remainingCount > 0 && (
                <Link
                  href="/cart"
                  className="block w-full text-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  View All {cartItems.length} Items
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
