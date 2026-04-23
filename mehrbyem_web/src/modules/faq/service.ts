import { MedusaService } from "@medusajs/framework/utils"
import { Faq } from "./models/faq"

class FaqService extends MedusaService({
  faq: Faq,
}) {}

export default FaqService
