"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import Image from "next/image"
import React, { useEffect, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleViewSizeChart = () => {
      if (images.length > 0) {
        // Find the index of the size graph image (it's appended at the end in ProductTemplate)
        const sizeGraphIndex = images.findIndex((img) => img.id === "size-graph")
        if (sizeGraphIndex !== -1) {
          setCurrentIndex(sizeGraphIndex)
          // Scroll to the gallery
          const element = document.getElementById("product-gallery")
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      }
    }

    window.addEventListener("view-size-chart", handleViewSizeChart)
    return () => window.removeEventListener("view-size-chart", handleViewSizeChart)
  }, [images])

  if (!images.length) return null

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.pageX - left) / width) * 100
    const y = ((e.pageY - top) / height) * 100
    setMousePos({ x, y })
  }

  return (
    <div className="flex flex-col gap-y-4 w-full" id="product-gallery">
      {/* Main Image with Hover Zoom */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container-low rounded-2xl group cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[currentIndex].url}
          priority={true}
          className={clx(
            "absolute inset-0 object-cover transition-transform duration-500",
            isZoomed ? "scale-[2.5]" : "scale-100"
          )}
          style={isZoomed ? {
            transformOrigin: `${mousePos.x}% ${mousePos.y}%`
          } : undefined}
          alt={`Product image ${currentIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {images.length > 1 && (
          <>
            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePrev(); }}
                className="bg-surface/80 backdrop-blur-md p-2 rounded-full text-on-surface hover:bg-surface transition-colors shadow-sm cursor-pointer"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button 
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleNext(); }}
                className="bg-surface/80 backdrop-blur-md p-2 rounded-full text-on-surface hover:bg-surface transition-colors shadow-sm cursor-pointer"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentIndex(i); }}
                  className={clx(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                    i === currentIndex ? "bg-primary w-6" : "bg-primary/30"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          {images.map((image, i) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(i)}
              className={clx(
                "relative aspect-square w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                i === currentIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={image.url}
                fill
                className="object-cover"
                alt={`Thumbnail ${i + 1}`}
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
