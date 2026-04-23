import { model } from "@medusajs/framework/utils"

export const SizeGraph = model.define("size_graph", {
  id: model.id().primaryKey(),
  name: model.text(),
  image: model.text(),
  description: model.text().nullable(),
})
