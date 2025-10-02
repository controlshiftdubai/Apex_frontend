"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Filter } from 'lucide-react'
import FilterSidebar from './FilterSidebar'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination'

export interface Product {
  id: string
  name: string
  slug: string
  thumbnail: string
  price: number
  currency: string
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  error: boolean
  message: string
  payload: {
    total: number
    totalPages: number
    pageSize: number
    page: number
    next: string | null
    previous: string | null
    results: Product[]
  }
}

export interface FilterState {
  search: string
  minPrice: string
  maxPrice: string
  colors: string[]
  brands: string[]
  rating: number
  page: number
}

const SearchPageContent = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    minPrice: searchParams.get('price__gte') || '',
    maxPrice: searchParams.get('price__lte') || '',
    colors: searchParams.get('color')?.split(',').filter(Boolean) || [],
    brands: searchParams.get('brand')?.split(',').filter(Boolean) || [],
    rating: parseInt(searchParams.get('rating') || '0'),
    page: parseInt(searchParams.get('page') || '1')
  })

  const [tempFilters, setTempFilters] = useState<FilterState>({
    search: filters.search,
    minPrice: filters.minPrice || '0',
    maxPrice: filters.maxPrice || '200000',
    colors: filters.colors,
    brands: filters.brands,
    rating: filters.rating,
    page: filters.page
  })

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const createQueryString = useCallback((params: Record<string, string>) => {
    const urlParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== '') {
        urlParams.set(key, value)
      }
    })
    return urlParams.toString()
  }, [])

  const updateURL = useCallback((newFilters: FilterState) => {
    const params: Record<string, string> = {}
    if (newFilters.search) params.search = newFilters.search
    if (newFilters.minPrice) params.price__gte = newFilters.minPrice
    if (newFilters.maxPrice) params.price__lte = newFilters.maxPrice
    if (newFilters.colors.length > 0) params.color = newFilters.colors.join(',')
    if (newFilters.brands.length > 0) params.brand = newFilters.brands.join(',')
    if (newFilters.rating > 0) params.rating = newFilters.rating.toString()
    if (newFilters.page > 1) params.page = newFilters.page.toString()
    const queryString = createQueryString(params)
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname
    router.push(newUrl, { scroll: false })
  }, [pathname, router, createQueryString])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params: Record<string, string> = {
        page: filters.page.toString()
      }
      if (filters.search) params.search = filters.search
      if (filters.minPrice) params.price__gte = filters.minPrice
      if (filters.maxPrice) params.price__lte = filters.maxPrice
      if (filters.colors.length > 0) params.color = filters.colors.join(',')
      if (filters.brands.length > 0) params.brand = filters.brands.join(',')
      if (filters.rating > 0) params.rating = filters.rating.toString()

      const queryString = createQueryString(params)
      const url = `https://apex-backend-five.vercel.app/api/products${queryString ? `?${queryString}` : ''}`
      const response = await fetch(url)
      const data: ApiResponse = await response.json()
      if (data.error) {
        throw new Error(data.message)
      }
      setProducts(data.payload.results)
      setTotalPages(data.payload.totalPages)
      setTotal(data.payload.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [filters, createQueryString])

  const updatePage = (page: number) => {
    const newFilters = { ...filters, page }
    setFilters(newFilters)
    setTempFilters({ ...tempFilters, page })
    updateURL(newFilters)
  }

  const applyFilters = () => {
    const newFilters: FilterState = {
      ...tempFilters,
      page: 1
    }
    setFilters(newFilters)
    updateURL(newFilters)
    setShowMobileFilters(false)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      search: '',
      minPrice: '',
      maxPrice: '',
      colors: [],
      brands: [],
      rating: 0,
      page: 1
    }
    const clearedTempFilters: FilterState = {
      search: '',
      minPrice: '0',
      maxPrice: '200000',
      colors: [],
      brands: [],
      rating: 0,
      page: 1
    }
    setFilters(clearedFilters)
    setTempFilters(clearedTempFilters)
    updateURL(clearedFilters)
  }

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Products</h1>
              <p className="text-sm text-gray-600 mt-1">
                {loading ? 'Loading...' : `${total} results found`}
              </p>
            </div>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-[#FDE68A] text-gray-900 rounded-lg hover:bg-[#FBEF82] transition-colors cursor-pointer"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white p-6 sticky top-24">
              <FilterSidebar
                tempFilters={tempFilters}
                setTempFilters={setTempFilters}
                applyFilters={applyFilters}
                clearFilters={clearFilters}
                isMobile={false}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <ProductGrid products={products} loading={loading} error={error} clearFilters={clearFilters} />
            {totalPages > 1 && (
              <Pagination currentPage={filters.page} totalPages={totalPages} onPageChange={updatePage} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm cursor-pointer"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          <div className="lg:hidden fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-2xl z-50 overflow-y-auto">
            <FilterSidebar
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
              applyFilters={applyFilters}
              clearFilters={clearFilters}
              isMobile={true}
              onClose={() => setShowMobileFilters(false)}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default SearchPageContent
