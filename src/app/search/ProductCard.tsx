"use client"

import { useState } from 'react'
import Image from 'next/image'
import { HeartIcon, ShoppingCart, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Product } from './SearchPageContent'
import { useAddToCart, useAddToWishlist } from '@/utils/api/hooks/basket'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  const addToCartMutation = useAddToCart()
  const addToWishlistMutation = useAddToWishlist()

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isWishlisted) {
      setIsWishlisted(false)
      return
    }

    addToWishlistMutation.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          setIsWishlisted(true)
        },
      }
    )
  }

  const handleCartToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInCart) {
      setIsInCart(false)
      return
    }

    addToCartMutation.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          setIsInCart(true)
        },
      }
    )
  }

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCartMutation.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          window.location.href = '/cart'
        },
      }
    )
  }

  return (
    <div className="bg-white transition-all duration-300 overflow-hidden group border border-gray-100 hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button
            onClick={handleWishlistToggle}
            disabled={addToWishlistMutation.isPending}
            className="absolute top-3 right-14 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 cursor-pointer disabled:opacity-50"
          >
            {addToWishlistMutation.isPending ? (
              <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
            ) : isWishlisted ? (
              <HeartIcon className="w-5 h-5 text-red-500 fill-current" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
          <button
            onClick={handleCartToggle}
            disabled={addToCartMutation.isPending}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 cursor-pointer disabled:opacity-50"
          >
            {addToCartMutation.isPending ? (
              <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
            ) : isInCart ? (
              <ShoppingCart className="w-5 h-5 text-green-500 fill-current" />
            ) : (
              <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-green-500" />
            )}
          </button>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-auto hover:text-gray-600 cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-semibold text-gray-900">
            {product.currency === "USD" ? "$" : product.currency}{product.price.toFixed(2)}
          </p>
          <button
            onClick={handleBuyNow}
            disabled={addToCartMutation.isPending}
            className="px-6 py-3 text-gray-700 font-medium text-base uppercase tracking-wide cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <span
              className="relative inline-block"
              style={{ ["--underline-color" as any]: "#F4FFCB" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {addToCartMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Buy Now
              </span>
              <span
                className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]"
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
