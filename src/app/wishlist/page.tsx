"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'

const apiWishlist = {
  id: "68dd3f973925a01a0a357cb0",
  userId: "68dcda597bc9bc7d459084a1",
  type: "WISHLIST",
  createdAt: "2025-10-01T14:49:58.528Z",
  updatedAt: "2025-10-01T14:49:58.528Z",
  items: [
    {
      id: "68de1f96753e6a554d422fa5",
      basketId: "68dd3f973925a01a0a357cb0",
      productId: "68dbe1f1cb37483def256b11",
      quantity: 25,
      createdAt: "2025-10-02T06:45:42.679Z",
      updatedAt: "2025-10-02T06:45:42.679Z",
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
      id: "68de1f96753e6a554d422fa6",
      basketId: "68dd3f973925a01a0a357cb0",
      productId: "68dbe4fd5277631813553fcc",
      quantity: 1,
      createdAt: "2025-10-01T08:30:12.123Z",
      updatedAt: "2025-10-01T08:30:12.123Z",
      product: {
        id: "68dbe4fd5277631813553fcc",
        name: "Wireless Bluetooth Headphones Pro",
        price: 149.99,
        thumbnail: "https://example.com/headphones.png",
        currency: "USD",
        slug: "wireless-bluetooth-headphones-pro"
      }
    },
    {
      id: "68de1f96753e6a554d422fa7",
      basketId: "68dd3f973925a01a0a357cb0",
      productId: "68dbe4fd5277631813553fcd",
      quantity: 1,
      createdAt: "2025-09-30T12:15:32.456Z",
      updatedAt: "2025-09-30T12:15:32.456Z",
      product: {
        id: "68dbe4fd5277631813553fcd",
        name: "Smart Fitness Tracker Watch",
        price: 89.50,
        thumbnail: "https://example.com/watch.png",
        currency: "USD",
        slug: "smart-fitness-tracker-watch"
      }
    }
  ]
};

interface WishlistItem {
  id: string
  name: string
  price: number
  currency: string
  image: string
  inStock: boolean
  slug: string
  addedAt: string
  quantity: number
}

const WishlistPage = () => {
  const initialWishlist = apiWishlist.items.map(item => ({
    id: item.id,
    name: item.product.name,
    price: item.product.price,
    currency: item.product.currency,
    image: item.product.thumbnail,
    inStock: true,
    slug: item.product.slug,
    addedAt: item.createdAt,
    quantity: item.quantity
  }));

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlist);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (id: string) => {
    console.log('Added to cart:', id)
  }

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock)
    console.log('Adding all in-stock items to cart:', inStockItems)
  }

  const calculateTotal = () => {
    return wishlistItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your wishlist yet. Start browsing and save your favorite items!
            </p>
            <button className="px-8 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="relative inline-block" style={{ ["--underline-color" as any]: "#FDB3CA" }}>
                <span className="relative z-10 text-4xl font-medium">My Wishlist</span>
                <span
                  className="absolute bottom-0 h-[14px] bg-[var(--underline-color)]"
                  style={{ left: '-16px', right: '-16px' }}
                  aria-hidden="true"
                />
              </h1>
              <p className="text-gray-600 mt-2">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addAllToCart}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add All to Cart</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200"
            >
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white shadow-lg hover:bg-red-50 transition-all duration-200 cursor-pointer group/remove"
                  title="Remove from wishlist"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-current group-hover/remove:scale-110 transition-transform" />
                </button>
                {!item.inStock && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold">
                    Out of Stock
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] hover:text-gray-600 cursor-pointer text-lg">
                  {item.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-2xl font-bold text-gray-900">
                    {item.currency === "USD" ? "$" : item.currency}{item.price.toFixed(2)}
                  </p>
                  {item.quantity > 1 && (
                    <span className="text-sm text-gray-500">x {item.quantity}</span>
                  )}
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Added {new Date(item.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className={`w-full py-3 font-semibold uppercase tracking-wide transition-all duration-200 relative ${item.inStock
                      ? 'text-gray-900 cursor-pointer hover:bg-gray-50'
                      : 'text-gray-400 cursor-not-allowed opacity-50'
                      }`}
                  >
                    <span className="relative inline-block">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </span>
                      {item.inStock && (
                        <span
                          className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#A5C1FF]"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full py-3 text-gray-600 font-semibold uppercase tracking-wide cursor-pointer transition-all duration-200 hover:bg-gray-50 relative"
                    title="Remove"
                  >
                    <span className="relative inline-block">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </span>
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#FCA5A5]"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="relative inline-block mb-2" style={{ ["--underline-color" as any]: "#FDE68A" }}>
                <span className="relative z-10 text-xl font-semibold">Wishlist Summary</span>
                <span
                  className="absolute bottom-0 h-[10px] bg-[var(--underline-color)]"
                  style={{ left: '-8px', right: '-8px' }}
                  aria-hidden="true"
                />
              </h3>
              <p className="text-gray-600 mt-3">
                Total Value: <span className="font-bold text-gray-900 text-xl">
                  {wishlistItems[0]?.currency === "USD" ? "$" : wishlistItems[0]?.currency}{calculateTotal().toFixed(2)}
                </span>
              </p>
            </div>
            <button
              onClick={addAllToCart}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#FDE68A] text-gray-900 font-semibold hover:bg-[#FDD835] transition-colors cursor-pointer"
            >
              <span>Move All to Cart</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer inline-flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
