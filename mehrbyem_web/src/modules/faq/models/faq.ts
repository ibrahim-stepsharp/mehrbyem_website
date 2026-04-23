import { model } from "@medusajs/framework/utils"

export const Faq = model.define("faq", {
  id: model.id().primaryKey(),
  question: model.text(),
  answer: model.text(),
})
