"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileDrawer = ({ open, onClose, navLinks }: any) => {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-[15] md:hidden transition-all duration-700 ease-in-out ${
        open ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Step 1: Background first */}
      <div
        className={`absolute inset-0 bg-white/90 backdrop-blur-md transform transition-transform duration-700 ease-in-out ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Links */}
          <div className="flex-1 flex items-center justify-center">
            <nav className="text-center space-y-8 overflow-hidden">
              {navLinks.map((link: any, idx: number) => {
                const isActive = pathname === link.href;

                // delay after bg (700ms) + stagger (idx * 300ms)
                const delay = open ? `${700 + idx * 300}ms` : "0ms";

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={onClose}
                    className="block"
                  >
                    <span
                      style={{ transitionDelay: delay }}
                      className={`block text-2xl font-medium tracking-wide transition-transform duration-[1200ms] ease-out
                        ${
                          open
                            ? "translate-y-0 opacity-100"
                            : "-translate-y-[120%] opacity-0"
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
