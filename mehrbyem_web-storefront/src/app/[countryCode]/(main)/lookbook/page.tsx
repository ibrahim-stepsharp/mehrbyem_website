import { Metadata } from "next"
import LookbookTemplate from "@modules/lookbook/templates"

export const metadata: Metadata = {
  title: "The Lookbook | Mehr by EM",
  description: "A cinematic journey through the soul of artisanal mastery. Capturing the essence of the modern woman through handcrafted heritage.",
}

export default function LookbookPage() {
  return <LookbookTemplate />
}
