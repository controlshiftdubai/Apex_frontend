"use client"

import { useState, useEffect } from 'react'
import { useProfile, useUpdateAddress } from '@/utils/api/hooks/profile'
import { toast } from 'sonner'
import Loading from '@/components/loading'

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

interface AddressData {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export default function AddressSection() {
  const { data: profileData, isLoading } = useProfile();
  const updateAddressMutation = useUpdateAddress();

  const [showZipCode, setShowZipCode] = useState(false);
  const [countryInput, setCountryInput] = useState('');
  const [showCountrySuggestions, setShowCountrySuggestions] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [originalAddress, setOriginalAddress] = useState<AddressData>({
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  const [addressData, setAddressData] = useState<AddressData>({
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });

  useEffect(() => {
    if (profileData?.payload?.address) {
      const addr = profileData.payload.address as any;
      const country = addr.country || '';
      const data = {
        street: addr.street || '',
        city: addr.city || '',
        state: addr.state || '',
        country: country,
        postalCode: addr.postalCode || '',
      };
      setAddressData(data);
      setOriginalAddress(data);
      setCountryInput(country);

      if (country) {
        setShowZipCode(countriesWithZipCode.includes(country));
      }
    }
  }, [profileData]);

  const hasChanges = () => {
    return (
      addressData.street !== originalAddress.street ||
      addressData.city !== originalAddress.city ||
      addressData.state !== originalAddress.state ||
      addressData.country !== originalAddress.country ||
      addressData.postalCode !== originalAddress.postalCode
    );
  };

  const handleCountryInputChange = (value: string) => {
    setCountryInput(value);
    setShowCountrySuggestions(true);

    if (value !== addressData.country) {
      setAddressData({ ...addressData, country: '' });
      setShowZipCode(false);
    }

    if (value.trim() === '') {
      setFilteredCountries([]);
      return;
    }

    setFilteredCountries(
      allCountries.filter(c =>
        c.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleCountrySelect = (selected: string) => {
    setAddressData({ ...addressData, country: selected });
    setCountryInput(selected);
    setShowCountrySuggestions(false);
    setFilteredCountries([]);

    const requiresZip = countriesWithZipCode.includes(selected);
    setShowZipCode(requiresZip);

    if (!requiresZip) {
      setAddressData(prev => ({ ...prev, country: selected, postalCode: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!addressData.street || addressData.street.length < 5) {
      toast.error('Street address must be at least 5 characters');
      return;
    }
    if (!addressData.city || addressData.city.length < 2) {
      toast.error('City must be at least 2 characters');
      return;
    }
    if (!addressData.state || addressData.state.length < 2) {
      toast.error('State must be at least 2 characters');
      return;
    }
    if (!addressData.country) {
      toast.error('Please select a valid country from the list');
      return;
    }

    if (showZipCode && (!addressData.postalCode || addressData.postalCode.length < 3)) {
      toast.error('Postal code must be at least 3 characters');
      return;
    }

    try {
      const result = await updateAddressMutation.mutateAsync(addressData);

      if (!result.error) {
        toast.success('Address updated successfully');
        setOriginalAddress(addressData);
      } else {
        toast.error(result.message || 'Failed to update address');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update address');
    }
  };

  const addressSavedButton = () => {
    setAddressData(originalAddress);
    setCountryInput(originalAddress.country);
    if (originalAddress.country) {
      setShowZipCode(countriesWithZipCode.includes(originalAddress.country));
    } else {
      setShowZipCode(false);
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  const hasAddress = addressData.street && addressData.city && addressData.country;
  const changesDetected = hasChanges();

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="relative inline-block mb-6">
        <span className="relative z-10 text-2xl font-semibold">Delivery Address</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={addressData.street}
              onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
              placeholder="123 Main Street, Apartment 4B"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={addressData.city}
              onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
              placeholder="New York"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              State / Province
            </label>
            <input
              type="text"
              value={addressData.state}
              onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
              placeholder="NY"
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Country
            </label>
            <input
              type="text"
              value={countryInput}
              onChange={(e) => handleCountryInputChange(e.target.value)}
              onFocus={() => {
                if (countryInput.trim()) setShowCountrySuggestions(true)
              }}
              placeholder="Start typing country name..."
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoComplete="off"
            />

            {showCountrySuggestions && filteredCountries.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 max-h-48 overflow-y-auto shadow-lg scroll-hidden">
                {filteredCountries.map((country) => (
                  <div
                    key={country}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleCountrySelect(country);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {country}
                    {countriesWithoutZipCode.includes(country) && (
                      <span className="ml-2 text-xs text-gray-500">(No postal code)</span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {countryInput && !addressData.country && !showCountrySuggestions && filteredCountries.length === 0 && (
              <p className="text-xs text-red-500 mt-1">Please select a valid country from the list</p>
            )}
          </div>

          {showZipCode && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={addressData.postalCode}
                onChange={(e) => setAddressData({ ...addressData, postalCode: e.target.value })}
                placeholder="10001"
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
        </div>

        {hasAddress && (
          <div className="bg-gray-50 border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Address Preview</h3>
            <p className="text-gray-600">
              {addressData.street}<br />
              {addressData.city}, {addressData.state} {showZipCode && addressData.postalCode}<br />
              {addressData.country}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={addressSavedButton}
            disabled={!changesDetected}
            className={`px-6 py-2 border border-gray-300 text-gray-700 font-medium transition-colors ${changesDetected
                ? 'hover:bg-gray-50 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
              }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateAddressMutation.isPending || !changesDetected}
            className={`px-6 py-2 bg-black text-white font-medium transition-colors ${changesDetected && !updateAddressMutation.isPending
                ? 'hover:bg-gray-800 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
              }`}
          >
            {updateAddressMutation.isPending ? 'Saving...' : 'Save Address'}
          </button>
        </div>
      </form>

      {!hasAddress && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 text-sm text-blue-700">
          <p className="font-semibold mb-1">💡 Tip</p>
          <p>
            Add your delivery address to make checkout faster. This will be your default shipping location for all orders.
          </p>
        </div>
      )}
    </div>
  )
}
