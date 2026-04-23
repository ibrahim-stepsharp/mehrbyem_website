import { Module } from "@medusajs/framework/utils"
import SizeGraphService from "./service"

export const SIZE_GRAPH_MODULE = "size_graph"

export default Module(SIZE_GRAPH_MODULE, {
  service: SizeGraphService,
})
