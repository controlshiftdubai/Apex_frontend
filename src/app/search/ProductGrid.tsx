import { Search } from 'lucide-react'
import ProductCard from './ProductCard'
import { Product } from './SearchPageContent'

interface ProductGridProps {
  products: Product[]
  loading: boolean
  error: string | null
  clearFilters: () => void
}

const ProductGrid = ({ products, loading, error, clearFilters }: ProductGridProps) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200  p-4 mb-6">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white  shadow-sm overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200  mb-2"></div>
              <div className="h-4 bg-gray-200  w-2/3 mb-3"></div>
              <div className="h-10 bg-gray-200 "></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <Search className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
        <button
          onClick={clearFilters}
          className="px-6 py-2 bg-[#FDE68A] text-gray-900  hover:bg-[#FBEF82] transition-colors cursor-pointer"
        >
          Clear All Filters
        </button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
