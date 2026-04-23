import { MedusaService } from "@medusajs/framework/utils"
import { SizeGraph } from "./models/size-graph"

class SizeGraphService extends MedusaService({
  sizeGraph: SizeGraph,
}) {}

export default SizeGraphService
