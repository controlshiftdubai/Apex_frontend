"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileDrawer from "@/components/MobileDrawer";
import { cn } from "@/lib/utils";

const MenuIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 26 24"
    strokeWidth={2.2}
    stroke="#CCCCCC"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 7h16.5M3.75 17h16.5"
    />
  </svg>
);

const CrossIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.2}
    stroke="#CCCCCC"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 6l12 12M6 18L18 6"
    />
  </svg>
);

export default function Navbar() {
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/a" },
    { name: "Projects", href: "/b" },
    { name: "Careers", href: "/c" },
    { name: "Contact", href: "/d" },
  ];
  const colors = ["#fca5a5", "#93c5fd", "#86efac", "#c4b5fd", "#fdba74"];

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 w-full h-[70px] z-40 bg-white`}
      >
        <div className="max-w-none px-4 mx-auto h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link href="/" className="rounded-md">
              <Image
                src="/logo.png"
                alt="3d logo"
                width={0}
                height={0}
                className="h-[40px] w-full"
                priority
                sizes="100vw"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center ml-auto gap-x-14 px-6">
              {navLinks.map((link, idx) => (
                <Link key={link.name} href={link.href}>
                  <span
                    className="relative text-lg font-light uppercase text-black hover:text-gray-800 transition-colors duration-200 nav-link-animate"
                    style={{
                      ["--underline-color" as any]: colors[idx],
                    }}
                  >
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Mobile button */}
            <div className="md:hidden ml-auto">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenMenuMobile(!openMenuMobile)}
                className={cn(
                  "h-12 w-12 text-gray-800 hover:bg-gray-100 transition-all duration-500 md:opacity-100 md:scale-100",
                  mounted
                    ? "opacity-100 scale-100 delay-200"
                    : "opacity-0 scale-75"
                )}
              >
                {openMenuMobile ? (
                  <CrossIcon className="!h-9 !w-9" />
                ) : (
                  <MenuIcon className="!h-9 !w-9" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={openMenuMobile}
        onClose={() => setOpenMenuMobile(false)}
        navLinks={navLinks}
      />
    </>
  );
}
