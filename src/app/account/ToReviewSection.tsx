"use client"

import Image from 'next/image'

const mockReviews = [
  {
    id: '1',
    product: {
      name: 'Apple Watch Series 8 GPS 45mm Silver Aluminum Case Sport Band.',
      image: '/product-1.jpg',
    },
    purchasedOn: '12 Jul 2023',
    images: ['/keyboard-1.jpg', '/keyboard-2.jpg', '/keyboard-3.jpg'],
  },
]

export default function ToReviewSection() {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="relative inline-block mb-6" style={{ ["--underline-color" as any]: "#fde68a" }}>
        <span className="relative z-10 text-2xl font-semibold">Products to Review</span>
        <span
          className="absolute bottom-0 h-[10px] bg-[var(--underline-color)]"
          style={{ left: "-8px", right: "-8px" }}
          aria-hidden="true"
        />
      </h2>

      <div className="space-y-4">
        {mockReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 p-4">
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 bg-gray-100 border border-gray-200 flex-shrink-0">
                <Image
                  src={review.product.image}
                  alt={review.product.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">{review.product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-gray-300 hover:text-orange-400 text-2xl cursor-pointer">
                      ★
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Purchased on {review.purchasedOn}</p>
              </div>
            </div>

            <textarea
              placeholder="Write your review here..."
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
              rows={4}
            />

            <div className="flex gap-3 mb-4">
              {review.images.map((img, idx) => (
                <div key={idx} className="w-20 h-20 bg-gray-100 border border-gray-200">
                  <Image
                    src={img}
                    alt={`Review image ${idx + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <button className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer">
              Submit Review
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
