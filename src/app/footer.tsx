import React from "react";
import Link from "next/link";
import { FacebookIcon, Youtube, Twitter } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-[#f6f3f1] text-black min-h-screen flex items-end relative">
      {/* Header Section */}
      <div className="absolute inset-0 flex items-center flex-col justify-center px-4">
        <h2
          className={cn(
            "font-light text-gray-900 mb-8 leading-tight text-center",
            "text-2xl sm:text-3xl md:text-4xl lg:text-[45px]",
            "lg:leading-14",
            "max-w-3xl"
          )}
        >
          Together, we can shape the future with powerful creations.
        </h2>
        <p className="link-highlight cursor-pointer px-6 link-highlight-yellow relative inline-block text-2xl text-black">
          See our projects
        </p>
      </div>
    </footer>
  );
}

const Footer2 = (
  <div className="w-full px-6 pt-16 pb-4">
    {/* Main Footer Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10">
      {/* Left Side - Logo and Description */}
      <div className="space-y-6">
        <div className="flex-shrink-0 max-sm:justify-center flex">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="The Nuaims FZE Logo"
              width={260}
              height={90}
              className="h-28 w-auto "
              priority
            />
          </Link>
        </div>

        <p className="sm:text-lg md:!text-lg text-gray-600 leading-relaxed max-w-md transition-colors duration-300 hover:text-gray-900">
          We design innovative spaces and personalized tech products that
          enhance lifestyles, experiences, and environments.
        </p>
      </div>

      {/* Right Side - Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 max-sm:!grid-cols-2 gap-8">
        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-gray-900 transition-transform duration-300 hover:translate-x-1">
            Company
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                Careers
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-gray-900 transition-transform duration-300 hover:translate-x-1">
            Resources
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                Case Studies
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <h3 className="text-lg font-semibold mb-6 text-gray-900 justify-center transition-transform duration-300 hover:translate-x-1">
            Legal
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-base text-gray-600 hover:text-gray-900 transition-all duration-300 hover:translate-x-2"
              >
                Cookies Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
      {/* Copyright */}
      <div className="mb-4 md:mb-0">
        <p className="text-sm text-gray-500 max-sm:text-center transition-colors duration-300 hover:text-gray-900">
          © Copyright 2025, All Rights Reserved by Apex.
        </p>
        <p className="text-sm text-gray-500 max-sm:text-center transition-colors duration-300 hover:text-gray-900">
          Developed by{" "}
          <a
            href="https://controlshift.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Controlshift
          </a>{" "}
        </p>{" "}
      </div>

      {/* Social Icons */}
      <div className="flex items-center space-x-4">
        <Link
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-125"
        >
          <Youtube size={20} />
        </Link>
        <Link
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-125"
        >
          <FacebookIcon size={20} />
        </Link>
        <Link
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 transition-all duration-300 hover:scale-125"
        >
          <Twitter size={20} />
        </Link>
      </div>
    </div>
  </div>
);
