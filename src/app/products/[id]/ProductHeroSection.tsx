'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

interface ColorOption {
  name: string;
  value: string;
  bgColor: string;
}

const ProductHeroSection: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('Black');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const colorOptions: ColorOption[] = [
    { name: 'Black', value: 'black', bgColor: 'bg-black' },
    { name: 'Red', value: 'red', bgColor: 'bg-red-500' },
    { name: 'Blue', value: 'blue', bgColor: 'bg-blue-600' },
    { name: 'Grey', value: 'grey', bgColor: 'bg-gray-400' },
  ];

  const productImages: ProductImage[] = [
    {
      id: '1',
      src: '/product/product-image-1.jpg',
      alt: 'Zulay Kitchen Magia Clasica Espresso Machine - Main View'
    },
    {
      id: '2',
      src: '/product/product-image-2.jpg',
      alt: 'Zulay Kitchen Magia Clasica - Side View'
    },
    {
      id: '3',
      src: '/product/product-image-3.jpg',
      alt: 'Zulay Kitchen Magia Clasica - Detail View'
    },
  ];

  const price = '$10.56,500';
  const designerInfo = 'Designed by July, 2019';

  const handleAddToWishlist = () => {
    console.log('Added to wishlist');
  };

  const handleAddToCart = () => {
    console.log('Added to cart');
  };

  const handleBuyNow = () => {
    console.log('Buy now clicked');
  };

  return (
    <div className="w-full bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Large Screen Layout */}
        <div className="hidden xl:flex items-center justify-between gap-8">
          {/* Left Section - Product Info */}
          <div className="space-y-6 flex mb-auto flex-col items-start">
            <h1 className="text-2xl lg:text-4xl font-medium text-gray-900">
              Zulay Kitchen Magia Clasica
            </h1>

            <div className="space-y-3 mt-2">
              <p className="text-lg font-medium text-gray-700">{selectedColor}</p>
              <div className="flex space-x-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === color.name
                      ? 'border-gray-900 ring-2 ring-gray-600 ring-offset-2'
                      : 'border-gray-300 hover:border-gray-400'
                      } ${color.bgColor}`}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center Section - Main Product Image */}
          <div className="flex items-center justify-center -ml-10">
            <div className="relative w-full h-[520px] max-w-md aspect-square">
              <Image
                src={productImages[selectedImageIndex].src}
                alt={productImages[selectedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Section - Product Thumbnails */}
          <div className="space-y-4 flex flex-col items-center justify-center -mr-20">
            {productImages.map((image, index) => (
              <div className='flex flex-row-reverse items-center justify-center gap-2' key={image.id}>
                <div
                  className={`relative aspect-square cursor-pointer overflow-hidden transition-all duration-200 ${selectedImageIndex === index
                    ? 'width-[200px] h-[200px]'
                    : 'hover:border-gray-300 w-[80px] h-[80px]'
                    }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="">
                  <span className={`text-gray-500 bg-white px-2 py-1 rounded ${selectedImageIndex === index
                    ? 'text-xl text-gray-900'
                    : 'text-xs'
                    }`}>
                    Zulay Clasica
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Large Screen Bottom Section */}
        <div className='hidden xl:flex items-center justify-between -mt-10'>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{price}</p>
            <p className="text-sm text-gray-500 mt-2">{designerInfo}</p>
          </div>

          <div className='w-3/7 ml-auto'>
            <div className="flex items-center justify-between gap-4 mt-4 ml-auto">
              <button
                onClick={handleAddToWishlist}
                className="px-6 py-3 text-gray-700 font-medium text-lg uppercase tracking-wide text-[clamp(17px,0.95vw,15px)] w-40 cursor-pointer"
              >
                <p
                  className="relative"
                  style={{ ["--underline-color" as any]: "#FFC89F" }}
                >
                  <span className="relative z-10">WISH LIST</span>
                  <span
                    className="absolute bottom-0 left-0 h-[14px] w-28 bg-[var(--underline-color)]"
                    aria-hidden="true"
                  />
                </p>
              </button>
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 text-gray-700 font-medium text-lg uppercase tracking-wide text-[clamp(17px,0.95vw,15px)] w-52 cursor-pointer"
              >
                <p
                  className="relative"
                  style={{ ["--underline-color" as any]: "#D1FFD0" }}
                >
                  <span className="relative z-10">Add to Cart</span>
                  <span
                    className="absolute bottom-0 left-0 h-[14px] w-40 bg-[var(--underline-color)]"
                    aria-hidden="true"
                  />
                </p>
              </button>
              <button
                onClick={handleBuyNow}
                className="px-6 py-3 text-gray-700 font-medium text-lg uppercase tracking-wide text-[clamp(17px,0.95vw,15px)] w-40 cursor-pointer"
              >
                <p
                  className="relative"
                  style={{ ["--underline-color" as any]: "#F4FFCB" }}
                >
                  <span className="relative z-10">BUY Now</span>
                  <span
                    className="absolute bottom-0 left-0 h-[14px] w-28 bg-[var(--underline-color)]"
                    aria-hidden="true"
                  />
                </p>
              </button>
            </div>
            <div className="text-md text-gray-500 leading-5 text-right">
              We ensure every cup is rich and consistent by choosing materials with advanced
              technology. Our heat steam controls unit fighting your favorite grounds.
            </div>
          </div>
        </div>

        {/* Tablet and Mobile Layout */}
        <div className="xl:hidden space-y-8">
          {/* Mobile Header */}
          <div className="text-center space-y-4">
            <h1 className="text-xl md:text-2xl font-medium text-gray-900">
              Zulay Kitchen Magia Clasica
            </h1>
            <div className="space-y-2">
              <p className="text-base font-medium text-gray-700">{selectedColor}</p>
              <div className="flex justify-center space-x-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-200 ${selectedColor === color.name
                      ? 'border-gray-900 ring-2 ring-gray-600 ring-offset-2'
                      : 'border-gray-300 hover:border-gray-400'
                      } ${color.bgColor}`}
                    aria-label={`Select ${color.name} color`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Main Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm md:max-w-md h-[300px] md:h-[400px]">
              <Image
                src={productImages[selectedImageIndex].src}
                alt={productImages[selectedImageIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Mobile/Tablet Thumbnails */}
          <div className="flex justify-center gap-4 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <div key={image.id} className="flex-shrink-0 text-center space-y-2">
                <div
                  className={`relative cursor-pointer overflow-hidden rounded-lg transition-all duration-200 ${selectedImageIndex === index
                    ? 'w-20 h-20 md:w-24 md:h-24 border-2 border-gray-900'
                    : 'w-16 h-16 md:w-20 md:h-20 border border-gray-300 hover:border-gray-400'
                    }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className={`block text-gray-500 ${selectedImageIndex === index
                  ? 'text-sm font-medium text-gray-900'
                  : 'text-xs'
                  }`}>
                  Zulay Clasica
                </span>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Price and Info */}
          <div className="text-center space-y-2">
            <p className="text-2xl md:text-3xl font-bold text-gray-900">{price}</p>
            <p className="text-sm text-gray-500">{designerInfo}</p>
          </div>

          {/* Mobile/Tablet Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={handleAddToWishlist}
                className="px-6 py-3 text-gray-700 font-medium text-base uppercase tracking-wide cursor-pointer text-center"
              >
                <p
                  className="relative inline-block"
                  style={{ ["--underline-color" as any]: "#FFC89F" }}
                >
                  <span className="relative z-10">WISH LIST</span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]"
                    aria-hidden="true"
                  />
                </p>
              </button>
              <button
                onClick={handleAddToCart}
                className="px-6 py-3 text-gray-700 font-medium text-base uppercase tracking-wide cursor-pointer text-center"
              >
                <p
                  className="relative inline-block"
                  style={{ ["--underline-color" as any]: "#D1FFD0" }}
                >
                  <span className="relative z-10">Add to Cart</span>
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]"
                    aria-hidden="true"
                  />
                </p>
              </button>
            </div>
            <button
              onClick={handleBuyNow}
              className="w-full px-6 py-3 text-gray-700 font-medium text-base uppercase tracking-wide cursor-pointer text-center"
            >
              <p
                className="relative inline-block"
                style={{ ["--underline-color" as any]: "#F4FFCB" }}
              >
                <span className="relative z-10">BUY Now</span>
                <span
                  className="absolute bottom-0 left-0 right-0 h-[10px] bg-[var(--underline-color)]"
                  aria-hidden="true"
                />
              </p>
            </button>
          </div>

          {/* Mobile/Tablet Additional Info */}
          <div className="text-sm text-gray-500 leading-6 text-center px-4">
            We ensure every cup is rich and consistent by choosing materials with advanced
            technology. Our heat steam controls unit fighting your favorite grounds.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHeroSection;
