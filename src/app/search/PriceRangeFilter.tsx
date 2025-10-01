"use client"

import { useState, useRef, useEffect } from 'react'

interface PriceRangeFilterProps {
  min: number
  max: number
  currency?: string
  onChange: (min: number, max: number, currency: string) => void
  absoluteMin?: number
  absoluteMax?: number
}

type Currency = {
  code: string
  symbol: string
  name: string
}

const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal' }
]

const PriceRangeFilter = ({
  min,
  max,
  currency = 'USD',
  onChange,
  absoluteMin = 0,
  absoluteMax = 200000
}: PriceRangeFilterProps) => {
  const [localMin, setLocalMin] = useState(min)
  const [localMax, setLocalMax] = useState(max)
  const [minInput, setMinInput] = useState(min.toString())
  const [maxInput, setMaxInput] = useState(max.toString())
  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLocalMin(min)
    setLocalMax(max)
    setMinInput(min.toString())
    setMaxInput(max.toString())
  }, [min, max])

  useEffect(() => {
    setSelectedCurrency(currency)
  }, [currency])

  const getCurrentCurrency = () => {
    return currencies.find(c => c.code === selectedCurrency) || currencies[0]
  }

  const getPercentage = (value: number) => {
    return ((value - absoluteMin) / (absoluteMax - absoluteMin)) * 100
  }

  const getValueFromPosition = (clientX: number) => {
    if (!sliderRef.current) return absoluteMin
    const rect = sliderRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
    return Math.round((percentage / 100) * (absoluteMax - absoluteMin) + absoluteMin)
  }

  const formatPrice = (value: number) => {
    const curr = getCurrentCurrency()
    return `${curr.symbol}${value.toLocaleString('en-IN')}`
  }

  const validateAndUpdate = (newMin: number, newMax: number) => {
    setError('')

    if (newMin < absoluteMin || newMin > absoluteMax) {
      setError(`Minimum price must be between ${formatPrice(absoluteMin)} and ${formatPrice(absoluteMax)}`)
      return false
    }

    if (newMax < absoluteMin || newMax > absoluteMax) {
      setError(`Maximum price must be between ${formatPrice(absoluteMin)} and ${formatPrice(absoluteMax)}`)
      return false
    }

    if (newMin > newMax) {
      setError('Minimum price cannot be greater than maximum price')
      return false
    }

    if (newMax < newMin) {
      setError('Maximum price cannot be less than minimum price')
      return false
    }

    setLocalMin(newMin)
    setLocalMax(newMax)
    onChange(newMin, newMax, selectedCurrency)
    return true
  }

  const handleCurrencyChange = (newCurrency: string) => {
    setSelectedCurrency(newCurrency)
    onChange(localMin, localMax, newCurrency)
    setError('')
  }

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(type)
    setError('')
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    const value = getValueFromPosition(e.clientX)

    if (isDragging === 'min') {
      const newMin = Math.min(value, localMax - 100)
      const constrainedMin = Math.max(absoluteMin, newMin)
      setLocalMin(constrainedMin)
      setMinInput(constrainedMin.toString())
    } else {
      const newMax = Math.max(value, localMin + 100)
      const constrainedMax = Math.min(absoluteMax, newMax)
      setLocalMax(constrainedMax)
      setMaxInput(constrainedMax.toString())
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      onChange(localMin, localMax, selectedCurrency)
      setIsDragging(null)
    }
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, localMin, localMax])

  const handleMinInputChange = (value: string) => {
    setMinInput(value)
    setError('')
  }

  const handleMaxInputChange = (value: string) => {
    setMaxInput(value)
    setError('')
  }

  const handleMinInputBlur = () => {
    const numValue = minInput === '' ? absoluteMin : Number(minInput)

    if (isNaN(numValue)) {
      setError('Please enter a valid number')
      setMinInput(localMin.toString())
      return
    }

    const isValid = validateAndUpdate(numValue, localMax)
    if (!isValid) {
      setMinInput(localMin.toString())
    } else {
      setMinInput(numValue.toString())
    }
  }

  const handleMaxInputBlur = () => {
    const numValue = maxInput === '' ? absoluteMax : Number(maxInput)

    if (isNaN(numValue)) {
      setError('Please enter a valid number')
      setMaxInput(localMax.toString())
      return
    }

    const isValid = validateAndUpdate(localMin, numValue)
    if (!isValid) {
      setMaxInput(localMax.toString())
    } else {
      setMaxInput(numValue.toString())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'min' | 'max') => {
    if (e.key === 'Enter') {
      if (type === 'min') {
        handleMinInputBlur()
      } else {
        handleMaxInputBlur()
      }
      e.currentTarget.blur()
    }
  }

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-900">Price Range</h4>

        {/* Currency Selector */}
        <div className="relative">
          <select
            value={selectedCurrency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A] cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {currencies.map((curr) => (
              <option key={curr.code} value={curr.code}>
                {curr.symbol} {curr.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Display */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-700">
          {formatPrice(localMin)}
        </span>
        <span className="text-sm text-gray-400">to</span>
        <span className="text-sm font-medium text-gray-700">
          {formatPrice(localMax)}
        </span>
      </div>

      {/* Slider */}
      <div className="relative mb-6 pb-2" ref={sliderRef}>
        {/* Background Track */}
        <div className="h-1 bg-gray-200 rounded-full"></div>

        {/* Active Track */}
        <div
          className="absolute h-1 bg-[#FDE68A] rounded-full top-0"
          style={{
            left: `${getPercentage(localMin)}%`,
            right: `${100 - getPercentage(localMax)}%`
          }}
        ></div>

        {/* Min Thumb */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-[#FDE68A] rounded-full shadow-md cursor-pointer -mt-3 hover:scale-110 transition-transform z-10"
          style={{ left: `${getPercentage(localMin)}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleMouseDown('min')}
        ></div>

        {/* Max Thumb */}
        <div
          className="absolute w-5 h-5 bg-white border-2 border-[#FDE68A] rounded-full shadow-md cursor-pointer -mt-3 hover:scale-110 transition-transform z-10"
          style={{ left: `${getPercentage(localMax)}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleMouseDown('max')}
        ></div>
      </div>

      {/* Number Inputs */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Minimum</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500 text-sm">
              {getCurrentCurrency().symbol}
            </span>
            <input
              type="number"
              value={minInput}
              onChange={(e) => handleMinInputChange(e.target.value)}
              onBlur={handleMinInputBlur}
              onKeyDown={(e) => handleKeyDown(e, 'min')}
              placeholder={absoluteMin.toString()}
              className={`w-full pl-7 pr-3 py-2 border  text-sm focus:outline-none focus:ring-2 cursor-text transition-colors ${error && error.includes('Minimum')
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-[#FDE68A] focus:border-[#FDE68A]'
                }`}
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Maximum</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500 text-sm">
              {getCurrentCurrency().symbol}
            </span>
            <input
              type="number"
              value={maxInput}
              onChange={(e) => handleMaxInputChange(e.target.value)}
              onBlur={handleMaxInputBlur}
              onKeyDown={(e) => handleKeyDown(e, 'max')}
              placeholder={absoluteMax.toString()}
              className={`w-full pl-7 pr-3 py-2 border  text-sm focus:outline-none focus:ring-2 cursor-text transition-colors ${error && error.includes('Maximum')
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-[#FDE68A] focus:border-[#FDE68A]'
                }`}
            />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 ">
          <p className="text-xs text-red-600 flex items-start">
            <svg className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        </div>
      )}

      {/* Helper Text */}
      <p className="mt-2 text-xs text-gray-500">
        Valid range: {formatPrice(absoluteMin)} - {formatPrice(absoluteMax)}
      </p>
    </div>
  )
}

export default PriceRangeFilter
