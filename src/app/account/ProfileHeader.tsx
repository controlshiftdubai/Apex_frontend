"use client"

export default function ProfileHeader() {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <h1 className="relative inline-block" style={{ ["--underline-color" as any]: "#FDB3CA" }}>
        <span className="relative z-10 text-4xl font-medium">My Account</span>
        <span
          className="absolute bottom-0 h-[14px] bg-[var(--underline-color)]"
          style={{ left: "-16px", right: "-16px" }}
          aria-hidden="true"
        />
      </h1>
      <p className="text-gray-600 mt-3">Manage your account settings and preferences</p>
    </div>
  )
}
