"use client"

import { LayoutDashboard, Package, User, Star, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useLogout } from '@/utils/api/hooks/auth'
import { toast } from 'sonner'

interface ProfileSidebarProps {
  activeTab: 'dashboard' | 'orders' | 'account' | 'address' | 'reviews'
  setActiveTab: (tab: 'dashboard' | 'orders' | 'account' | 'address' | 'reviews') => void
  profile: any
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: '#fbbf24' },
  { id: 'orders', label: 'Order History', icon: Package, color: '#a7f3d0' },
  { id: 'account', label: 'Account Details', icon: User, color: '#bfdbfe' },
  { id: 'reviews', label: 'To Review', icon: Star, color: '#fde68a' },
]

export default function ProfileSidebar({ activeTab, setActiveTab, profile }: ProfileSidebarProps) {
  const router = useRouter();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      const result = await logoutMutation.mutateAsync();

      if (!result.error) {
        router.push('/sign-in');
      } else {
        toast.error(result.message || 'Failed to logout');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Logout failed');
      router.push('/sign-in');
    }
  }

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 border border-gray-300 mb-4 overflow-hidden rounded-full">
          {profile?.avatar ? (
            <Image
              src={profile.avatar}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
              {profile?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{profile?.name || 'User'}</h3>
        <p className="text-sm text-gray-500">{profile?.email || ''}</p>
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
          disabled={logoutMutation.isPending}
          className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer border-l-4 border-transparent hover:bg-red-50 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-5 h-5" />
          <span>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</span>
        </button>
      </nav>
    </div>
  )
}
