"use client"

import Image from 'next/image'

const mockOrders = [
  {
    id: '1',
    product: {
      name: 'Apple Watch Series 8 GPS 45mm Silver Aluminum Case Sport Band.',
      image: '/product-1.jpg',
    },
    purchasedOn: '12 Jul 2023',
    status: 'Delivered',
    rating: 4,
  },
  {
    id: '2',
    product: {
      name: 'Apple Watch Series 8 GPS 45mm Silver Aluminum Case Sport Band.',
      image: '/product-2.jpg',
    },
    purchasedOn: '12 Jul 2023',
    status: 'Delivered',
    rating: 4,
  },
]

export default function OrderHistory() {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="relative inline-block" style={{ ["--underline-color" as any]: "#fbbf24" }}>
            <span className="relative z-10 text-2xl font-semibold">Order History</span>
            <span
              className="absolute bottom-0 h-[10px] bg-[var(--underline-color)]"
              style={{ left: "-8px", right: "-8px" }}
              aria-hidden="true"
            />
          </h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
              To Review
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer">
              Review History
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gray-100 border border-gray-200 flex-shrink-0">
                  <Image
                    src={order.product.image}
                    alt={order.product.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{order.product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className={star <= order.rating ? "text-orange-400" : "text-gray-300"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Purchased on {order.purchasedOn}</p>
                </div>

                <button className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer self-start">
                  Edit Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
