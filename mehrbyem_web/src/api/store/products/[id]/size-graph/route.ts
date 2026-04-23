import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  ContainerRegistrationKeys,
} from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const manager = req.scope.resolve(ContainerRegistrationKeys.MANAGER)
  const productId = req.params.id

  const rows = await manager.execute(
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
    size_graph: rows?.[0] || null,
  })
}
