"use client";

import { Product } from "@/types/product";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PostClient({ product }: { product: Product }) {
  const baseProduct = JSON.parse(JSON.stringify(product)) as Product;
  const [selectedProduct, setSelectedProduct] = useState<Product>(baseProduct);

  console.log({ baseProduct });
  console.log({ selectedProduct });
  const changeProduct = (newProduct: Product) => {
    setSelectedProduct(newProduct);
  };

  return (
    <section className="max-w-7xl mx-auto max-lg:px-4 py-12 space-y-12 md:space-y-16">
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

  const ColorsAndVariants = () => {
    const handleButtonClick = (id: string) => {
      if (id === product.id) return;
      if (id === baseProduct.id) return changeProduct(baseProduct);

      const variant = variants.find((variant) => variant.id === id);
      if (variant) changeProduct(variant);
    };
    return (
      <div className="flex flex-col gap-2">
        <span className="text-lg">{product.colorName}</span>
        <div className="flex gap-3">
          <ColoredButton
            colorHex={baseProduct.colorHex}
            colorName={baseProduct.colorName}
            onclick={() => handleButtonClick(baseProduct.id)}
            isSelected={product.id === baseProduct.id}
          />
          {variants.map((variant) => (
            <ColoredButton
              key={variant.id}
              colorHex={variant.colorHex}
              colorName={variant.colorName}
              onclick={() => handleButtonClick(variant.id)}
              isSelected={product.id === variant.id}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">
        {product.name}
      </h1>
      <div className="grid grid-cols-5 gap-1 w-full">
        <ColorsAndVariants />
        <div className="col-span-3 flex justify-center items-center">
          <div className="relative size-96">
            <Image
              src={product.thumbnail}
              alt={product.name}
              width={0}
              height={0}
              unoptimized
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div>Variants selected with thumbnail</div>
      </div>

      <div className="flex w-full justify-between">
        <div>
          <div>Price: {product.price}</div>
          <div>Designed by Apex, 2019</div>
        </div>
        <div>
          <button>Wishlist</button>
          <button>Add To cart</button>
          <button>Buy Now</button>
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
          src={img}
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
            src={specImage}
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
