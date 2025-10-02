  "use client";

  import { useState, useEffect, FormEvent } from "react";
  import Link from "next/link";
  import Image from "next/image";
  import { usePathname, useRouter } from "next/navigation";
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

  /* ---------- Search with FULL BORDER animation ---------- */
  function InlineSearch({
    onSubmit,
    underlineColor = "#1ce7d3",
  }: {
    onSubmit: (q: string) => void;
    underlineColor?: string;
  }) {
    const [q, setQ] = useState("");

    const submit = (e: FormEvent) => {
      e.preventDefault();
      const query = q.trim();
      if (query) onSubmit(query);
    };

    return (
      <form
        onSubmit={submit}
        role="search"
        aria-label="Site search"
        className="w-[125px] focus-within:w-[250px] transition-all xl:max-w-sm 2xl:max-w-md relative"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search"
          className="rounded-full ring w-full font-light ltr:ps-9 rtl:pe-9 py-1 ring-gray-300 focus:ring-2 focus:ring-[rgb(150,150,180)] transition-all outline-none"
        />
        <SearchIcon className="pointer-events-none size-4 absolute left-3 top-1/2 -translate-y-1/2" />
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
    const [isOpen, setIsOpen] = useState(false);
    const isEN = value === "en";
    const colors = { en: "#fbbf24", ar: "#a7f3d0" };

    return (
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          type="button"
          className="flex items-center gap-1 px-2 py-1 text-[13px] uppercase tracking-wide transition-colors duration-200 cursor-pointer hover:text-gray-7200"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="">{value.toUpperCase()}</span>
          <svg
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 -mt-1 bg-white border border-gray-200 rounded-md overflow-hidden shadow-lg z-50">
            <button
              type="button"
              onClick={() => onChange("en")}
              className="group relative w-full text-left text-[13px] uppercase tracking-wide transition-colors duration-200 cursor-pointer hover:bg-gray-200 px-4 py-2"
              style={{ ["--underline-color" as any]: colors.en }}
            >
              <span
                className={isEN ? "text-gray-900 font-semibold" : "text-gray-600"}
              >
                EN
              </span>
            </button>
            <button
              type="button"
              onClick={() => onChange("ar")}
              className="group relative w-full text-left text-[13px] uppercase tracking-wide transition-colors duration-200 cursor-pointer hover:bg-gray-200 px-4 py-2"
              style={{ ["--underline-color" as any]: colors.ar }}
            >
              <span
                className={
                  !isEN ? "text-gray-900 font-semibold" : "text-gray-600"
                }
              >
                AR
              </span>
            </button>
          </div>
        )}
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

  export default function Navbar({
    navLinks,
  }: {
    navLinks: { name: string; href: string }[];
  }) {
    const [openMenuMobile, setOpenMenuMobile] = useState(false);
    const [lang, setLang] = useState<"en" | "ar">("en");
    const router = useRouter();

    useEffect(() => {
      const saved =
        typeof window !== "undefined"
          ? (localStorage.getItem("lang") as "en" | "ar" | null)
          : null;
      if (saved === "en" || saved === "ar") setLang(saved);
    }, []);
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", lang);
        document.documentElement.setAttribute("lang", lang);
      }
    }, [lang]);

    const colors = [
      "#fbbf24",
      "#a7f3d0",
      "#bfdbfe",
      "#c7d2fe",
      "#fca5a5",
      "#fde68a",
    ];
    const actionColors = ["#a7f3d0", "#fca5a5", "#bfdbfe"];

    const handleSearchSubmit = (q: string) =>
      router.push(`/search?q=${encodeURIComponent(q)}`);

    const pathname = usePathname();
    return (
      <>
        <header className="sticky max-md:hidden top-0 z-40 border-b border-gray-100">
          <div className="mx-auto h-[72px] md:h-[84px]">
            {/* Desktop row */}
            <div className="hidden md:flex justify-between items-center h-full">
              <Link
                href="/"
                className="rounded-md block mr-10 shrink-0 cursor-pointer"
              >
                <Image
                  src="https://d33609liqwio9r.cloudfront.net/2025-09-30T10:28:54.401Z-Apex_logo.webp"
                  alt="logo"
                  width={156}
                  height={42}
                  sizes="(max-width: 1024px) 140px, 156px"
                  className="block h-14 w-auto"
                  priority
                />
              </Link>

              <div className="flex items-center">
                <nav className="flex items-center gap-x-6 lg:gap-x-8 xl:gap-x-10 2xl:gap-x-12 md:pr-8">
                  {navLinks.map((link, idx) => {
                    const isActive = pathname === link.href;

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="shrink-0 cursor-pointer"
                      >
                        <span
                          className={cn(
                            "relative cursor-pointer text-[clamp(17px,0.95vw,15px)] tracking-wide font-light uppercase text-gray-900 transition-colors duration-200 nav-link-animate",
                            isActive && "active"
                          )}
                          style={{
                            ["--underline-color" as any]:
                              colors[idx % colors.length],
                          }}
                        >
                          {link.name}
                        </span>
                      </Link>
                    );
                  })}
                </nav>

                <div className="flex-1 flex items-center gap-2">
                  <InlineSearch
                    onSubmit={handleSearchSubmit}
                    underlineColor={colors[2]}
                  />
                  <LangToggle value={lang} onChange={setLang} />

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-3 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="group relative h-9 w-9 cursor-pointer rounded-full hover:bg-white/0"
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

                    <Button
                      variant="ghost"
                      size="icon"
                      className="group relative h-9 w-9 cursor-pointer rounded-full hover:bg-white/0"
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

                    <Button
                      variant="ghost"
                      size="icon"
                      className="group relative h-9 w-9 cursor-pointer rounded-full hover:bg-white/0"
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

              {/* Mobile row */}
              <div className="md:hidden flex items-center h-full">
                <Link
                  href="/"
                  className="rounded-md block shrink-0 cursor-pointer"
                >
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
                    className="h-10 w-10 hover:bg-gray-100 cursor-pointer"
                    aria-label="Search"
                  >
                    <SearchIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpenMenuMobile((v) => !v)}
                    className="h-10 w-10 hover:bg-gray-100 cursor-pointer"
                    aria-label={openMenuMobile ? "Close menu" : "Open menu"}
                  >
                    {openMenuMobile ? (
                      <CrossIcon className="!h-7 !w-7" />
                    ) : (
                      <MenuIcon className="!h-7 !w-7" />
                    )}
                  </Button>
                </div>
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
