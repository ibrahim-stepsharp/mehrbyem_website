import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Our privacy policy.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12">
      <div className="content-container flex flex-col items-center">
        <h1 className="text-3xl-semi mb-8">Privacy Policy</h1>
        <div className="w-full max-w-3xl prose prose-slate">
          <p>This is a placeholder for your privacy policy. Update this content later.</p>
        </div>
      </div>
    </div>
  )
}
