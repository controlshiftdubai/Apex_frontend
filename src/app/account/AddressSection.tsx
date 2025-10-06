"use client"

export default function AddressSection() {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="relative inline-block mb-6" style={{ ["--underline-color" as any]: "#fca5a5" }}>
        <span className="relative z-10 text-2xl font-semibold">Saved Addresses</span>
        <span
          className="absolute bottom-0 h-[10px] bg-[var(--underline-color)]"
          style={{ left: "-8px", right: "-8px" }}
          aria-hidden="true"
        />
      </h2>

      <div className="space-y-4">
        <div className="border border-gray-200 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Home</h3>
              <p className="text-gray-600">123 Main Street, Apartment 4B</p>
              <p className="text-gray-600">New York, NY 10001</p>
              <p className="text-gray-600">United States</p>
            </div>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">Edit</button>
              <button className="text-red-600 hover:text-red-700 font-medium cursor-pointer">Delete</button>
            </div>
          </div>
        </div>

        <button className="w-full py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
          + Add New Address
        </button>
      </div>
    </div>
  )
}
