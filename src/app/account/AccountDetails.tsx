"use client"

import { useState, useEffect } from 'react'
import { useProfile, useUpdateProfile, useUpdatePassword } from '@/utils/api/hooks/profile'
import { toast } from 'sonner'
import Loading from '@/components/loading'

export default function AccountDetails() {
  const { data: profileData, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const updatePasswordMutation = useUpdatePassword();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (profileData?.payload) {
      setFormData({
        name: profileData.payload.name || '',
        email: profileData.payload.email || '',
        phoneNumber: profileData.payload.phoneNumber || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [profileData]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const result = await updateProfileMutation.mutateAsync({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      });

      if (!result.error) {
        toast.success('Profile updated successfully');
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile');
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await updatePasswordMutation.mutateAsync({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (!result.error) {
        toast.success('Password updated successfully');
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        toast.error(result.message || 'Failed to update password');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update password');
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="relative inline-block mb-6" style={{ ["--underline-color" as any]: "#bfdbfe" }}>
        <span className="relative z-10 text-2xl font-semibold">Account Details</span>
        <span
          className="absolute bottom-0 h-[10px] bg-[var(--underline-color)]"
          style={{ left: "-8px", right: "-8px" }}
          aria-hidden="true"
        />
      </h2>

      {/* Profile Form */}
      <form onSubmit={handleProfileSubmit} className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 bg-gray-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => {
              if (profileData?.payload) {
                setFormData({
                  ...formData,
                  name: profileData.payload.name || '',
                  phoneNumber: profileData.payload.phoneNumber || '',
                });
              }
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Password Change Form */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
              })}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updatePasswordMutation.isPending}
              className="px-6 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
            >
              {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
