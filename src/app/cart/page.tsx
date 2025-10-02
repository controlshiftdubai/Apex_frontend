"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingCart, Gift, Headphones, MessageCircle } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  currency: string
  image: string
  color: string
  inStock: boolean
}

// Countries that require ZIP codes
const countriesWithZipCode = [
  'United States',
  'United Kingdom',
  'Canada',
  'India',
  'Australia',
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Japan',
  'China',
  'Brazil',
  'Mexico',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'South Korea',
  'New Zealand',
  'Singapore',
  'Ireland'
]

// Countries that don't require ZIP codes
const countriesWithoutZipCode = [
  'Saudi Arabia',
  'United Arab Emirates',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Hong Kong',
  'Macau'
]

const allCountries = [...countriesWithZipCode, ...countriesWithoutZipCode].sort()

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Floral Print Wrap Dress',
      price: 2050,
      quantity: 2,
      currency: 'INR',
      image: '/product/product-image-1.jpg',
      color: 'Blue',
      inStock: true,
    },
    {
      id: '2',
      name: 'Floral Print Wrap Dress',
      price: 3050,
      quantity: 1,
      currency: 'INR',
      image: '/product/product-image-1.jpg',
      color: 'Red',
      inStock: true,
    }
  ])

  const [country, setCountry] = useState('')
  const [countryInput, setCountryInput] = useState('')
  const [cityState, setCityState] = useState('')
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState<string[]>([])
  const [zipCode, setZipCode] = useState('')
  const [showZipCode, setShowZipCode] = useState(false)
  const [appliedDiscount, setAppliedDiscount] = useState(0)
  const [couponCode, setCouponCode] = useState('')

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    return subtotal - appliedDiscount
  }

  const handleCheckout = () => {
    console.log('Proceeding to checkout...')
  }

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedDiscount(500)
      console.log('Coupon applied:', couponCode)
    }
  }

  // Handle country input change
  const handleCountryInputChange = (value: string) => {
    setCountryInput(value)
    setShowCountrySuggestions(true)

    if (value.trim() === '') {
      setFilteredCountries([])
      setCountry('')
      setShowZipCode(false)
      return
    }

    // Filter countries based on input
    const filtered = allCountries.filter(c =>
      c.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredCountries(filtered)
  }

  // Handle country selection - Using onMouseDown instead of onClick
  const handleCountrySelect = (selectedCountry: string) => {
    setCountry(selectedCountry)
    setCountryInput(selectedCountry)
    setShowCountrySuggestions(false)
    setFilteredCountries([])

    // Check if country requires ZIP code
    const requiresZip = countriesWithZipCode.includes(selectedCountry)
    setShowZipCode(requiresZip)

    if (!requiresZip) {
      setZipCode('')
    }
  }

  // Check if entered text matches a valid country
  useEffect(() => {
    if (countryInput && !showCountrySuggestions) {
      const matchedCountry = allCountries.find(
        c => c.toLowerCase() === countryInput.toLowerCase()
      )

      if (matchedCountry) {
        setCountry(matchedCountry)
        const requiresZip = countriesWithZipCode.includes(matchedCountry)
        setShowZipCode(requiresZip)
      } else {
        setShowZipCode(false)
      }
    }
  }, [countryInput, showCountrySuggestions])

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping now!
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
        {/* Header */}
        <div className="mb-8">
          <h1
            className="relative inline-block"
            style={{ ["--underline-color" as any]: "#FDE68A" }}
          >
            <span className="relative z-10 text-4xl font-medium">Shopping Bag</span>
            <span
              className="absolute bottom-0 h-[14px] bg-[var(--underline-color)]"
              style={{ left: '-16px', right: '-16px' }}
              aria-hidden="true"
            />
          </h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-semibold text-sm text-gray-700">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total Price</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {/* Product Info */}
                  <div className="col-span-1 md:col-span-5 flex gap-4">
                    <div className="relative w-24 h-24 bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <p>Color: <span className="font-medium">{item.color}</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center">
                    <div className="md:hidden font-semibold mr-2">Price:</div>
                    <p className="font-bold text-gray-900">{item.price} {item.currency}</p>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-center gap-2">
                    <div className="md:hidden font-semibold mr-2">Quantity:</div>
                    <div className="flex items-center border border-gray-300">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="col-span-1 md:col-span-2 flex items-center justify-between md:justify-center">
                    <div className="md:hidden font-semibold">Total:</div>
                    <p className="font-bold text-lg text-[#FDE68A]">
                      {item.price * item.quantity} {item.currency}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="md:hidden ml-4 p-2 text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Calculated Shipping */}
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-4">Calculated Shipping</h3>

              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input
                  type="text"
                  value={countryInput}
                  onChange={(e) => handleCountryInputChange(e.target.value)}
                  onFocus={() => {
                    if (countryInput.trim()) {
                      setShowCountrySuggestions(true)
                    }
                  }}
                  placeholder="Enter country name"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A]"
                />

                {/* Country Suggestions Dropdown */}
                {showCountrySuggestions && filteredCountries.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 max-h-48 overflow-y-auto shadow-lg scroll-hidden">
                    {filteredCountries.map((c) => (
                      <div
                        key={c}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          handleCountrySelect(c)
                        }}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}

                {/* Country validation message */}
                {countryInput && !country && !showCountrySuggestions && filteredCountries.length === 0 && (
                  <p className="text-xs text-red-500 mt-1">Please select a valid country</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">City/State</label>
                <input
                  type="text"
                  value={cityState}
                  onChange={(e) => setCityState(e.target.value)}
                  placeholder="Enter city or state name"
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A]"
                />
              </div>

              {/* ZIP Code Field - Conditionally rendered */}
              {showZipCode && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter ZIP code"
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A]"
                  />
                </div>
              )}

              <button className="w-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer">
                Update
              </button>
            </div>

            {/* Coupon Code */}
            {/* <div className="bg-white border border-gray-200 p-6">
              <h3 className="font-semibold text-lg mb-2">Coupon Code</h3>
              <p className="text-sm text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
              </p>

              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Coupon Code"
                className="w-full px-3 py-2 border border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A]"
              />

              <button
                onClick={applyCoupon}
                className="w-full px-4 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div> */}

            {/* Cart Total */}
            <div className="bg-[#FDE68A] border border-[#FDE68A] p-6">
              <h3 className="font-semibold text-xl mb-4">Cart Total</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Cart Subtotal</span>
                  <span className="font-semibold">{calculateSubtotal()} INR</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Design by ControlShift</span>
                  <span className="font-semibold">Free</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Discount</span>
                    <span className="font-semibold text-green-600">-{appliedDiscount} INR</span>
                  </div>
                )}
                <div className="border-t border-gray-400 pt-3 flex justify-between">
                  <span className="font-semibold">Cart Total</span>
                  <span className="font-bold text-lg">{calculateTotal()} INR</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full px-4 py-3 bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>

            {/* Service Icons */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-100 p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-200 flex items-center justify-center mb-2">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Free Shipping</h4>
                <p className="text-xs text-gray-600">Orders over $50 or more</p>
              </div>

              <div className="bg-yellow-100 p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-yellow-200 flex items-center justify-center mb-2">
                  <Headphones className="w-6 h-6 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Call Us Anytime</h4>
                <p className="text-xs text-gray-600">+44 123 456 789</p>
              </div>

              <div className="bg-green-100 p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-200 flex items-center justify-center mb-2">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Chat With Us</h4>
                <p className="text-xs text-gray-600">We offer 24-hour chat support</p>
              </div>

              <div className="bg-orange-100 p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-200 flex items-center justify-center mb-2">
                  <Gift className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-sm mb-1">Gift Cards</h4>
                <p className="text-xs text-gray-600">For your loved one, in any amount</p>
              </div>
            </div>
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

export default CartPage
