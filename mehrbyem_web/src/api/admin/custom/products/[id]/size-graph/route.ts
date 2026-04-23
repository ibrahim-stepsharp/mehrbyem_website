import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  ContainerRegistrationKeys,
  MedusaError,
} from "@medusajs/framework/utils"

const getProductSizeGraph = async (pgConnection: any, productId: string) => {
  const result = await pgConnection.raw(
    `
      select
        p.id as product_id,
        pv.id as variant_id,
        pv.size_graph_id,
        sg.name as size_graph_name,
        sg.image as size_graph_image,
        sg.description as size_graph_description
      from "product" p
      join "product_variant" pv
        on pv.product_id = p.id
        and pv.deleted_at is null
      left join "size_graph" sg
        on sg.id = pv.size_graph_id
        and sg.deleted_at is null
      where p.id = ?
        and p.deleted_at is null
      order by pv.created_at asc
      limit 1
    `,
    [productId]
  )

  return result.rows?.[0]
}

const getSizeGraphById = async (pgConnection: any, id: string) => {
  const result = await pgConnection.raw(
    `
      select id, name, image, description
      from "size_graph"
      where id = ?
        and deleted_at is null
      limit 1
    `,
    [id]
  )

  return result.rows?.[0]
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
  const productSizeGraph = await getProductSizeGraph(pgConnection, req.params.id)

  if (!productSizeGraph) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Product not found or has no variants")
  }

  res.json({
    product_id: productSizeGraph.product_id,
    variant_id: productSizeGraph.variant_id,
    size_graph_id: productSizeGraph.size_graph_id,
    size_graph: productSizeGraph.size_graph_id
      ? {
          id: productSizeGraph.size_graph_id,
          name: productSizeGraph.size_graph_name,
          image: productSizeGraph.size_graph_image,
          description: productSizeGraph.size_graph_description,
        }
      : null,
  })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
  const payload = (req.body ?? {}) as Record<string, unknown>
  const inputId = payload.size_graph_id
  const sizeGraphId =
    inputId === null || inputId === undefined
      ? null
      : `${inputId}`.trim() || null

  if (sizeGraphId) {
    const sizeGraph = await getSizeGraphById(pgConnection, sizeGraphId)
    if (!sizeGraph) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Invalid size_graph_id"
      )
    }
  }

  // Get the first variant ID
  const productInfo = await getProductSizeGraph(pgConnection, req.params.id)
  if (!productInfo) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Product not found or has no variants")
  }

  const result = await pgConnection.raw(
    `
      update "product_variant"
      set size_graph_id = ?, updated_at = now()
      where id = ?
        and deleted_at is null
      returning id
    `,
    [sizeGraphId, productInfo.variant_id]
  )

  if (!result.rows?.length) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Variant not found")
  }

  const updatedResult = await getProductSizeGraph(pgConnection, req.params.id)

  res.json({
    product_id: updatedResult.product_id,
    variant_id: updatedResult.variant_id,
    size_graph_id: updatedResult.size_graph_id,
    size_graph: updatedResult.size_graph_id
      ? {
          id: updatedResult.size_graph_id,
          name: updatedResult.size_graph_name,
          image: updatedResult.size_graph_image,
          description: updatedResult.size_graph_description,
        }
      : null,
  })
}
