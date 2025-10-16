"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AnimateOnViewOnce from "@/components/AnimateOnViewOnce";
import { Search } from "lucide-react";

export default function SearchSection() {
  return (
    <section className="py-20 sm:py-24 bg-[#f6f3f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side content */}
          <motion.div 
            className="flex-1 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-gray-900 leading-tight mb-6">
              Find the perfect product for your next project
            </h2>
            
            <p className="text-base sm:text-xl leading-relaxed text-[#999999] mb-10">
              Our curated collection offers innovative solutions for every need. 
              From cutting-edge technology to elegant design pieces, discover 
              products that inspire and perform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link href="/search" className="group ">
                <div className=" text-black px-8 py-4 flex items-center gap-3 transition-all ">
                
                  {/* <AnimateOnViewOnce
                    delay={300}
                    className="link-highlight link-highlight-yellow"
                  
                  >
                    
                    <span className="relative flex items-center justify-center z-10 text-lg font-medium">
                          <Search className="w-5 h-5" />
                      Explore Products
                    </span>
                  </AnimateOnViewOnce> */}
                </div>
              </Link>
              
          
            </div>
          </motion.div>
          
          {/* Right side image */}
          <motion.div 
            className="flex-1 order-1 lg:order-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
              <Image
                src="/product/cophy.webp" 
                alt="Product showcase" 
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}