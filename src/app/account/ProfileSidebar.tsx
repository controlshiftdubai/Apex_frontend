"use client"

import { LayoutDashboard, Package, User, Star, LogOut, MapPinnedIcon, Camera, Edit2, Heart, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useLogout } from '@/utils/api/hooks/auth'
import { useUpdateProfile } from '@/utils/api/hooks/profile'
import { toast } from 'sonner'
import { S3UploadResponse } from '@/types'
import { useState } from 'react'
import ImageUploadButton from '@/components/upload-image-button'

interface ProfileSidebarProps {
  activeTab: 'dashboard' | 'orders' | 'account' | 'address' | 'wishlist' | 'cart' | 'reviews'
  setActiveTab: (tab: 'dashboard' | 'orders' | 'account' | 'address' | 'wishlist' | 'cart' | 'reviews') => void
  profile: any
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: '#fbbf24' },
  { id: 'orders', label: 'Order History', icon: Package, color: '#a7f3d0' },
  { id: 'account', label: 'Account Details', icon: User, color: '#bfdbfe' },
  { id: 'address', label: 'Address Details', icon: MapPinnedIcon, color: '#FCA5A5' },
  { id: 'wishlist', label: 'My Wishlist', icon: Heart, color: '#fca5a5' },
  { id: 'cart', label: 'Shopping Cart', icon: ShoppingCart, color: '#bfdbfe' },
  { id: 'reviews', label: 'To Review', icon: Star, color: '#fde68a' },
]

export default function ProfileSidebar({ activeTab, setActiveTab, profile }: ProfileSidebarProps) {
  const router = useRouter();
  const logoutMutation = useLogout();
  const updateProfileMutation = useUpdateProfile();
  const [isHovered, setIsHovered] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

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

  const handleAvatarUpload = async (data: S3UploadResponse) => {
    console.log('S3 Upload Response:', data);

    if (!data.error && data.payload?.full_url) {
      const avatarUrl = data.payload.full_url;

      console.log('Updating profile with avatar URL:', avatarUrl);

      try {
        const result = await updateProfileMutation.mutateAsync({
          avatar: avatarUrl,
        });

        console.log('Profile update result:', result);

        if (!result.error) {
          toast.success('Profile picture updated successfully');
        } else {
          toast.error(result.message || 'Failed to update profile picture');
        }
      } catch (error: any) {
        console.error('Profile update error:', error);
        toast.error(error?.message || 'Failed to update profile picture');
      }
    } else {
      console.error('Invalid S3 response:', data);
      toast.error(data.message || 'Failed to upload image');
    }
  }


  const handleUploadError = (error: string) => {
    console.error('Upload error:', error);
  }

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <ImageUploadButton
            onSuccess={handleAvatarUpload}
            onError={handleUploadError}
          >
            <div
              className="relative w-24 h-24 bg-gray-200 border border-gray-300 overflow-hidden rounded-full cursor-pointer group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {profile?.avatar ? (
                <Image
                  src={profile.avatar}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-500">
                  {getInitials(profile?.name || '')}
                </div>
              )}
              {updateProfileMutation.isPending && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </ImageUploadButton>

          <ImageUploadButton
            onSuccess={handleAvatarUpload}
            onError={handleUploadError}
          >
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer transition-colors">
              <Edit2 className="w-4 h-4 text-white" />
            </button>
          </ImageUploadButton>
        </div>

        <h3 className="text-lg font-semibold text-gray-900">{profile?.name || 'User'}</h3>
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
