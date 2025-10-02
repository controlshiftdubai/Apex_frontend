import { useState, useEffect } from "react"

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
  const [countryInput, setCountryInput] = useState("");
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [showZipCode, setShowZipCode] = useState(false);

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
    if (country) {
      setCountryInput(country);
      setShowZipCode(countriesWithZipCode.includes(country));
    }
  }, [country]);

  return (
    <div className="bg-white border border-gray-300 p-6">
      <h1 className="relative inline-block mb-6" style={{ ["--underline-color" as any]: "#FDE68A" }}>
        <span className="relative z-10 text-2xl font-semibold">Delivery Address</span>
        <span className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]" aria-hidden="true" />
      </h1>
      <form
        className="space-y-6"
        onSubmit={e => {
          e.preventDefault();
          if (!addressInput.trim() || !country || !cityState.trim() || (showZipCode && !zipCode.trim())) return;
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
          <button type="button" className="border border-gray-400 px-6 py-2 font-semibold cursor-pointer" onClick={onBack}>Back to Cart</button>
          <button type="submit" className="bg-black text-white px-7 py-2 font-semibold hover:bg-gray-800 cursor-pointer">Next: Payment</button>
        </div>
      </form>
    </div>
  )
}
