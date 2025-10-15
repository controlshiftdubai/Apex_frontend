"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/utils/api/hooks/useDebounce";
import { useProducts } from "@/utils/api/hooks/product";
import { Loader2 } from "lucide-react";

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

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading } = useProducts({
    params: debouncedQuery ? { search: debouncedQuery, page: "1", pageSize: "5" } : undefined,
    payload: {},
  });

  const products = data?.payload?.results || [];

  useEffect(() => {
    setIsOpen(isFocused && debouncedQuery.length > 0);
  }, [debouncedQuery, isFocused]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchQuery = query.trim();
    if (searchQuery) {
      router.push(`/search?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setIsFocused(false);
    }
  };

  const handleProductClick = (productId: string) => {
    setIsOpen(false);
    setIsFocused(false);
    setQuery("");
  };

  const colors = ["#fbbf24", "#a7f3d0", "#bfdbfe", "#fca5a5", "#fde68a"];

  return (
    <div ref={searchRef} className="relative w-[125px] focus-within:w-[250px] transition-all xl:max-w-sm 2xl:max-w-md">
      <form onSubmit={handleSubmit} role="search" aria-label="Site search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search..."
          className="ring w-full font-light ltr:ps-9 rtl:pe-9 py-1 ring-gray-300 focus:ring-2 focus:ring-[rgb(150,150,180)] transition-all outline-none rounded-full"
        />
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {isLoading && debouncedQuery ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <SearchIcon className="size-4" />
          )}
        </div>
      </form>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-lg z-50 max-h-[400px] w-[300px] overflow-y-auto scroll-hidden">
          {isLoading && debouncedQuery ? (
            <div className="p-4 text-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
              <p className="text-sm">Searching...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="p-2">
                {products.map((product, idx) => (
                  <Link
                    key={product.id}
                    href={`/new-products/${product.id}`}
                    onClick={() => handleProductClick(product.id)}
                    className="group flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
                  >
                    <div className="relative w-14 h-14 flex-shrink-0 bg-gray-100">
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="relative inline-block">
                        <span className="text-sm font-medium text-gray-900 truncate block relative z-10 capitalize">
                          {product.name.length > 25
                            ? `${product.name.substring(0, 25)}...`
                            : product.name}
                        </span>
                        <span
                          className="absolute bottom-0 left-0 right-0 h-[6px] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                          style={{ backgroundColor: colors[idx % colors.length] }}
                          aria-hidden="true"
                        />
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.stock > 0 ? (
                          <span className="ml-2 text-green-600">In Stock</span>
                        ) : (
                          <span className="ml-2 text-red-600">Out of Stock</span>
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : debouncedQuery ? (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500 mb-3">No products found for "{query}"</p>
              <button
                onClick={handleSubmit}
                className="group cursor-pointer"
              >
                <span
                  className="relative inline-block text-sm font-medium text-gray-700"
                  style={{ ["--underline-color" as any]: "#fbbf24" }}
                >
                  <span className="relative z-10">
                    Try searching on full page
                  </span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[8px] bg-[var(--underline-color)] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
