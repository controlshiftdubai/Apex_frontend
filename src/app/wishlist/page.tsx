"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Heart, X, ShoppingCart, Share2, Trash2, ArrowRight } from 'lucide-react'

interface WishlistItem {
  id: string
  name: string
  price: number
  currency: string
  image: string
  inStock: boolean
  originalPrice?: number
  slug: string
  addedAt: string
}

const WishlistPage = () => {
  // Static wishlist data
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: '1',
      name: 'Premium Wireless Headphones with Noise Cancellation',
      price: 12999,
      currency: 'INR',
      image: '/product/product-image-1.jpg',
      inStock: true,
      originalPrice: 15999,
      slug: 'premium-wireless-headphones',
      addedAt: '2025-09-28'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch with Heart Rate Monitor',
      price: 8499,
      currency: 'INR',
      image: '/product/product-image-1.jpg',
      inStock: true,
      originalPrice: 10999,
      slug: 'smart-fitness-watch',
      addedAt: '2025-09-27'
    },
    {
      id: '3',
      name: 'Ultra HD 4K Action Camera Waterproof',
      price: 18999,
      currency: 'INR',
      image: '/product/product-image-1.jpg',
      inStock: false,
      originalPrice: 22999,
      slug: 'ultra-hd-action-camera',
      addedAt: '2025-09-25'
    },
    {
      id: '4',
      name: 'Portable Bluetooth Speaker with Deep Bass',
      price: 3999,
      currency: 'INR',
      image: '/product/product-image-1.jpg',
      inStock: true,
      slug: 'portable-bluetooth-speaker',
      addedAt: '2025-09-24'
    },
    {
      id: '5',
      name: 'Gaming Mechanical Keyboard RGB Backlit',
      price: 5499,
      currency: 'INR',
      image: '/product/product-image-1.jpg',
      inStock: true,
      originalPrice: 6999,
      slug: 'gaming-mechanical-keyboard',
      addedAt: '2025-09-23'
    },
    {
      id: '6',
      name: 'Wireless Charging Pad Fast Charge 15W',
      price: 1999,
      currency: 'INR',
      image: '/product/product-image-1.jpg',
      inStock: true,
      slug: 'wireless-charging-pad',
      addedAt: '2025-09-22'
    }
  ])

  const removeFromWishlist = (id: string) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (id: string) => {
    console.log('Added to cart:', id)
    // Add your cart logic here
  }

  const addAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock)
    console.log('Adding all in-stock items to cart:', inStockItems)
    // Add your cart logic here
  }

  const shareWishlist = () => {
    console.log('Sharing wishlist...')
    // Add share functionality
  }

  const calculateTotal = () => {
    return wishlistItems.reduce((total, item) => total + item.price, 0)
  }

  const calculateSavings = () => {
    return wishlistItems.reduce((total, item) => {
      if (item.originalPrice) {
        return total + (item.originalPrice - item.price)
      }
      return total
    }, 0)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your wishlist yet. Start browsing and save your favorite items!
            </p>
            <button className="px-8 py-3 bg-[#FDE68A] text-gray-900 font-semibold rounded-lg hover:bg-[#FBEF82] transition-colors cursor-pointer">
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1
                className="relative inline-block"
                style={{ ["--underline-color" as any]: "#F4FFCB" }}
              >
                <span className="relative z-10 text-4xl font-medium">My WishList</span>
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
                className="flex items-center gap-2 px-6 py-2 bg-[#FDE68A] text-gray-900 font-semibold hover:bg-[#FBEF82] transition-colors cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add All to Cart</span>
              </button>
            </div>
          </div>
        </div>


        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative aspect-[7/3] bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain group-hover:scale-110 transition-transform duration-500"
                />

                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all duration-200 cursor-pointer group/remove"
                  title="Remove from wishlist"
                >
                  <Heart className="w-5 h-5 text-red-500 fill-current group-hover/remove:scale-110 transition-transform" />
                </button>

                {/* Stock Status Badge */}
                {!item.inStock && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold">
                    Out of Stock
                  </div>
                )}

                {/* Discount Badge */}
                {item.originalPrice && (
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-[#FDE68A] text-gray-900 text-xs font-bold">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] hover:text-gray-600 cursor-pointer">
                  {item.name}
                </h3>

                {/* Price Section */}
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-xl font-bold text-gray-900">
                    {item.price} {item.currency}
                  </p>
                </div>

                {/* Added Date */}
                <p className="text-xs text-gray-500 mb-3">
                  Added {new Date(item.addedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className={`flex-1 flex items-center justify-center py-3 font-medium text-lg uppercase tracking-wide transition-all duration-200 ${item.inStock
                      ? 'text-gray-700 cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed opacity-50'
                      }`}
                  >
                    <ShoppingCart className="w-5 h-5 mb-1 relative z-10" />
                    <span
                      className="relative inline-block"
                      style={{ ["--underline-color" as any]: item.inStock ? "#F4FFCB" : "#E5E7EB" }}
                    >
                      <span className="relative z-10">Add to Cart</span>
                      <span
                        className="absolute bottom-0 h-[8px] bg-[var(--underline-color)]"
                        style={{ left: '-40px', right: '-30px' }}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex-1 flex items-center justify-center py-3 text-gray-500 font-medium text-md uppercase tracking-wide cursor-pointer transition-all duration-200"
                    title="Remove"
                  >
                    <Trash2 className="w-5 h-5 mb-1 relative z-10" />
                    <span
                      className="relative inline-block"
                      style={{ ["--underline-color" as any]: "#FCA5A5" }}
                    >
                      <span className="relative z-10">Remove</span>
                      <span
                        className="absolute bottom-0 h-[8px] bg-[var(--underline-color)]"
                        style={{ left: '-40px', right: '-30px' }}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>


              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="bg-white border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Wishlist Summary</h3>
              <p className="text-gray-600">
                Total Value: <span className="font-bold text-gray-900">{calculateTotal()} INR</span>
              </p>

            </div>
            <button
              onClick={addAllToCart}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#FDE68A] text-gray-900 font-semibold hover:bg-[#FBEF82] transition-colors cursor-pointer  "
            >
              <span>Move All to Cart</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <button className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer inline-flex items-center gap-2">
            <span>← Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistPage
