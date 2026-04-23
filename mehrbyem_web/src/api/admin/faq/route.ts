import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import FaqService from "../../../modules/faq/service"
import { FAQ_MODULE } from "../../../modules/faq"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const faqModuleService: FaqService = req.scope.resolve(FAQ_MODULE)
  
  // Use defaults if not provided
  const [faqs, count] = await faqModuleService.listAndCountFaqs(
    {}, // filters
    {
      take: 20,
      skip: 0,
    } // config
  )

  res.json({
    faqs,
    count,
    offset: 0,
    limit: 20,
  })
}

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const faqModuleService: FaqService = req.scope.resolve(FAQ_MODULE)
  const faq = await faqModuleService.createFaqs(req.body as any)

  res.json({ faq })
}
