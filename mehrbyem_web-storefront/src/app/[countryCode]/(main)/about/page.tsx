import { Metadata } from "next"
import AboutTemplate from "@modules/about/templates"

export const metadata: Metadata = {
  title: "About Us | Mehr by EM",
  description: "The story behind Mehr by EM - a celebration of heritage, modernity, and the bond of two best friends.",
}

export default function AboutPage() {
  return <AboutTemplate />
}
