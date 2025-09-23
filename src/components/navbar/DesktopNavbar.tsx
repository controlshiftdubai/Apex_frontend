"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Icons */
const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#6b7280" className={className ?? "h-4 w-4"} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.1-4.4a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z" />
  </svg>
);

/* Desktop-only helpers */
function InlineSearch({
  onSubmit,
  underlineColor = "#1ce7d3",
}: {
  onSubmit: (q: string) => void;
  underlineColor?: string;
}) {
  const [q, setQ] = React.useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query) onSubmit(query);
  };

  return (
    <form onSubmit={submit} role="search" aria-label="Site search" className="min-w-[250px] w-full max-w-[300px] xl:max-w-sm 2xl:max-w-md relative">
      <div className="group relative" style={{ ["--underline-color" as any]: underlineColor }}>
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--underline-color)] opacity-0 scale-95 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:scale-100 group-focus-within:scale-100 transition-all duration-200" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="rounded-full ring-1 ring-gray-300 focus:ring-2 focus:ring-[rgb(150,150,180)] w-full font-light ltr:ps-9 rtl:pe-9 py-1 transition-all outline-none bg-white"
        />
        <SearchIcon className="pointer-events-none size-4 absolute left-3 top-1/2 -translate-y-1/2" />
      </div>
    </form>
  );
}

function LangDropdown({
  value,
  onChange,
}: {
  value: "en" | "ar";
  onChange: (v: "en" | "ar") => void;
}) {
  const [open, setOpen] = React.useState(false);
  const colors = { en: "#fbbf24", ar: "#a7f3d0" };
  const label = value.toUpperCase();

  return (
    <div
      className="relative md:ml-2"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="group relative inline-flex items-center gap-1 rounded-full h-8 px-3 text-[13px] uppercase tracking-wide border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none"
        style={{ ["--underline-color" as any]: colors[value] }}
      >
        <span className="text-gray-700 font-semibold">{label}</span>
        <svg className={cn("h-3 w-3 text-gray-500 transition-transform duration-200", open ? "rotate-180" : "rotate-0")} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--underline-color)] opacity-0 scale-95 group-hover:opacity-100 group-focus:opacity-100 group-hover:scale-100 group-focus:scale-100 transition-all duration-200" />
      </button>

      {open && (
        <ul role="listbox" tabIndex={-1} className="absolute right-0 mt-2 w-28 rounded-xl border border-gray-200 bg-white shadow-lg focus:outline-none overflow-hidden z-50">
          {(["en", "ar"] as const).map((code) => {
            const active = value === code;
            return (
              <li key={code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(code);
                    setOpen(false);
                  }}
                  className={cn(
                    "group w-full text-left px-3 py-2 text-[13px] uppercase tracking-wide transition-colors",
                    active ? "text-gray-900 font-semibold" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  )}
                  style={{ ["--underline-color" as any]: colors[code] }}
                >
                  <span className="relative">
                    {code.toUpperCase()}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-3 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                      style={{ background: "var(--underline-color)" }}
                    />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Badge({ count }: { count?: number }) {
  if (!count) return null;
  return (
    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] font-semibold text-white grid place-items-center" aria-label={`${count} items`}>
      {count}
    </span>
  );
}

function ActionIconButton({
  onClick,
  label,
  iconSrc,
  count,
  underlineColor,
  className,
}: {
  onClick: () => void;
  label: string;
  iconSrc: string;
  count?: number;
  underlineColor?: string;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={label}
      className={cn("group relative h-11 w-11 rounded-full hover:bg-gray-100", className)}
      style={{ ["--underline-color" as any]: underlineColor ?? "#a7f3d0" }}
    >
      <Image src={iconSrc} alt="" width={20} height={20} sizes="20px" className="block h-5 w-5" priority />
      <Badge count={count} />
      <span
        aria-hidden
        className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
        style={{ background: "var(--underline-color)" }}
      />
    </Button>
  );
}

export default function DesktopNavbar({
  lang,
  setLang,
}: {
  lang: "en" | "ar";
  setLang: (v: "en" | "ar") => void;
}) {
  const router = useRouter();

  const navLinks = [
    { name: "Hub", href: "/" },
    { name: "Studio", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Innovation", href: "/" },
    { name: "Shop", href: "/" },
    { name: "Contact", href: "/" },
  ];

  const colors = ["#fbbf24", "#a7f3d0", "#bfdbfe", "#c7d2fe", "#fca5a5", "#fde68a"];
  const actionColors = ["#a7f3d0", "#fca5a5", "#bfdbfe"];

  const handleSearchSubmit = (q: string) => router.push(`/search?q=${encodeURIComponent(q)}`);

  return (
    <div className="hidden md:flex justify-between items-center h-full">
      <Link href="/" className="rounded-md block mr-10 shrink-0">
        <Image src="/logo.png" alt="logo" width={156} height={42} sizes="(max-width: 1024px) 140px, 156px" className="block h-14 w-auto" priority />
      </Link>

      <div className="flex items-center">
        <nav className="flex items-center gap-x-6 lg:gap-x-8 xl:gap-x-10 2xl:gap-x-12 md:pr-8">
          {navLinks.map((link, idx) => (
            <Link key={link.name} href={link.href} className="shrink-0">
              <span
                className="relative text-[clamp(12px,0.95vw,15px)] tracking-wide font-light uppercase text-gray-900 hover:text-gray-800 transition-colors duration-200"
                style={{ ["--underline-color" as any]: colors[idx % colors.length] }}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex items-center mx-auto gap-2">
          <InlineSearch onSubmit={handleSearchSubmit} underlineColor={colors[2]} />
          <LangDropdown value={lang} onChange={setLang} />

          <div className="flex items-center gap-2 shrink-0">
            <ActionIconButton onClick={() => router.push("/wishlist")} label="Wishlist" iconSrc="/icons/wishlist.svg" count={0} underlineColor={actionColors[0]} />
            <ActionIconButton onClick={() => router.push("/cart")} label="Cart" iconSrc="/icons/cart.svg" count={0} underlineColor={actionColors[1]} />
            <ActionIconButton onClick={() => router.push("/account")} label="Profile" iconSrc="/icons/profile.svg" underlineColor={actionColors[2]} />
          </div>
        </div>
      </div>
    </div>
  );
}
