import React, { Suspense } from "react"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { ProductSizeGraph } from "types/global"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
  sizeGraph: ProductSizeGraph | null
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
  sizeGraph,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  // Append size graph image if it exists
  const galleryImages = [...(images || [])]
  if (sizeGraph?.image) {
    galleryImages.push({
      id: "size-graph",
      url: sizeGraph.image,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      metadata: null,
    } as any)
  }

  return (
    <>
      <div
        className="max-w-[1024px] w-full mx-auto px-6 flex flex-col small:flex-row small:items-start py-6 relative gap-x-8 md:gap-x-16"
        data-testid="product-container"
      >
        {/* Left Column: Image Gallery - Capped at 500px for a more compact look */}
        <div className="block w-full relative small:w-[500px] flex-shrink-0">
          <ImageGallery images={galleryImages} />
        </div>

        {/* Right Column: Info, Actions, Tabs */}
        <div className="flex flex-col small:sticky small:top-32 w-full py-8 small:py-0 small:flex-1 gap-y-12">
          <div className="flex flex-col gap-y-8">
            <ProductInfo product={product} />
            
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                  sizeGraph={sizeGraph}
                />
              }
            >
              <ProductActionsWrapper 
                id={product.id} 
                region={region} 
                sizeGraph={sizeGraph}
              />
            </Suspense>
          </div>

          <ProductTabs product={product} sizeGraph={sizeGraph} />
        </div>
      </div>

      {/* Related Products */}
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
