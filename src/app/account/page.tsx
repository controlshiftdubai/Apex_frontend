"use client"

import { useState } from 'react'
import ProfileSidebar from './ProfileSidebar'
import ProfileHeader from './ProfileHeader'
import OrderHistory from './OrderHistory'
import AccountDetails from './AccountDetails'
import AddressSection from './AddressSection'
import ToReviewSection from './ToReviewSection'
import { Package, Heart, ShoppingCart, Star, TrendingUp, Clock } from 'lucide-react'
import { useProfile, useProfileOrders } from '@/utils/api/hooks/profile'
import { useCart, useWishlist } from '@/utils/api/hooks/basket'
import Loading from '@/components/loading'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'account' | 'address' | 'reviews'>('dashboard')

  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: ordersData } = useProfileOrders({ params: { limit: "3" }, payload: {} });
  const { data: wishlistData } = useWishlist({ params: {}, payload: {} });
  const { data: cartData } = useCart({ params: {}, payload: {} });

  if (profileLoading) {
    return <Loading />;
  }

  const profile = profileData?.payload;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            profile={profile}
          />

          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <DashboardOverview
                orders={ordersData?.payload?.orders || []}
                wishlistCount={wishlistData?.payload?.items?.length || 0}
                cartCount={cartData?.payload?.items?.length || 0}
              />
            )}
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

const DashboardOverview = ({ orders, wishlistCount, cartCount }: any) => {

  const stats = [
    {
      label: 'Total Orders',
      value: orders.length.toString(),
      icon: Package,
      color: '#a7f3d0',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      label: 'Wishlist Items',
      value: wishlistCount.toString(),
      icon: Heart,
      color: '#fca5a5',
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      label: 'Cart Items',
      value: cartCount.toString(),
      icon: ShoppingCart,
      color: '#bfdbfe',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      label: 'Reviews Given',
      value: '0', // You can add review count from API
      icon: Star,
      color: '#fde68a',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
  ]

  const recentOrders = orders.slice(0, 3).map((order: any) => ({
    id: order.id,
    product: order.items[0]?.product?.name || 'Unknown Product',
    status: order.status,
    date: new Date(order.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    amount: order.total
  }))

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white border border-gray-200 p-6">
        <h2
          className="relative inline-block mb-4 "
        
        >
          <span className="relative z-10 text-2xl">Dashboard Overview</span>
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
          <h3
            className="relative inline-block link-highlight link-highlight-brown"
            style={{ ["--underline-color" as any]: "#fbbf24" }}
          >
            <span className="relative z-10 text-xl ">Recent Orders</span>
          </h3>
          <button
            className="text-blue-600 hover:text-blue-700 text-sm cursor-pointer link-highlight link-highlight-yellow"
            style={{ ["--underline-color" as any]: "#A5C1FF" }}
            onClick={() => window.location.href = '/account'}
          >
            View All →
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No orders yet</p>
        ) : (
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
                {recentOrders.map((order: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 text-sm font-medium text-gray-900">{order.id.slice(0, 12)}...</td>
                    <td className="py-4 text-sm text-gray-700">{order.product}</td>
                    <td className="py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium border ${order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border-green-200' :
                        order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-700 border-blue-200' :
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
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => window.location.href = '/account'}
          className="bg-white border border-gray-200 p-6 text-left hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Track Orders</h4>
          </div>
          <p className="text-sm text-gray-600">View and track your current orders</p>
          <span
            className="inline-block mt-4 text-black text-sm group-hover:translate-x-1 transition-transform relative link-highlight link-highlight-mint"
            style={{ ["--underline-color" as any]: "#A5C1FF" }}
          >
            Go to Orders →
          </span>
        </button>

        <button
          onClick={() => window.location.href = '/wishlist'}
          className="bg-white border border-gray-200 p-6 text-left hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-5 h-5 text-red-600" />
            <h4 className="font-semibold text-gray-900">View Wishlist</h4>
          </div>
          <p className="text-sm text-gray-600">Browse items you've saved for later</p>
          <span
            className="inline-block mt-4 text-black text-sm group-hover:translate-x-1 transition-transform relative link-highlight link-highlight-brown"
            style={{ ["--underline-color" as any]: "#FFC89F" }}
          >
            View Wishlist →
          </span>
        </button>

        <button
          onClick={() => window.location.href = '/account?tab=reviews'}
          className="bg-white border border-gray-200 p-6 text-left hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-yellow-600" />
            <h4 className="font-semibold text-gray-900">Leave Reviews</h4>
          </div>
          <p className="text-sm text-gray-600">Share your experience with products</p>
          <span
            className="inline-block mt-4 text-black text-sm group-hover:translate-x-1 transition-transform relative link-highlight link-highlight-yellow"
            style={{ ["--underline-color" as any]: "#F4FFCB" }}
          >
            Write Review →
          </span>
        </button>
      </div>
    </div>
  )
}
