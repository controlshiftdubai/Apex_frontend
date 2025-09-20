"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import MobileDrawer from "@/components/MobileDrawer";
import { cn } from "@/lib/utils";

/* === Icons for light bg (menu/search only) === */
const MenuIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 26 24" strokeWidth={2.2} stroke="#9CA3AF" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7h16.5M3.75 17h16.5" />
  </svg>
);
const CrossIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="#9CA3AF" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
  </svg>
);
const SearchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#6b7280" className={className ?? "h-4 w-4"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.1-4.4a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z" />
  </svg>
);

/* === Search with FULL BORDER animation (uses --underline-color) === */
function InlineSearch({
  onSubmit,
  underlineColor = "#bfdbfe", // pass from palette if you want a different accent
}: {
  onSubmit: (q: string) => void;
  underlineColor?: string;
}) {
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const query = q.trim();
    if (query) onSubmit(query);
  };

  return (
    <form onSubmit={submit} role="search" aria-label="Site search" className="w-full max-w-sm">
      <div className="group relative" style={{ ["--underline-color" as any]: underlineColor }}>
        {/* animated full ring */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full",
            "ring-2 ring-[var(--underline-color)]",
            "opacity-0 scale-95 group-hover:opacity-100 group-focus-within:opacity-100",
            "group-hover:scale-100 group-focus-within:scale-100",
            "transition-all duration-200"
          )}
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search"
          className={cn(
            "relative h-8 w-full rounded-full bg-white pl-9 pr-3 text-sm placeholder:text-gray-400",
            "border transition-colors duration-200 focus:outline-none",
            focused ? "border-[var(--underline-color)]" : "border-gray-200"
          )}
        />
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </div>
      </div>
    </form>
  );
}

/* === EN | AR toggle next to search (small underline) === */
function LangToggle({
  value,
  onChange,
}: {
  value: "en" | "ar";
  onChange: (v: "en" | "ar") => void;
}) {
  const isEN = value === "en";
  const colors = { en: "#fbbf24", ar: "#a7f3d0" }; // tweak if needed

  return (
    <div className="flex items-center select-none gap-1">
      {/* EN */}
      <button
        type="button"
        onClick={() => onChange("en")}
        className="group relative px-2 text-[13px] uppercase tracking-wide  transition-colors duration-200"
        style={{ ["--underline-color" as any]: colors.en }}
        aria-pressed={isEN}
      >
        <span className={isEN ? "text-gray-700 font-semibold" : "text-gray-500 hover:text-gray-700"}>EN</span>
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-3 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-200"
          style={{ background: "var(--underline-color)" }}
        />
      </button>

      <span className="text-gray-300">|</span>

      {/* AR */}
      <button
        type="button"
        onClick={() => onChange("ar")}
        className="group relative px-2 text-[13px] uppercase tracking-wide transition-colors duration-200"
        style={{ ["--underline-color" as any]: colors.ar }}
        aria-pressed={!isEN}
      >
        <span className={!isEN ? "text-gray-900 font-semibold" : "text-gray-500 hover:text-gray-700"}>AR</span>
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-3 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-200"
          style={{ background: "var(--underline-color)" }}
        />
      </button>
    </div>
  );
}

function Badge({ count }: { count?: number }) {
  if (!count) return null;
  return (
    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] font-semibold text-white grid place-items-center">
      {count}
    </span>
  );
}

export default function Navbar() {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as "en" | "ar" | null) : null;
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
  }, [lang]);

  const navLinks = [
    { name: "Hub", href: "/" },
    { name: "Studio", href: "/" },
    { name: "Projects", href: "/" },
    { name: "Innovation", href: "/" },
    { name: "Shop", href: "/" },
    { name: "Contact", href: "/" },
  ];

  // palette used for underline accents
  const colors = ["#fbbf24", "#a7f3d0", "#bfdbfe", "#c7d2fe", "#fca5a5", "#fde68a"];
  const actionColors = ["#a7f3d0", "#fca5a5", "#bfdbfe"]; // wishlist, cart, profile

  const handleSearchSubmit = (query: string) => router.push(`/search?q=${encodeURIComponent(query)}`);

  return (
    <>
      {/* White sticky bg */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100">
        {/* Taller bar + bigger logo */}
        <div className="mx-auto h-[72px] md:h-[84px]">
          {/* DESKTOP row */}
          <div className="hidden md:flex items-center h-full px-6">
            {/* Logo (~30% bigger) */}
            <Link href="/" className="rounded-md block mr-6">
              <Image src="/logo.png" alt="logo" width={156} height={42} className="h-12 w-auto" priority />
            </Link>

            {/* Nav links with multicolor underline */}
            <nav className="flex items-center gap-x-8 lg:gap-x-10 xl:gap-x-12">
              {navLinks.map((link, idx) => (
                <Link key={link.name} href={link.href} className="shrink-0">
                  <span
                    className="relative text-[15px] tracking-wide font-light uppercase text-gray-900 hover:text-gray-800 transition-colors duration-200 nav-link-animate"
                    style={{ ["--underline-color" as any]: colors[idx % colors.length] }}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right side: search → EN|AR → actions */}
            <div className="ml-6 flex items-center gap-3 flex-1">
              <InlineSearch onSubmit={handleSearchSubmit} underlineColor={colors[2]} />
              <LangToggle value={lang} onChange={setLang} />

              {/* Actions using LOCAL SVGs */}
              <div className="ml-2 grid grid-cols-3 gap-3">
                {/* Wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative h-9 w-9 "
                  style={{ ["--underline-color" as any]: actionColors[0] }}
                  onClick={() => router.push("/wishlist")}
                  aria-label="Wishlist"
                >
                  <Image
                    src="/icons/wishlist.svg"
                    alt="Wishlist"
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                    priority
                  />
                  <Badge count={0} />
                  <span
                    className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                    style={{ background: "var(--underline-color)" }}
                  />
                </Button>

                {/* Cart */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative h-9 w-9 "
                  style={{ ["--underline-color" as any]: actionColors[1] }}
                  onClick={() => router.push("/cart")}
                  aria-label="Cart"
                >
                  <Image
                    src="/icons/cart.svg"
                    alt="Cart"
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                    priority
                  />
                  <Badge count={0} />
                  <span
                    className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                    style={{ background: "var(--underline-color)" }}
                  />
                </Button>

                {/* Profile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative h-9 w-9 "
                  style={{ ["--underline-color" as any]: actionColors[2] }}
                  onClick={() => router.push("/account")}
                  aria-label="Profile"
                >
                  <Image
                    src="/icons/profile.svg"
                    alt="Profile"
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px]"
                    priority
                  />
                  <span
                    className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                    style={{ background: "var(--underline-color)" }}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden flex items-center h-full px-3">
            <Link href="/" className="rounded-md block">
              <Image src="/logo.png" alt="logo" width={140} height={34} className="h-9 w-auto" priority />
            </Link>
            <div className="ml-auto flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/search")}
                className="h-10 w-10 hover:bg-gray-100"
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#6b7280" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.1-4.4a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z" />
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenMenuMobile((v) => !v)}
                className="h-10 w-10 hover:bg-gray-100"
                aria-label={openMenuMobile ? "Close menu" : "Open menu"}
              >
                {openMenuMobile ? <CrossIcon className="!h-7 !w-7" /> : <MenuIcon className="!h-7 !w-7" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={openMenuMobile}
        onClose={() => setOpenMenuMobile(false)}
        navLinks={[
          { name: "Hub", href: "/" },
          { name: "Studio", href: "/" },
          { name: "Projects", href: "/" },
          { name: "Innovation", href: "/" },
          { name: "Shop", href: "/" },
          { name: "Contact", href: "/" },
        ]}
      />
    </>
  );
}
