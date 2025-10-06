"use client"

import { LayoutDashboard, Package, User, MapPin, Star, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProfileSidebarProps {
  activeTab: 'dashboard' | 'orders' | 'account' | 'address' | 'reviews'
  setActiveTab: (tab: 'dashboard' | 'orders' | 'account' | 'address' | 'reviews') => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: '#fbbf24' },
  { id: 'orders', label: 'Order History', icon: Package, color: '#a7f3d0' },
  { id: 'account', label: 'Account Details', icon: User, color: '#bfdbfe' },
  { id: 'address', label: 'Address', icon: MapPin, color: '#fca5a5' },
  { id: 'reviews', label: 'To Review', icon: Star, color: '#fde68a' },
]

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...')
  }

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 border border-gray-300 mb-4 overflow-hidden">
          <img
            src="https://d33609liqwio9r.cloudfront.net/2025-09-15T16:25:58.216Z-wp9799826-one-piece-black-and-white-wallpapers.png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Jenny Wilson</h3>
        <p className="text-sm text-gray-500">jenny@example.com</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer border-l-4",
                isActive
                  ? "bg-gray-50 border-gray-900 font-medium"
                  : "border-transparent hover:bg-gray-50"
              )}
              style={isActive ? { borderLeftColor: item.color } : {}}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-gray-900" : "text-gray-600")} />
              <span className={cn(isActive ? "text-gray-900" : "text-gray-600")}>
                {item.label}
              </span>
            </button>
          )
        })}

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer border-l-4 border-transparent hover:bg-red-50 text-red-600"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  )
}
