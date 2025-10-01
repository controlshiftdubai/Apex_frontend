import { Star, X, Check } from 'lucide-react'
import PriceRangeFilter from './PriceRangeFilter'
import { FilterState } from './SearchPageContent'

interface FilterSidebarProps {
  tempFilters: FilterState
  setTempFilters: (filters: FilterState) => void
  applyFilters: () => void
  clearFilters: () => void
  isMobile?: boolean
  onClose?: () => void
}

const colorOptions = [
  { value: 'red', label: 'Red', hex: '#EF4444' },
  { value: 'blue', label: 'Blue', hex: '#3B82F6' },
  { value: 'green', label: 'Green', hex: '#10B981' },
  { value: 'black', label: 'Black', hex: '#1F2937' },
  { value: 'white', label: 'White', hex: '#F3F4F6' },
  { value: 'yellow', label: 'Yellow', hex: '#F59E0B' },
  { value: 'purple', label: 'Purple', hex: '#8B5CF6' },
  { value: 'pink', label: 'Pink', hex: '#EC4899' },
  { value: 'orange', label: 'Orange', hex: '#F97316' },
  { value: 'gray', label: 'Gray', hex: '#6B7280' }
]

const brandOptions = [
  'Adidas', 'Columbia', 'Demix', 'New Balance', 'Nike', 'Xiaomi', 'Asics'
]

const FilterSidebar = ({
  tempFilters,
  setTempFilters,
  applyFilters,
  clearFilters,
  isMobile = false,
  onClose
}: FilterSidebarProps) => {
  const toggleColor = (color: string) => {
    const newColors = tempFilters.colors.includes(color)
      ? tempFilters.colors.filter(c => c !== color)
      : [...tempFilters.colors, color]
    setTempFilters({ ...tempFilters, colors: newColors })
  }

  const toggleBrand = (brand: string) => {
    const newBrands = tempFilters.brands.includes(brand)
      ? tempFilters.brands.filter(b => b !== brand)
      : [...tempFilters.brands, brand]
    setTempFilters({ ...tempFilters, brands: newBrands })
  }

  const updateRating = (rating: number) => {
    setTempFilters({ ...tempFilters, rating })
  }

  const updatePriceRange = (min: number, max: number) => {
    setTempFilters({ ...tempFilters, minPrice: min.toString(), maxPrice: max.toString() })
  }

  return (
    <div className={`${isMobile ? 'p-6' : ''} space-y-6`}>
      {/* Apply Filter Button */}
      <button
        onClick={applyFilters}
        className="px-6 py-3 text-gray-700 font-medium text-2xl uppercase tracking-wide w-70 cursor-pointer"
      >
        <p
          className="relative"
          style={{ ["--underline-color" as any]: "#FDE68A" }}
        >
          <span className="relative z-10 text-center">Apply Filter</span>
          <span
            className="absolute bottom-0 left-0 h-[14px] w-60 bg-[var(--underline-color)]"
            aria-hidden="true"
          />
        </p>
      </button>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-500 cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Price Range Filter */}
      <PriceRangeFilter
        min={Number(tempFilters.minPrice)}
        max={Number(tempFilters.maxPrice)}
        onChange={updatePriceRange}
      />

      {/* Star Rating Filter */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Star Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="radio"
                  name="rating"
                  checked={tempFilters.rating === rating}
                  onChange={() => updateRating(rating)}
                  className="w-4 h-4 text-[#FDE68A] border-gray-300 focus:ring-[#FDE68A] cursor-pointer"
                />
                {tempFilters.rating === rating && (
                  <Check className="w-3 h-3 text-[#FDE68A] absolute top-0.5 left-0.5 pointer-events-none " />
                )}
              </div>
              <div className="ml-3 flex items-center -mt-1.5">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                  {rating} Stars & up
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto scroll-hidden">
          {brandOptions.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={tempFilters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 text-[#FDE68A] border-gray-300 rounded focus:ring-[#FDE68A] cursor-pointer"
                />
                {tempFilters.brands.includes(brand) && (
                  <Check className="w-3 h-3 text-[#FDE68A] absolute top-0.5 left-0.5 pointer-events-none" strokeWidth={3} />
                )}
              </div>
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="border-b border-gray-200 pb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-4">Color</h4>
        <div className="grid grid-cols-5 gap-3">
          {colorOptions.map((color) => (
            <div key={color.value} className="flex flex-col items-center">
              <button
                onClick={() => toggleColor(color.value)}
                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 cursor-pointer ${tempFilters.colors.includes(color.value)
                  ? 'border-[#FDE68A] ring-2 ring-[#FDE68A] scale-110'
                  : 'border-gray-300 hover:border-gray-400'
                  }`}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              >
                {tempFilters.colors.includes(color.value) && (
                  <div className="w-full h-full rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white drop-shadow-lg" strokeWidth={3} />
                  </div>
                )}
              </button>
              <span className="text-xs text-gray-600 mt-1">{color.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={clearFilters}
        className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
      >
        Reset All Filters
      </button>
    </div>
  )
}

export default FilterSidebar
