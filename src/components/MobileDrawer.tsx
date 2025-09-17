"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileDrawer = ({ open, onClose, navLinks }: any) => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-all duration-700 ease-in-out ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Drawer background + slide down */}
      <div
        className={`absolute inset-0 bg-white/95 backdrop-blur-sm transform transition-transform duration-700 ease-in-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`p-4 flex items-center justify-between border-b border-gray-200 transform transition-all duration-700 ${
              open
                ? "translate-y-0 opacity-100 scale-100"
                : "-translate-y-6 opacity-0 scale-95"
            }`}
            style={{ transitionDelay: open ? "200ms" : "0ms" }}
          >
            {/* Logo */}
            <Link href="/" onClick={onClose}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={160}
                height={60}
                className={`h-auto w-[120px] transition-all duration-700 ease-out ${
                  open
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                } hover:scale-110 hover:rotate-3`}
                priority
              />
            </Link>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={`h-12 w-12 text-gray-800 transition-all duration-700 ${
                open
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 rotate-45 scale-75"
              } hover:rotate-90 hover:scale-110`}
              style={{ transitionDelay: open ? "300ms" : "0ms" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="!h-9 !w-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          {/* Links */}
          <div className="flex-1 flex items-center justify-center">
            <nav className="text-center space-y-8">
              {navLinks.map((link: any, idx: number) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={onClose}
                    className="block"
                  >
                    <span
                      style={{
                        transitionDelay: open ? `${400 + idx * 150}ms` : "0ms",
                      }}
                      className={`block text-2xl font-medium tracking-wide transition-all duration-700 ease-out
                        ${
                          open
                            ? "translate-y-0 opacity-100"
                            : "translate-y-6 opacity-0"
                        }
                        ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-600 hover:text-gray-800"
                        }
                      `}
                    >
                      {link.name.toUpperCase()}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;
