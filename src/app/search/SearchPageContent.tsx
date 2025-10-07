"use client"

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Filter } from 'lucide-react'
import FilterSidebar from './FilterSidebar'
import ProductGrid from './ProductGrid'
import Pagination from './Pagination'
import { useProducts } from '@/utils/api/hooks/product'

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

  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const apiParams: Record<string, any> = {
    page: filters.page,
  }
  if (filters.search) apiParams.search = filters.search
  if (filters.minPrice) apiParams.price__gte = filters.minPrice
  if (filters.maxPrice) apiParams.price__lte = filters.maxPrice
  if (filters.colors.length > 0) apiParams.color = filters.colors.join(',')
  if (filters.brands.length > 0) apiParams.brand = filters.brands.join(',')
  if (filters.rating > 0) apiParams.rating = filters.rating

  const { data, isLoading, error } = useProducts({ params: apiParams, payload: {} })

  const products: Product[] = (data?.payload?.results || []).map((product: any) => ({
    ...product,
    createdAt: typeof product.createdAt === 'string'
      ? product.createdAt
      : new Date(product.createdAt).toISOString(),
    updatedAt: typeof product.updatedAt === 'string'
      ? product.updatedAt
      : new Date(product.updatedAt).toISOString(),
  }))

  const totalPages = data?.payload?.totalPages || 1
  const total = data?.payload?.total || 0

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Products</h1>
              <p className="text-sm text-gray-600 mt-1">
                {isLoading ? 'Loading...' : `${total} results found`}
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
            <ProductGrid
              products={products}
              loading={isLoading}
              error={error?.message || null}
              clearFilters={clearFilters}
            />
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
