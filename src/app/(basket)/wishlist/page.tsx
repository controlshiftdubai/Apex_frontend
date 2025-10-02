"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { useWishlist, useAddToCart, useRemoveFromWishlist } from "@/utils/api/hooks/basket";
import Loading from '@/components/loading';

const WishlistPage = () => {
  const { data, isLoading, error } = useWishlist({ params: {}, payload: {} });
  const addToCartMutation = useAddToCart();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null);

  const wishlistItems = data?.payload?.items || [];

  const handleRemove = (productId: string) => {
    removeFromWishlistMutation.mutate({ itemId: productId });
  };

  const handleAddToCart = (productId: string, quantity: number, itemId: string) => {
    setIsAddingToCart(itemId);
    addToCartMutation.mutate(
      { productId, quantity },
      {
        onSettled: () => {
          setIsAddingToCart(null);
        },
      }
    );
  };

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item: any) => {
      addToCartMutation.mutate({ productId: item.productId, quantity: item.quantity });
    });
  };

  const calculateTotal = () => {
    return wishlistItems.reduce((total: number, item: any) => total + item.product.price * item.quantity, 0);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error("Wishlist error:", error);
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Error Loading Wishlist</h2>
            <p className="text-red-600 mb-8">{error.toString()}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your wishlist yet. Start browsing and save your favorite items!
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="px-8 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="relative inline-block" style={{ ["--underline-color" as any]: "#FDB3CA" }}>
                <span className="relative z-10 text-4xl font-medium">My Wishlist</span>
                <span
                  className="absolute bottom-0 h-[14px] bg-[var(--underline-color)]"
                  style={{ left: "-16px", right: "-16px" }}
                  aria-hidden="true"
                />
              </h1>
              <p className="text-gray-600 mt-2">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddAllToCart}
                disabled={addToCartMutation.isPending}
                className="flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold hover:bg-gray-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                {addToCartMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
                <span>Add All to Cart</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {wishlistItems.map((item: any) => (
            <div
              key={item.id}
              className="bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200"
            >
              <div className="relative aspect-square bg-gray-100">
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => handleRemove(item.productId)}
                  disabled={removeFromWishlistMutation.isPending}
                  className="absolute top-3 right-3 p-2 bg-white shadow-lg hover:bg-red-50 transition-all duration-200 cursor-pointer group/remove rounded-full disabled:opacity-50"
                  title="Remove from wishlist"
                >
                  {removeFromWishlistMutation.isPending ? (
                    <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
                  ) : (
                    <Heart className="w-5 h-5 text-red-500 fill-current group-hover/remove:scale-110 transition-transform" />
                  )}
                </button>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[3rem] hover:text-gray-600 cursor-pointer text-lg">
                  {item.product.name}
                </h3>

                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-2xl font-bold text-gray-900">
                    {item.product.currency === "USD" ? "$" : item.product.currency}
                    {item.product.price.toFixed(2)}
                  </p>
                  {item.quantity > 1 && <span className="text-sm text-gray-500">x {item.quantity}</span>}
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Added{" "}
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => handleAddToCart(item.productId, item.quantity, item.productId)}
                    disabled={isAddingToCart === item.productId}
                    className="w-full py-3 font-semibold uppercase tracking-wide transition-all duration-200 relative text-gray-900 cursor-pointer hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span className="relative inline-block">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isAddingToCart === item.productId ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ShoppingCart className="w-4 h-4" />
                        )}
                        Add to Cart
                      </span>
                      <span className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#A5C1FF]" aria-hidden="true" />
                    </span>
                  </button>

                  <button
                    onClick={() => handleRemove(item.productId)}
                    disabled={removeFromWishlistMutation.isPending}
                    className="w-full py-3 text-gray-600 font-semibold uppercase tracking-wide cursor-pointer transition-all duration-200 hover:bg-gray-50 relative disabled:opacity-50"
                    title="Remove"
                  >
                    <span className="relative inline-block">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {removeFromWishlistMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Remove
                      </span>
                      <span className="absolute bottom-0 left-0 right-0 h-[8px] bg-[#FCA5A5]" aria-hidden="true" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="relative inline-block mb-2" style={{ ["--underline-color" as any]: "#FDE68A" }}>
                <span className="relative z-10 text-xl font-semibold">Wishlist Summary</span>
                <span
                  className="absolute bottom-0 h-[10px] bg-[var(--underline-color)]"
                  style={{ left: "-8px", right: "-8px" }}
                  aria-hidden="true"
                />
              </h3>
              <p className="text-gray-600 mt-3">
                Total Value:{" "}
                <span className="font-bold text-gray-900 text-xl">
                  {wishlistItems[0]?.product?.currency === "USD" ? "$" : wishlistItems[0]?.product?.currency || ""}
                  {calculateTotal().toFixed(2)}
                </span>
              </p>
            </div>
            <button
              onClick={handleAddAllToCart}
              disabled={addToCartMutation.isPending}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-[#FDE68A] text-gray-900 font-semibold hover:bg-[#FDD835] transition-colors cursor-pointer disabled:opacity-50"
            >
              <span>Move All to Cart</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer inline-flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Continue Shopping</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
