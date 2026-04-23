import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const keys = Object.keys(req.scope.registrations || {})
  res.json({ keys })
}
