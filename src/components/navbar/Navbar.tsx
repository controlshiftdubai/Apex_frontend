"use client";

import * as React from "react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileBottomBar from "./MobileBottomBar";
import MobileDrawer from "@/components/MobileDrawer";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [openMenuMobile, setOpenMenuMobile] = React.useState(false);
  const [lang, setLang] = React.useState<"en" | "ar">("en");
  const pathname = usePathname();

  React.useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? (localStorage.getItem("lang") as "en" | "ar" | null)
        : null;
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute(
        "dir",
        lang === "ar" ? "rtl" : "ltr"
      );
    }
  }, [lang]);

  const navLinks = [
    { name: "Hub", href: "/hub" },
    { name: "Studio", href: "/studio" },
    { name: "Projects", href: "/projects" },
    { name: "Innovation", href: "/innovation" },
    { name: "Shop", href: "/expertise" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white backdrop-blur border-b border-gray-100">
        <div className="mx-auto h-[72px] md:h-[84px] px-3 sm:px-4 lg:px-6">
          <DesktopNavbar navLinks={navLinks} pathname={pathname} />
          <MobileNavbar
            lang={lang}
            setLang={setLang}
            openMenuMobile={openMenuMobile}
            setOpenMenuMobile={setOpenMenuMobile}
            pathname={pathname}
          />
        </div>
      </header>

      <MobileDrawer
        open={openMenuMobile}
        onClose={() => setOpenMenuMobile(false)}
        navLinks={navLinks}
        pathname={pathname}
        id="mobile-drawer"
      />

      <MobileBottomBar wishlistCount={0} cartCount={0} />
    </>
  );
}
