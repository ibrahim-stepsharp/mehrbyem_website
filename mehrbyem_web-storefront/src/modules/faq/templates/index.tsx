import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface FaqItem {
  id: string
  question: string
  answer: string
}

const FaqTemplate = ({ faqs }: { faqs: FaqItem[] }) => {
  return (
    <main className="relative overflow-x-hidden">
      {/* Hero Section - Balanced Heading */}
      <section className="px-6 md:px-12 py-24 md:py-40 bg-primary-container relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] -mr-64 -mt-64"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[150px] -ml-64 -mb-64"></div>
        </div>
        
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto relative z-10">
          <span className="font-jakarta uppercase tracking-[0.5em] text-primary mb-8 block text-xs font-bold opacity-80">
            Assistance & Care
          </span>
          <h1 className="font-noto-serif text-5xl md:text-7xl text-on-surface mb-8 tracking-tight leading-tight">
            Frequently Asked <span className="text-primary italic">Questions</span>
          </h1>
          <p className="font-jakarta text-lg text-on-surface-variant leading-relaxed max-w-2xl font-medium opacity-90 px-4">
            Guidance on our bespoke process, artisanal heritage, and caring for your modern heirlooms.
          </p>
        </div>
      </section>

      {/* FAQ Content - Card Style Layering */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-surface">
        <div className="max-w-3xl mx-auto">
          {faqs.length > 0 ? (
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-surface-container-low p-8 md:p-10 rounded-lg border border-outline-variant/5 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="font-noto-serif text-2xl text-on-surface mb-4">
                    {faq.question}
                  </h3>
                  <div className="w-12 h-px bg-primary/20 mb-6"></div>
                  <p className="font-jakarta text-base text-on-surface-variant leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-surface-container-low rounded-lg border border-outline-variant/10">
              <p className="font-jakarta text-on-surface-variant italic">Our FAQs are currently being updated.</p>
            </div>
          )}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 px-6 md:px-12 bg-surface-container">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="font-noto-serif text-4xl md:text-5xl text-on-surface leading-tight">
            Still have <span className="text-primary italic">Questions?</span>
          </h2>
          <p className="font-jakarta text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            Our team is available for bespoke consultations and any specific inquiries regarding our collections.
          </p>
          <div className="pt-8">
            <LocalizedClientLink 
              className="inline-block px-12 py-5 bg-primary text-on-primary font-jakarta uppercase tracking-widest text-[10px] rounded-md shadow-lg transition-transform hover:scale-105 active:scale-95 font-bold" 
              href="/contact-us"
            >
              Get in Touch
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FaqTemplate
