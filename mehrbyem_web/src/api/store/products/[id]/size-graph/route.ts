import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  ContainerRegistrationKeys,
} from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const pgConnection = req.scope.resolve(ContainerRegistrationKeys.PG_CONNECTION) as any
  const productId = req.params.id

  const result = await pgConnection.raw(
    `
      select
        sg.id,
        sg.name,
        sg.image,
        sg.description
      from "product" p
      join "product_variant" pv
        on pv.product_id = p.id
        and pv.deleted_at is null
      join "size_graph" sg
        on sg.id = pv.size_graph_id
        and sg.deleted_at is null
      where p.id = ?
        and p.deleted_at is null
      limit 1
    `,
    [productId]
  )

  res.json({
    size_graph: result.rows?.[0] || null,
  })
}
