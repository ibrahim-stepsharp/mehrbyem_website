import { Text } from "@medusajs/ui"
import { listProducts } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import AddToCartButton from "./add-to-cart-button"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const variantId = product.variants?.[0]?.id

  return (
    <article className="group bg-surface-container-lowest rounded-lg border border-outline-variant/5 overflow-hidden transition-all duration-300 hover:border-outline-variant/20 hover:shadow-sm">
      <LocalizedClientLink href={`/products/${product.handle}`} className="flex flex-col h-full">
        {/* Image Container - Rounded by parent's overflow-hidden, but flat at bottom */}
        <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="transition-transform duration-1000 ease-out group-hover:scale-105 rounded-lg"
          />
        </div>
        
        {/* Content Area - Rounded at bottom by parent card */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex flex-col gap-y-2 mb-6">
            <h3 className="font-noto-serif text-lg text-on-surface leading-tight line-clamp-2 font-medium tracking-tight">
              {product.title}
            </h3>
            {product.description && (
              <p className="font-noto-serif text-xs text-on-surface-variant italic leading-relaxed line-clamp-2 opacity-70">
                {product.description}
              </p>
            )}
          </div>
          
          <div className="mt-auto flex justify-between items-center">
            <div className="font-jakarta text-base font-bold text-primary tracking-tight">
              {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
            </div>
            <div className="bg-primary/5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-container text-primary group-hover:text-on-primary p-2.5 rounded-full transition-all duration-300 shadow-sm group-hover:scale-105">
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </LocalizedClientLink>
    </article>
  )
}
