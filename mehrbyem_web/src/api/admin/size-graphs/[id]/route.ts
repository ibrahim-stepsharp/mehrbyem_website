import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import SizeGraphService from "../../../../modules/size-graph/service"
import { SIZE_GRAPH_MODULE } from "../../../../modules/size-graph"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const sizeGraphModuleService: SizeGraphService = req.scope.resolve(
    SIZE_GRAPH_MODULE
  )
  const size_graph = await sizeGraphModuleService.retrieveSizeGraph(req.params.id)

  res.json({ size_graph })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const sizeGraphModuleService: SizeGraphService = req.scope.resolve(
    SIZE_GRAPH_MODULE
  )

  const payload = (req.body ?? {}) as Record<string, unknown>
  const updateData: Record<string, unknown> = { id: req.params.id }

  if (payload.name !== undefined) {
    const name = `${payload.name ?? ""}`.trim()
    if (!name) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Size graph name cannot be empty"
      )
    }
    updateData.name = name
  }

  if (payload.image !== undefined) {
    const image = `${payload.image ?? ""}`.trim()
    if (!image) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Size graph image cannot be empty"
      )
    }
    updateData.image = image
  }

  if (payload.description !== undefined) {
    const description = `${payload.description ?? ""}`.trim()
    updateData.description = description || null
  }

  const size_graph = await sizeGraphModuleService.updateSizeGraphs(
    updateData as any
  )

  res.json({ size_graph })
}

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const sizeGraphModuleService: SizeGraphService = req.scope.resolve(
    SIZE_GRAPH_MODULE
  )
  await sizeGraphModuleService.deleteSizeGraphs(req.params.id)

  res.json({
    id: req.params.id,
    object: "size_graph",
    deleted: true,
  })
}
