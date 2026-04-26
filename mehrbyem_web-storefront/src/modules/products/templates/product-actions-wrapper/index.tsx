import { getProductSizeGraph, listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import ProductActions from "@modules/products/components/product-actions"
import { ProductSizeGraph } from "types/global"

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({
  id,
  region,
  sizeGraph: passedSizeGraph,
}: {
  id: string
  region: HttpTypes.StoreRegion
  sizeGraph?: ProductSizeGraph | null
}) {
  const product = await listProducts({
    queryParams: { id: [id] },
    regionId: region.id,
  }).then(({ response }) => response.products[0])

  if (!product) {
    return null
  }

  const sizeGraph = passedSizeGraph !== undefined 
    ? passedSizeGraph 
    : await getProductSizeGraph(product.id)

  return (
    <ProductActions product={product} region={region} sizeGraph={sizeGraph} />
  )
}
