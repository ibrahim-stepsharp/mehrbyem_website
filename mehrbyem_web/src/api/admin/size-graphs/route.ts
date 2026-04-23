import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { randomUUID } from "crypto"
import SizeGraphService from "../../../modules/size-graph/service"
import { SIZE_GRAPH_MODULE } from "../../../modules/size-graph"

const toPositiveInt = (value: unknown, fallback: number) => {
  const parsed = Number(value)
  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback
  }
  return parsed
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const sizeGraphModuleService: SizeGraphService = req.scope.resolve(
    SIZE_GRAPH_MODULE
  )

  const limit = toPositiveInt(req.query.limit, 20)
  const offset = toPositiveInt(req.query.offset, 0)

  const [size_graphs, count] =
    await sizeGraphModuleService.listAndCountSizeGraphs(
      {},
      {
        take: limit,
        skip: offset,
        order: { created_at: "DESC" as const },
      }
    )

  res.json({
    size_graphs,
    count,
    offset,
    limit,
  })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const sizeGraphModuleService: SizeGraphService = req.scope.resolve(
    SIZE_GRAPH_MODULE
  )

  const payload = (req.body ?? {}) as Record<string, unknown>
  const name = `${payload.name ?? ""}`.trim()
  const image = `${payload.image ?? ""}`.trim()
  const description = payload.description
    ? `${payload.description}`.trim()
    : undefined

  if (!name) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Size graph name is required"
    )
  }

  if (!image) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Size graph image is required"
    )
  }

  const size_graph = await sizeGraphModuleService.createSizeGraphs({
    name,
    image,
    description,
  } as any)

  res.json({ size_graph })
}
