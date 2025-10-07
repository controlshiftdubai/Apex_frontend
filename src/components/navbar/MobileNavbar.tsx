"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Icons */
const MenuIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 26 24"
    strokeWidth={2.2}
    stroke="#9CA3AF"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 7h16.5M3.75 17h16.5"
    />
  </svg>
);
const CrossIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.2}
    stroke="#9CA3AF"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6l12 12M6 18L18 6"
    />
  </svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="#6b7280"
    className={className ?? "h-4 w-4"}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-4.35-4.35m1.1-4.4a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z"
    />
  </svg>
);

/* Compact square “EN |” button (same size as search) */
function LangSquare({
  code,
  onToggle,
  className,
}: {
  code: "en" | "ar";
  onToggle: () => void;
  className?: string;
}) {
  const label = code === "en" ? "EN |" : "AR |";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Change language"
      className={cn(
        "inline-flex items-center justify-center ",
        "text-[17px] font-semibold text-gray-700",
        "h-12 w-12 mt-1 hover:bg-gray-50",
        className
      )}
    >
      {label}
    </button>
  );
}

/* Square search button (same size as LangSquare) */
function SearchSquare({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search"
      className={cn(
        "inline-flex items-center justify-center rounded-full hover:bg-gray-100 h-10 w-10",
        className
      )}
    >
      <SearchIcon className="h-5 w-5" />
    </button>
  );
}

export default function MobileNavbar({
  lang,
  setLang,
  openMenuMobile,
  setOpenMenuMobile,
}: {
  lang: "en" | "ar";
  setLang: (v: "en" | "ar") => void;
  openMenuMobile: boolean;
  setOpenMenuMobile: (v: boolean) => void;
}) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex md:hidden items-center h-full w-full overflow-x-clip isolate"
      )}
      style={{
        paddingInlineStart: "max(env(safe-area-inset-left),16px)", // left spacing for logo
        paddingInlineEnd: "max(env(safe-area-inset-right),12px)",
      }}
    >
      {/* Left: logo */}
      <Link href="/" className="rounded-md block shrink-0 mr-2">
        <Image
          src="https://d33609liqwio9r.cloudfront.net/2025-10-07T00:06:41.784Z-Untitled%20(1080%20x%20400%20px).png"
          alt="logo"
          width={128}
          height={30}
          sizes="128px"
          className="block h-11 w-auto"
          priority
        />
      </Link>

      {/* Right: EN |  Search  Menu */}
      <div className="ms-auto flex items-center gap-1.5 shrink-0 flex-nowrap">
        <LangSquare
          code={lang}
          onToggle={() => setLang(lang === "en" ? "ar" : "en")}
        />
        <SearchSquare onClick={() => router.push("/search")} />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpenMenuMobile(!openMenuMobile)}
          className="h-10 w-10 rounded-full hover:bg-gray-100"
          aria-label={openMenuMobile ? "Close menu" : "Open menu"}
          aria-controls="mobile-drawer"
          aria-expanded={openMenuMobile}
        >
          {openMenuMobile ? (
            <CrossIcon className="!h-5 !w-5" />
          ) : (
            <MenuIcon className="!h-5 !w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
