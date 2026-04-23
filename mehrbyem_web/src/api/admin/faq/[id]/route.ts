import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import FaqService from "../../../../modules/faq/service"
import { FAQ_MODULE } from "../../../../modules/faq"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const faqModuleService: FaqService = req.scope.resolve(FAQ_MODULE)
  const faq = await faqModuleService.retrieveFaq(req.params.id)

  res.json({ faq })
}

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const faqModuleService: FaqService = req.scope.resolve(FAQ_MODULE)
  const faq = await faqModuleService.updateFaqs({
    id: req.params.id,
    ...(req.body as any),
  })

  res.json({ faq })
}

export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const faqModuleService: FaqService = req.scope.resolve(FAQ_MODULE)
  await faqModuleService.deleteFaqs(req.params.id)

  res.json({
    id: req.params.id,
    object: "faq",
    deleted: true,
  })
}
