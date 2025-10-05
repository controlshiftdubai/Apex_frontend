"use client";

import type { Product } from "@/types/product";
import { memo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAddToCart, useAddToWishlist } from "@/utils/api/hooks/basket";
import { toast } from "sonner";

export default function PostClient({ product }: { product: Product }) {
  const baseProduct = JSON.parse(JSON.stringify(product)) as Product;
  const [selectedProduct, setSelectedProduct] = useState<Product>(baseProduct);

  console.log({ baseProduct });
  console.log({ selectedProduct });
  const changeProduct = (newProduct: Product) => {
    setSelectedProduct(newProduct);
  };

  return (
    <section className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 xl:px-6 2xl:px-0 py-12 space-y-12 md:space-y-16">
      <HeroSection
        baseProduct={baseProduct}
        product={selectedProduct}
        changeProduct={changeProduct}
      />
      <VideoSection product={selectedProduct} />
      <GeneralText product={selectedProduct} />
      <ProductGallerySection product={selectedProduct} />
      <SpecificationsSection product={selectedProduct} />
      {/* <RelatedProductsSection product={selectedProduct} /> */}
      {/* <ReviewsSection product={selectedProduct} /> */}
    </section>
  );
}

function VariantWheel({
  items,
  activeId,
  onSelect,
}: {
  items: Product[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [offset, setOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const totalItems = items.length;
  const itemHeight = 110; // Height between items

  useEffect(() => {
    // Calculate offset needed to bring active item to center
    const targetOffset = -activeIndex * itemHeight;
    setIsAnimating(true);
    setOffset(targetOffset);

    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [activeId, activeIndex]);

  return (
    <div className="relative w-32 h-80 flex items-center justify-center overflow-hidden">
      {/* Gradient masks for top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none z-30" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-30" />

      {/* Center indicator */}
      {/* <div className="absolute left-0 right-0 top-1/2 h-28 -translate-y-1/2 border-2 border-black/10 rounded-lg pointer-events-none z-20" /> */}

      {/* Wheel container */}
      <div
        className="relative w-full flex flex-col items-center"
        style={{
          transform: `translateY(calc(50% + ${offset}px))`,
          transition: isAnimating
            ? "transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)"
            : "none",
        }}
      >
        {/* Render items 3 times for infinite scroll effect */}
        {[...items, ...items, ...items].map((product, idx) => {
          const actualIndex = idx % totalItems;
          const isActive =
            product.id === activeId &&
            idx >= totalItems &&
            idx < totalItems * 2;

          // Calculate distance from center
          const itemPosition = idx * itemHeight + offset;
          const centerPosition = 0;
          const distanceFromCenter = Math.abs(itemPosition - centerPosition);

          // Scale and opacity based on distance from center
          const scale = isActive
            ? 1.25
            : Math.max(0.7, 1 - distanceFromCenter / 300);
          const opacity =
            distanceFromCenter < 150
              ? 1
              : Math.max(0, 1 - (distanceFromCenter - 150) / 100);

          return (
            <div
              key={`${product.id}-${idx}`}
              onClick={() => onSelect(product.id)}
              className="cursor-pointer flex-shrink-0"
              style={{
                marginBottom: "10px",
                transform: `scale(${scale})`,
                transition: isAnimating
                  ? "transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.6s ease"
                  : "transform 0.3s ease, opacity 0.3s ease",
                opacity: opacity,
                zIndex: isActive ? 25 : 10,
                width: isActive ? "110px" : "88px",
                height: isActive ? "110px" : "88px",
              }}
            >
              <div
                className={`w-full h-full rounded-lg overflow-hidden transition-all duration-300`}
              >
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeroSection({
  baseProduct,
  product,
  changeProduct,
}: {
  baseProduct: Product;
  product: Product;
  changeProduct: (newProduct: Product) => void;
}) {
  const variants = baseProduct.variants || [];
  const allProducts = [baseProduct, ...variants];

  const handleProductSelect = (id: string) => {
    if (id === product.id) return;
    if (id === baseProduct.id) return changeProduct(baseProduct);

    const variant = variants.find((variant) => variant.id === id);
    if (variant) changeProduct(variant);
  };

  const addToCartMutation = useAddToCart();
  const addToWishlistMutation = useAddToWishlist();

  const handleAddToCart = () => {
    addToCartMutation.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Product added to cart");
        },
        onError: (error) => {
          toast.error("Error adding product to cart");
          console.error(error);
        },
      }
    );
  };
  const handleAddToWishlist = () => {
    addToWishlistMutation.mutate(
      { productId: product.id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success("Product added to wishlist");
        },
        onError: (error) => {
          toast.error("Error adding product to wishlist");
          console.error(error);
        },
      }
    );
  };
  return (
    <div className="relative">
      <div className="flex flex-col">
        {/* Product Title with enhanced typography */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            {product.name}
          </h1>
          <p className="text-base text-gray-500">Designed by Apex, 2019</p>
        </div>

        {/* Main layout with improved spacing */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-8 lg:gap-12 w-full items-center">
          {/* Left - color selectors with enhanced UI */}
          <div className="flex flex-col gap-6 lg:order-1 order-2">
            <div className="space-y-3">
              <span className="text-sm uppercase tracking-wider font-medium text-gray-500">
                Color
              </span>
              <span className="text-2xl font-semibold block">
                {product.colorName}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <ColoredButton
                colorHex={baseProduct.colorHex}
                colorName={baseProduct.colorName}
                onclick={() => handleProductSelect(baseProduct.id)}
                isSelected={product.id === baseProduct.id}
              />
              {variants.map((variant) => (
                <ColoredButton
                  key={variant.id}
                  colorHex={variant.colorHex}
                  colorName={variant.colorName}
                  onclick={() => handleProductSelect(variant.id)}
                  isSelected={product.id === variant.id}
                />
              ))}
            </div>
          </div>

          {/* Center - main image with enhanced presentation */}
          <div className="flex justify-center items-center lg:order-2 order-1">
            <div className="relative w-full max-w-xs lg:max-w-sm aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-transparent rounded-3xl" />
              <img
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.name}
                className="relative w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right - variant wheel with better integration */}
          <div className="flex items-center justify-center lg:justify-end lg:order-3 order-3">
            <div className="space-y-3">
              <VariantWheel
                items={allProducts}
                activeId={product.id}
                onSelect={handleProductSelect}
              />
            </div>
          </div>
        </div>

        {/* Bottom section with improved layout */}
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-6 pt-6 border-t border-gray-200">
          <div className="space-y-1">
            <div className="text-4xl font-bold tracking-tight">
              {product.currency} {product.price}
            </div>
            <div className="text-sm text-gray-500">
              Free shipping on orders over $100
            </div>
          </div>
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button
              onClick={handleAddToWishlist}
              className="flex-1 md:flex-none px-6 py-3 font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all border border-gray-300 rounded-lg"
            >
              Wishlist
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 md:flex-none px-6 py-3 font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-all border border-gray-300 rounded-lg"
            >
              Add To Cart
            </button>
            <button className="flex-1 md:flex-none px-8 py-3 font-semibold bg-black text-white hover:bg-gray-800 transition-all rounded-lg shadow-lg hover:shadow-xl">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ColoredButton = memo(
  (props: {
    className?: string;
    colorHex: string;
    colorName: string;
    onclick: () => void;
    isSelected: boolean;
  }) => {
    return (
      <button
        className={cn(
          "rounded-full size-8 aspect-square cursor-pointer ring-1 ring-transparent transition-all duration-200 ring-offset-2",
          props.isSelected && "ring-black"
        )}
        title={props.colorName}
        style={{ backgroundColor: `#${props.colorHex}` }}
        onClick={props.onclick}
      />
    );
  }
);
ColoredButton.displayName = "ColoredButton";

function VideoSection({ product }: { product: Product }) {
  return (
    <div className="w-full aspect-[2/1] overflow-hidden">
      <video autoPlay loop muted>
        <source src={product.video || ""} type="video/mp4" />
      </video>
    </div>
  );
}

function GeneralText({ product }: { product: Product }) {
  return (
    <div className="prose max-w-none text-center space-y-4">
      <h3 className="text-2xl md:text-4xl font-medium">Designing Security</h3>
      <p className="text-lg md:text-xl text-gray-500">
        LAYER collaborated with leading crypto brand Ledger and renowned
        entrepreneur Tony Fadell to create Ledger Stax. The defining feature of
        the credit-card-sized Ledger Stax is the innovative and sustainable
        e-ink touchscreen that curves around the front face and spine of the
        device to elevate the user experience.
      </p>
    </div>
  );
}

function ProductGallerySection({ product }: { product: Product }) {
  return (
    <div className="grid grid-cols-2 gap-10">
      {product.images.map((img, idx) => (
        <Image
          key={idx}
          src={img || "/placeholder.svg"}
          alt={`Product image ${idx + 1}`}
          width={0}
          height={0}
          unoptimized
          className={cn("w-full", (idx + 1) % 3 === 0 && "col-span-2")}
        />
      ))}
    </div>
  );
}

function SpecificationsSection({ product }: { product: Product }) {
  // @ts-ignore
  const specImage = product.specificationsImage || product.thumbnail;
  return (
    <div>
      <h3 className="text-2xl md:text-4xl mb-10 text-center">Specifications</h3>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="w-full relative">
          <Image
            fill
            alt={product.name}
            unoptimized
            src={specImage || "/placeholder.svg"}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-3 text-lg">
          {Object.entries(product.specifications || {}).map(([key, value]) => (
            <div key={key} className="border-b py-2 flex justify-between">
              <span className="font-medium text-gray-600">{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RelatedProductsSection({ product }: { product: Product }) {
  return <div>Related Products - {JSON.stringify(product.name)}</div>;
}

function ReviewsSection({ product }: { product: Product }) {
  return <div>Reviews - {JSON.stringify(product.reviews)}</div>;
}
