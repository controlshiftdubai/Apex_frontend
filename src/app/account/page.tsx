"use client"

import { useState } from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileHeader from './ProfileHeader'
import OrderHistory from './OrderHistory'
import AccountDetails from './AccountDetails'
import AddressSection from './AddressSection'
import ToReviewSection from './ToReviewSection'
import { Package, Heart, ShoppingCart, Star, TrendingUp, Clock } from 'lucide-react'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'account' | 'address' | 'reviews'>('dashboard')

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && <DashboardOverview />}
            {activeTab === 'orders' && <OrderHistory />}
            {activeTab === 'account' && <AccountDetails />}
            {activeTab === 'address' && <AddressSection />}
            {activeTab === 'reviews' && <ToReviewSection />}
          </div>
        </div>
      </div>
    </div>
  )
}

const DashboardOverview = () => {
  const stats = [
    {
      label: 'Total Orders',
      value: '24',
      icon: Package,
      color: '#a7f3d0',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: 'Wishlist Items',
      value: '12',
      icon: Heart,
      color: '#fca5a5',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      label: 'Cart Items',
      value: '3',
      icon: ShoppingCart,
      color: '#bfdbfe',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      label: 'Reviews Given',
      value: '18',
      icon: Star,
      color: '#fde68a',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
  ]

  const recentOrders = [
    { id: 'ORD-2024-001', product: 'Apple Watch Series 8', status: 'Delivered', date: '12 Jul 2023', amount: 399.00 },
    { id: 'ORD-2024-002', product: 'Mechanical Keyboard RGB', status: 'Shipped', date: '15 Jul 2023', amount: 129.99 },
    { id: 'ORD-2024-003', product: 'Wireless Mouse Pro', status: 'Processing', date: '18 Jul 2023', amount: 79.50 },
  ]

  const recentActivity = [
    { action: 'Added to Wishlist', item: 'Sony WH-1000XM5 Headphones', time: '2 hours ago' },
    { action: 'Left a Review', item: 'Apple Watch Series 8', time: '5 hours ago' },
    { action: 'Order Delivered', item: 'Mechanical Keyboard RGB', time: '1 day ago' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white border border-gray-200 p-6">
        <h2 className="relative inline-block mb-4" style={{ ["--underline-color" as any]: "#A5C1FF" }}>
          <span className="relative z-10 text-2xl font-semibold">Dashboard Overview</span>
          <span
            className="absolute bottom-0 h-[10px] bg-[var(--underline-color)]"
            style={{ left: "-8px", right: "-8px" }}
            aria-hidden="true"
          />
        </h2>
        <p className="text-gray-600">Welcome back! Here's a quick overview of your account activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${stat.bgColor} border border-gray-200`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="h-2 bg-gray-100 overflow-hidden">
                  <div
                    className="h-full"
                    style={{ width: '75%', backgroundColor: stat.color }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="relative inline-block" style={{ ["--underline-color" as any]: "#fbbf24" }}>
            <span className="relative z-10 text-xl font-semibold">Recent Orders</span>
            <span
              className="absolute bottom-0 h-[8px] bg-[var(--underline-color)]"
              style={{ left: "-8px", right: "-8px" }}
              aria-hidden="true"
            />
          </h3>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer">
            View All →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Product</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 text-sm text-gray-700">{order.product}</td>
                  <td className="py-4">
                    <span className={`inline-flex px-3 py-1 text-xs font-medium border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                      order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="py-4 text-sm font-semibold text-gray-900 text-right">${order.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-gray-200 p-6">
        <h3 className="relative inline-block mb-6" style={{ ["--underline-color" as any]: "#fca5a5" }}>
          <span className="relative z-10 text-xl font-semibold">Recent Activity</span>
          <span
            className="absolute bottom-0 h-[8px] bg-[var(--underline-color)]"
            style={{ left: "-8px", right: "-8px" }}
            aria-hidden="true"
          />
        </h3>

        <div className="space-y-4">
          {recentActivity.map((activity, idx) => (
            <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
              <div className="p-2 bg-gray-100 border border-gray-200 mt-1">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.item}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button className="bg-white border border-gray-200 p-6 text-left hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Track Orders</h4>
          </div>
          <p className="text-sm text-gray-600">View and track your current orders</p>
          <span className="inline-block mt-4 text-blue-600 text-sm group-hover:translate-x-1 transition-transform">
            Go to Orders →
          </span>
        </button>

        <button className="bg-white border border-gray-200 p-6 text-left hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-gray-900">View Wishlist</h4>
          </div>
          <p className="text-sm text-gray-600">Browse items you've saved for later</p>
          <span className="inline-block mt-4 text-red-600 text-sm group-hover:translate-x-1 transition-transform">
            View Wishlist →
          </span>
        </button>

        <button className="bg-white border border-gray-200 p-6 text-left hover:shadow-lg transition-all cursor-pointer group">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <h4 className="font-semibold text-gray-900">Leave Reviews</h4>
          </div>
          <p className="text-sm text-gray-600">Share your experience with products</p>
          <span className="inline-block mt-4 text-yellow-600 text-sm group-hover:translate-x-1 transition-transform">
            Write Review →
          </span>
        </button>
      </div>
    </div>
  )
}
