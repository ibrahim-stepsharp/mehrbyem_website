import { Metadata } from "next"
import { sdk } from "@lib/config"
import FaqTemplate from "@modules/faq/templates"

export const metadata: Metadata = {
  title: "FAQ | Mehr by EM",
  description: "Frequently Asked Questions about our artisanal process and bespoke services.",
}

async function getFaqs() {
  try {
    const response = await sdk.client.fetch<{ faqs: any[] }>("/store/faq")
    return response.faqs
  } catch (error) {
    console.error("Failed to fetch FAQs:", error)
    return []
  }
}

export default async function FaqPage() {
  const faqs = await getFaqs()

  return <FaqTemplate faqs={faqs} />
}
