"use client"

import Image from 'next/image'
import { useProfileOrders } from '@/utils/api/hooks/profile'
import Loading from '@/components/loading'
import Link from 'next/link'

export default function OrderHistory() {
  const { data, isLoading } = useProfileOrders({ params: {}, payload: {} });

  if (isLoading) {
    return <Loading />;
  }

  const orders = data?.payload?.orders || [];

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
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No orders yet</p>
            <Link
              href="/search"
              className="inline-block px-6 py-2 bg-black text-white font-semibold hover:bg-gray-800 cursor-pointer"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <div key={order.id} className="border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Order #{order.id.slice(0, 12)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className={`inline-flex px-3 py-1 text-xs font-medium border ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-200' :
                      order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                    {order.status}
                  </span>
                </div>

                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 border border-gray-200 flex-shrink-0">
                        <Image
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{item.product.name}</h3>
                        <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
                  </div>
                  <Link
                    href={`/orders/${order.id}`}
                    className="px-6 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
