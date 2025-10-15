"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useWishlist, useRemoveFromWishlist } from '@/utils/api/hooks/basket'
import { toast } from 'sonner'
import Loading from '@/components/loading'
import { Trash2 } from 'lucide-react'

export default function WishlistSection() {
  const { data, isLoading } = useWishlist({ params: {}, payload: {} });
  const removeFromWishlistMutation = useRemoveFromWishlist();

  const wishlistItems = data?.payload?.items || [];
  const displayLimit = 6;
  const displayItems = wishlistItems.slice(0, displayLimit);
  const remainingCount = wishlistItems.length - displayLimit;

  const handleRemove = async (itemId: string) => {
    try {
      const result = await removeFromWishlistMutation.mutateAsync({ itemId });

      if (!result.error) {
        toast.success('Removed from wishlist');
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
          <span className="relative z-10 text-2xl font-semibold">My Wishlist</span>
        </h2>
        {wishlistItems.length > 0 && (
          <span className="text-sm text-gray-500">{wishlistItems.length} items</span>
        )}
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link
            href="/search"
            className="inline-block px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 cursor-pointer"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {displayItems.map((item: any) => (
              <div key={item.id} className="border border-gray-200 p-4 group relative">
                <Link href={`/new-products/${item.product.slug}`}>
                  <div className="w-full h-48 bg-gray-100 mb-4">
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <Link
                  href={`/new-products/${item.product.slug}`}
                  className="font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 cursor-pointer"
                >
                  {item.product.name}
                </Link>

                <p className="text-xl font-bold text-gray-900 mt-2">
                  ${item.product.price.toFixed(2)}
                </p>

                {item.product.stock > 0 ? (
                  <p className="text-sm text-green-600 mt-1">In Stock</p>
                ) : (
                  <p className="text-sm text-red-600 mt-1">Out of Stock</p>
                )}

                <button
                  onClick={() => handleRemove(item.productId)}
                  disabled={removeFromWishlistMutation.isPending}
                  className="absolute top-2 right-2 p-2 bg-white hover:bg-red-50 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>

          {remainingCount > 0 && (
            <div className="mb-6 p-4 bg-gray-50 border border-gray-200 text-center">
              <p className="text-gray-600">
                +{remainingCount} more {remainingCount === 1 ? 'item' : 'items'} in your wishlist
              </p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-6">
            <Link
              href="/wishlist"
              className="block w-full text-center px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {remainingCount > 0 ? `View All ${wishlistItems.length} Items` : 'Go to Wishlist'}
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
