"use client"

import { useState, useEffect } from "react"
import { useProfile } from "@/utils/api/hooks/profile"
import { toast } from "sonner"

const countriesWithZipCode = [
  'United States', 'United Kingdom', 'Canada', 'India', 'Australia', 'Germany',
  'France', 'Italy', 'Spain', 'Japan', 'China', 'Brazil', 'Mexico', 'Netherlands',
  'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Poland', 'South Korea',
  'New Zealand', 'Singapore', 'Ireland'
];
const countriesWithoutZipCode = [
  'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Hong Kong', 'Macau'
];
const allCountries = [...countriesWithZipCode, ...countriesWithoutZipCode].sort();

export default function DeliveryStep({
  addressInput, setAddressInput, country, setCountry, cityState, setCityState,
  zipCode, setZipCode, onBack, onNext
}: any) {
  const { data: profileData, isLoading } = useProfile();
  const [countryInput, setCountryInput] = useState("");
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [showZipCode, setShowZipCode] = useState(false);
  const [addressLoaded, setAddressLoaded] = useState(false);

  useEffect(() => {
    if (profileData?.payload?.address && !addressLoaded) {
      const savedAddress = profileData.payload.address as any;

      if (savedAddress.street) {
        setAddressInput(savedAddress.street);
      }

      if (savedAddress.city && savedAddress.state) {
        setCityState(`${savedAddress.city}, ${savedAddress.state}`);
      } else if (savedAddress.city) {
        setCityState(savedAddress.city);
      } else if (savedAddress.state) {
        setCityState(savedAddress.state);
      }

      if (savedAddress.country) {
        setCountry(savedAddress.country);
        setCountryInput(savedAddress.country);

        const requiresZip = countriesWithZipCode.includes(savedAddress.country);
        setShowZipCode(requiresZip);

        if (requiresZip && savedAddress.postalCode) {
          setZipCode(savedAddress.postalCode);
        }
      }

      setAddressLoaded(true);
      toast.success('Your saved address has been loaded');
    }
  }, [profileData, addressLoaded, setAddressInput, setCityState, setCountry, setZipCode]);

  const handleCountryInputChange = (value: string) => {
    setCountryInput(value);
    setShowCountrySuggestions(true);
    setCountry("");
    setShowZipCode(false);
    if (value.trim() === "") {
      setFilteredCountries([]);
      return;
    }
    setFilteredCountries(allCountries.filter(c => c.toLowerCase().includes(value.toLowerCase())));
  };

  const handleCountrySelect = (selected: string) => {
    setCountry(selected);
    setCountryInput(selected);
    setShowCountrySuggestions(false);
    setFilteredCountries([]);
    const requiresZip = countriesWithZipCode.includes(selected);
    setShowZipCode(requiresZip);
    if (!requiresZip) setZipCode("");
  };

  useEffect(() => {
    if (country && !addressLoaded) {
      setCountryInput(country);
      setShowZipCode(countriesWithZipCode.includes(country));
    }
  }, [country, addressLoaded]);

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="relative inline-block" style={{ ["--underline-color" as any]: "#FDE68A" }}>
          <span className="relative z-10 text-2xl font-semibold">Delivery Address</span>
          <span className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]" aria-hidden="true" />
        </h1>
      </div>

      <form
        className="space-y-6"
        onSubmit={e => {
          e.preventDefault();
          if (!addressInput.trim() || !country || !cityState.trim() || (showZipCode && !zipCode.trim())) {
            toast.error('Please fill in all required fields');
            return;
          }
          onNext();
        }}
      >
        <div>
          <label className="block text-sm font-semibold mb-2">Recipient Address</label>
          <textarea
            value={addressInput}
            onChange={e => setAddressInput(e.target.value)}
            rows={2}
            required
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A]"
            placeholder="Flat/House/Building, Area, Street, etc."
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold mb-2">Country</label>
          <input
            type="text"
            value={countryInput}
            onChange={e => handleCountryInputChange(e.target.value)}
            onFocus={() => { if (countryInput.trim()) setShowCountrySuggestions(true) }}
            placeholder="Enter country name"
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A]"
            autoComplete="off"
          />
          {showCountrySuggestions && filteredCountries.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 max-h-48 overflow-y-auto shadow-lg scroll-hidden">
              {filteredCountries.map((c) => (
                <div
                  key={c}
                  onMouseDown={e => { e.preventDefault(); handleCountrySelect(c); }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {c}
                  {countriesWithoutZipCode.includes(c) && (
                    <span className="ml-2 text-xs text-gray-500">(No postal code)</span>
                  )}
                </div>
              ))}
            </div>
          )}
          {countryInput && !country && !showCountrySuggestions && filteredCountries.length === 0 && (
            <p className="text-xs text-red-500 mt-1">Please select a valid country</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">City / State</label>
          <input
            type="text"
            value={cityState}
            onChange={e => setCityState(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A]"
            placeholder="City and/or State"
          />
        </div>

        {showZipCode && (
          <div>
            <label className="block text-sm font-semibold mb-2">ZIP Code</label>
            <input
              type="text"
              value={zipCode}
              onChange={e => setZipCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FDE68A] focus:border-[#FDE68A]"
              placeholder="ZIP / Postal Code"
            />
          </div>
        )}

        <div className="flex gap-4 mt-8">
          <button
            type="button"
            className="border border-gray-400 px-6 py-2 font-semibold cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={onBack}
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="bg-black text-white px-7 py-2 font-semibold hover:bg-gray-800 cursor-pointer transition-colors"
          >
            Next: Payment
          </button>
        </div>
      </form>
    </div>
  )
}
