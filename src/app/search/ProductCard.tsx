"use client"

import { useState } from 'react'
import Image from 'next/image'
import { HeartIcon } from 'lucide-react'
import Link from 'next/link'
import { Product } from './SearchPageContent'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="bg-white transition-all duration-300 overflow-hidden group border border-gray-100">
      <Link href={`products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 cursor-pointer"
          >
            {isWishlisted ? (
              <HeartIcon className="w-5 h-5 text-red-500 fill-current" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
        </div>
      </Link>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-auto">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-semibold text-gray-900">
            {product.price} {product.currency}
          </p>
          <button
            // onClick={handleBuyNow}
            className="px-6 py-3 text-gray-700 font-medium text-base uppercase tracking-wide cursor-pointer"
          >
            <p
              className="relative inline-block"
              style={{ ["--underline-color" as any]: "#F4FFCB" }}
            >
              <span className="relative z-10">BUY Now</span>
              <span
                className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]"
                aria-hidden="true"
              />
            </p>
          </button>
        </div>


      </div>
    </div>

  )
}

export default ProductCard
