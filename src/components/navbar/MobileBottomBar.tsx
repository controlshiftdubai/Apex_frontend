"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function Tab({
  label,
  icon,
  onClick,
  count,
}: {
  label: string;
  icon: string;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("relative flex flex-col items-center justify-center gap-1 h-14 w-full text-[11px] text-gray-700")}
      aria-label={label}
    >
      <span className="relative">
        <Image src={icon} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
        {count ? (
          <span className="absolute -top-1 -right-2 h-4 min-w-[16px] rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white grid place-items-center">
            {count}
          </span>
        ) : null}
      </span>
      <span className="leading-none">{label}</span>
    </button>
  );
}

export default function MobileBottomBar({
  wishlistCount = 0,
  cartCount = 0,
}: {
  wishlistCount?: number;
  cartCount?: number;
}) {
  const router = useRouter();

  return (
    <nav
      className={cn(
        "fixed md:hidden inset-x-0 bottom-0 z-50",
        "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80",
        "border-t border-gray-200"
      )}
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 6px)" }}
      role="navigation"
      aria-label="Bottom actions"
    >
      <div className="mx-auto max-w-screen-sm">
        <div className="grid grid-cols-3">
          <Tab label="Wishlist" icon="/icons/wishlist.svg" onClick={() => router.push("/wishlist")} count={wishlistCount} />
          <Tab label="Cart" icon="/icons/cart.svg" onClick={() => router.push("/cart")} count={cartCount} />
          <Tab label="Profile" icon="/icons/profile.svg" onClick={() => router.push("/account")} />
        </div>
      </div>
    </nav>
  );
}
