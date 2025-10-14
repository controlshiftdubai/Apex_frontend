"use client"

import { useState, useEffect } from 'react'
import { useProfile, useUpdateProfile, useUpdatePassword } from '@/utils/api/hooks/profile'
import { toast } from 'sonner'
import Loading from '@/components/loading'

export default function AccountDetails() {
  const { data: profileData, isLoading } = useProfile();
  const updateProfileMutation = useUpdateProfile();
  const updatePasswordMutation = useUpdatePassword();

  const [originalProfile, setOriginalProfile] = useState({
    name: '',
    phoneNumber: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (profileData?.payload) {
      const profile = {
        name: profileData.payload.name || '',
        phoneNumber: profileData.payload.phoneNumber || '',
      };
      setOriginalProfile(profile);
      setFormData({
        ...profile,
        email: profileData.payload.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [profileData]);

  const hasProfileChanges = () => {
    return (
      formData.name !== originalProfile.name ||
      formData.phoneNumber !== originalProfile.phoneNumber
    );
  };

  const hasPasswordData = () => {
    return (
      formData.currentPassword.length > 0 ||
      formData.newPassword.length > 0 ||
      formData.confirmPassword.length > 0
    );
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await updateProfileMutation.mutateAsync({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      });

      if (!result.error) {
        toast.success('Profile updated successfully');
        setOriginalProfile({
          name: formData.name,
          phoneNumber: formData.phoneNumber,
        });
      } else {
        toast.error(result.message || 'Failed to update profile');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update profile');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
  };

  if (isLoading) {
    return <Loading />;
  }

  const profileChanged = hasProfileChanges();
  const passwordDataEntered = hasPasswordData();

  return (
    <div className="bg-white border border-gray-200 p-6">
      <h2 className="relative inline-block mb-6">
        <span className="relative z-10 text-2xl font-semibold">Account Details</span>
      </h2>

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
              setFormData({
                ...formData,
                name: originalProfile.name,
                phoneNumber: originalProfile.phoneNumber,
              });
            }}
            disabled={!profileChanged}
            className={`px-6 py-2 border border-gray-300 text-gray-700 font-medium transition-colors ${profileChanged
              ? 'hover:bg-gray-50 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
              }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateProfileMutation.isPending || !profileChanged}
            className={`px-6 py-2 bg-black text-white font-medium transition-colors ${profileChanged && !updateProfileMutation.isPending
              ? 'hover:bg-gray-800 cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
              }`}
          >
            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

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
              disabled={!passwordDataEntered}
              className={`px-6 py-2 border border-gray-300 text-gray-700 font-medium transition-colors ${passwordDataEntered
                ? 'hover:bg-gray-50 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updatePasswordMutation.isPending || !passwordDataEntered}
              className={`px-6 py-2 bg-black text-white font-medium transition-colors ${passwordDataEntered && !updatePasswordMutation.isPending
                ? 'hover:bg-gray-800 cursor-pointer'
                : 'opacity-50 cursor-not-allowed'
                }`}
            >
              {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
