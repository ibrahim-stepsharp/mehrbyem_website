import { Module } from "@medusajs/framework/utils"
import FaqService from "./service"

export const FAQ_MODULE = "faq"

export default Module(FAQ_MODULE, {
  service: FaqService,
})
