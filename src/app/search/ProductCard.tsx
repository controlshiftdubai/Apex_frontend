"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Heart, ShoppingCart, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Product } from './SearchPageContent'
import { useAddToCart, useRemoveFromCart, useAddToWishlist, useRemoveFromWishlist, useCart, useWishlist } from '@/utils/api/hooks/basket'
import { cn } from '@/lib/utils'
import AnimateOnViewOnce from "@/components/AnimateOnViewOnce";

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { data: cartData } = useCart({ params: {}, payload: {} })
  const { data: wishlistData } = useWishlist({ params: {}, payload: {} })

  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  const addToCartMutation = useAddToCart()
  const removeFromCartMutation = useRemoveFromCart()
  const addToWishlistMutation = useAddToWishlist()
  const removeFromWishlistMutation = useRemoveFromWishlist()

  useEffect(() => {
    const cartItems = cartData?.payload?.items || []
    const wishlistItems = wishlistData?.payload?.items || []

    setIsInCart(cartItems.some((item: any) => item.productId === product.id))
    setIsWishlisted(wishlistItems.some((item: any) => item.productId === product.id))
  }, [cartData, wishlistData, product.id])

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (addToWishlistMutation.isPending || removeFromWishlistMutation.isPending) return

    if (isWishlisted) {
      // Remove from wishlist
      removeFromWishlistMutation.mutate(
        { itemId: product.id },
        {
          onSuccess: () => {
            setIsWishlisted(false)
          },
          onError: (error) => {
            console.error('Error removing from wishlist:', error)
          }
        }
      )
    } else {
      // Add to wishlist
      addToWishlistMutation.mutate(
        { productId: product.id, quantity: 1 },
        {
          onSuccess: () => {
            setIsWishlisted(true)
          },
          onError: (error) => {
            console.error('Error adding to wishlist:', error)
          }
        }
      )
    }
  }

  const handleCartToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (addToCartMutation.isPending || removeFromCartMutation.isPending) return

    if (isInCart) {
      // Remove from cart
      removeFromCartMutation.mutate(
        { itemId: product.id },
        {
          onSuccess: () => {
            setIsInCart(false)
          },
          onError: (error) => {
            console.error('Error removing from cart:', error)
          }
        }
      )
    } else {
      // Add to cart
      addToCartMutation.mutate(
        { productId: product.id, quantity: 1 },
        {
          onSuccess: () => {
            setIsInCart(true)
          },
          onError: (error) => {
            console.error('Error adding to cart:', error)
          }
        }
      )
    }
  }

  const handleBuyNow = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (addToCartMutation.isPending) return

    addToCartMutation.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          window.location.href = '/cart'
        },
        onError: (error) => {
          console.error('Error adding to cart for buy now:', error)
        }
      }
    )
  }

  return (
    <div className="bg-white transition-all duration-300 overflow-hidden group border border-gray-100 hover:shadow-lg">
      <Link href={`/new-products/${product.id}`}>
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
            disabled={addToWishlistMutation.isPending || removeFromWishlistMutation.isPending}
            className="absolute top-3 right-14 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 cursor-pointer disabled:opacity-50"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {(addToWishlistMutation.isPending || removeFromWishlistMutation.isPending) ? (
              <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
            ) : isWishlisted ? (
              <Heart className="w-5 h-5 text-red-500 fill-current" />
            ) : (
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
          <button
            onClick={handleCartToggle}
            disabled={addToCartMutation.isPending || removeFromCartMutation.isPending}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 cursor-pointer disabled:opacity-50"
            aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
          >
            {(addToCartMutation.isPending || removeFromCartMutation.isPending) ? (
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
        <Link href={`/new-products/${product.id}`}>
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
            className="px-6 py-3 text-gray-900  text-base uppercase tracking-wide cursor-pointer  transition-colors "
          >
            <AnimateOnViewOnce delay={200} className="link-highlight link-highlight-yellow">
              <span className="relative z-10 flex items-center gap-2">
                {addToCartMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Buy Now
              </span>
            </AnimateOnViewOnce>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
