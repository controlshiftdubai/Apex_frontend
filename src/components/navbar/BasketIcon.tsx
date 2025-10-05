"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCart, useWishlist } from "@/utils/api/hooks/basket";
import { cn } from '@/lib/utils';

interface BasketIconProps {
  type: 'cart' | 'wishlist';
  onClick: () => void;
  iconSrc: string;
  alt: string;
  ariaLabel: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BasketIcon = ({
  type,
  onClick,
  iconSrc,
  alt,
  ariaLabel,
  className = "",
  size = 'md'
}: BasketIconProps) => {
  const { data: cartData } = useCart({ params: {}, payload: {} });
  const { data: wishlistData } = useWishlist({ params: {}, payload: {} });

  const items = type === 'cart' ? cartData?.payload?.items || [] : wishlistData?.payload?.items || [];
  const count = items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);

  const actionColors = ["#a7f3d0", "#fca5a5"];
  const underlineColor = type === 'cart' ? actionColors[1] : actionColors[0];

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-9 w-9',
    lg: 'h-10 w-10'
  };

  const iconSize = {
    sm: 20,
    md: 22,
    lg: 24
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "group relative cursor-pointer rounded-full hover:bg-white/0",
        sizeClasses[size],
        className
      )}
      style={{ ["--underline-color" as any]: underlineColor }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Image
        src={iconSrc}
        alt={alt}
        width={iconSize[size]}
        height={iconSize[size]}
        sizes={`${iconSize[size]}px`}
        className={cn("block", `h-[${iconSize[size]}px] w-[${iconSize[size]}px]`)}
        priority
      />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] font-semibold text-white grid place-items-center"
          aria-label={`${count} items`}
        >
          {count}
        </span>
      )}
      <span
        className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
        style={{ background: "var(--underline-color)" }}
        aria-hidden="true"
      />
    </Button>
  );
};

export default BasketIcon;
