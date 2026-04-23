import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ProductFilters from "@modules/store/components/product-filters"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  q,
  categoryId,
  collectionId,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  q?: string
  categoryId?: string
  collectionId?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const categories = await listCategories()
  const { collections } = await listCollections()

  return (
    <div
      className="flex flex-col py-12 md:py-24 content-container"
      data-testid="category-container"
    >
      <ProductFilters 
        sortBy={sort} 
        q={q} 
        categoryId={categoryId} 
        collectionId={collectionId} 
        categories={categories}
        collections={collections}
      />
      <div className="w-full">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            q={q}
            categoryId={categoryId}
            collectionId={collectionId}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
