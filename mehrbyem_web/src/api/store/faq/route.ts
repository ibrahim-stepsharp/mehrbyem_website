import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import FaqService from "../../../modules/faq/service"
import { FAQ_MODULE } from "../../../modules/faq"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const faqModuleService: FaqService = req.scope.resolve(FAQ_MODULE)
  
  const [faqs, count] = await faqModuleService.listAndCountFaqs(
    {}, // filters
    {
      take: 100, // Show all FAQs for the storefront
      skip: 0,
    } // config
  )

  res.json({
    faqs,
    count,
    offset: 0,
    limit: 100,
  })
}
