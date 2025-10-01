import React from 'react'
import ProductHeroSection from './ProductHeroSection'
import VideoSection from './ProductVideoSection'

const Page = () => {
  return (
    <div className=''>
      <ProductHeroSection />
      <VideoSection videoUrl="https://cdn.layerdesign.com/wp-content/uploads/2024/02/LEVEL-2.mp4" thumbnailUrl='/product/product-image-1.jpg' />
    </div>
  )
}

export default Page