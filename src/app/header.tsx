"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import MobileDrawer from "@/components/MobileDrawer";
import { cn } from "@/lib/utils";

/* ---------- Icons (menu / close / search) ---------- */
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7h16.5M3.75 17h16.5" />
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
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
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
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.1-4.4a7.75 7.75 0 1 1-15.5 0 7.75 7.75 0 0 1 15.5 0Z" />
  </svg>
);

/* ---------- Search with FULL BORDER animation ---------- */
function InlineSearch({
  onSubmit,
  underlineColor = "#1ce7d3", // accent
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
    <form onSubmit={submit} role="search" aria-label="Site search" className="min-w-[160px] w-full max-w-[260px] xl:max-w-sm 2xl:max-w-md">
      <div
        className="group relative"
        style={{ ["--underline-color" as any]: underlineColor }}
      >
        {/* animated ring that wraps the whole border */}
        <span
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full",
            "ring-2 ring-[var(--underline-color)]",
            "opacity-0 scale-95 group-hover:opacity-100 group-focus-within:opacity-100",
            "group-hover:scale-100 group-focus-within:scale-100",
            "transition-all duration-200 motion-reduce:transition-none motion-reduce:opacity-0"
          )}
          aria-hidden="true"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search"
          className={cn(
            "relative h-8 w-full rounded-full bg-white pl-9 pr-3 text-sm placeholder:text-gray-400",
            "border focus:outline-none transition-colors duration-200 motion-reduce:transition-none",
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

/* ---------- EN | AR toggle (small underline) ---------- */
function LangToggle({
  value,
  onChange,
}: {
  value: "en" | "ar";
  onChange: (v: "en" | "ar") => void;
}) {
  const isEN = value === "en";
  const colors = { en: "#fbbf24", ar: "#a7f3d0" };

  return (
    <div className="flex items-center select-none gap-1">
      {/* EN */}
      <button
        type="button"
        onClick={() => onChange("en")}
        className="group relative px-2 text-[13px] uppercase tracking-wide transition-colors duration-200"
        style={{ ["--underline-color" as any]: colors.en }}
        aria-pressed={isEN}
      >
        <span className={isEN ? "text-gray-700 font-semibold" : "text-gray-500 hover:text-gray-700"}>EN</span>
        <span
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-3 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-200 motion-reduce:transition-none"
          style={{ background: "var(--underline-color)" }}
          aria-hidden="true"
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
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 w-3 origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-200 motion-reduce:transition-none"
          style={{ background: "var(--underline-color)" }}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

/* ---------- Small badge (cart count etc.) ---------- */
function Badge({ count }: { count?: number }) {
  if (!count) return null;
  return (
    <span
      className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-[10px] font-semibold text-white grid place-items-center"
      aria-label={`${count} items`}
    >
      {count}
    </span>
  );
}

export default function Navbar() {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const router = useRouter();

  /* ---------- Persist language + set dir/lang on <html> ---------- */
  useEffect(() => {
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

  /* underline palette */
  const colors = ["#fbbf24", "#a7f3d0", "#bfdbfe", "#c7d2fe", "#fca5a5", "#fde68a"];
  const actionColors = ["#a7f3d0", "#fca5a5", "#bfdbfe"]; // wishlist, cart, profile

  const handleSearchSubmit = (q: string) => router.push(`/search?q=${encodeURIComponent(q)}`);

  return (
    <>
      {/* Sticky white bg; Safari-friendly blur support & safe max width */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100">
        <div className="mx-auto max-w-screen-2xl h-[72px] md:h-[84px] px-3 sm:px-4 lg:px-6">
          {/* Desktop row */}
          <div className="hidden md:flex items-center h-full">
            {/* Logo — make it block so Safari doesn't add baseline gap; add sizes to prevent CLS */}
            <Link href="/" className="rounded-md block mr-6 shrink-0">
              <Image
                src="/logo.png"
                alt="logo"
                width={156}
                height={42}
                sizes="(max-width: 1024px) 140px, 156px"
                className="block h-12 w-auto"
                priority
              />
            </Link>

            {/* Nav links — responsive gaps that won’t crowd or over-stretch */}
            <nav className="flex items-center gap-x-6 lg:gap-x-8 xl:gap-x-10 2xl:gap-x-12">
              {navLinks.map((link, idx) => (
                <Link key={link.name} href={link.href} className="shrink-0">
                  <span
                    className="relative text-[clamp(12px,0.95vw,15px)] tracking-wide font-light uppercase text-gray-900 hover:text-gray-800 transition-colors duration-200 nav-link-animate"
                    style={{ ["--underline-color" as any]: colors[idx % colors.length] }}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Right side: search → EN|AR → actions
                min-w-0 prevents overflow on narrow viewports */}
            <div className="ml-6 flex items-center gap-3 flex-1 min-w-0">
              <InlineSearch onSubmit={handleSearchSubmit} underlineColor={colors[2]} />
              <LangToggle value={lang} onChange={setLang} />

              {/* Actions (local SVGs). Using next/image for cache/layout; mark as block for Safari */}
              <div className="ml-2 grid grid-cols-3 gap-3">
                {/* Wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative h-9 w-9 rounded-full hover:bg-gray-100"
                  style={{ ["--underline-color" as any]: actionColors[0] }}
                  onClick={() => router.push("/wishlist")}
                  aria-label="Wishlist"
                >
                  <Image
                    src="/icons/wishlist.svg"
                    alt=""
                    width={22}
                    height={22}
                    sizes="22px"
                    className="block h-[22px] w-[22px]"
                    priority
                  />
                  <Badge count={0} />
                  <span
                    className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                    style={{ background: "var(--underline-color)" }}
                    aria-hidden="true"
                  />
                </Button>

                {/* Cart */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative h-9 w-9 rounded-full hover:bg-gray-100"
                  style={{ ["--underline-color" as any]: actionColors[1] }}
                  onClick={() => router.push("/cart")}
                  aria-label="Cart"
                >
                  <Image
                    src="/icons/cart.svg"
                    alt=""
                    width={22}
                    height={22}
                    sizes="22px"
                    className="block h-[22px] w-[22px]"
                    priority
                  />
                  <Badge count={0} />
                  <span
                    className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                    style={{ background: "var(--underline-color)" }}
                    aria-hidden="true"
                  />
                </Button>

                {/* Profile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative h-9 w-9 rounded-full hover:bg-gray-100"
                  style={{ ["--underline-color" as any]: actionColors[2] }}
                  onClick={() => router.push("/account")}
                  aria-label="Profile"
                >
                  <Image
                    src="/icons/profile.svg"
                    alt=""
                    width={22}
                    height={22}
                    sizes="22px"
                    className="block h-[22px] w-[22px]"
                    priority
                  />
                  <span
                    className="pointer-events-none absolute left-2 right-2 bottom-1 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                    style={{ background: "var(--underline-color)" }}
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile row (kept compact, won’t overflow) */}
          <div className="md:hidden flex items-center h-full">
            <Link href="/" className="rounded-md block shrink-0">
              <Image
                src="/logo.png"
                alt="logo"
                width={140}
                height={34}
                sizes="140px"
                className="block h-9 w-auto"
                priority
              />
            </Link>

            <div className="ml-auto flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/search")}
                className="h-10 w-10 hover:bg-gray-100"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5" />
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

      {/* Drawer stays the same */}
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
