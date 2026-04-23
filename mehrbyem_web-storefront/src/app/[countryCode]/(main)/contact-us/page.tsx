import { Metadata } from "next"
import { ChatBubble, Envelope, Phone, ArrowRightMini } from "@medusajs/icons"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us for bespoke consultations and inquiries.",
}

export default function ContactUsPage() {
  return (
    <div className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Header */}
      <header className="mb-20 text-center max-w-3xl mx-auto">
        <h1 className="font-noto-serif text-5xl md:text-7xl mb-6 tracking-tight text-on-surface leading-tight">
          Let’s Begin a <span className="italic text-primary">Conversation</span>
        </h1>
        <p className="font-jakarta text-on-surface-variant text-lg md:text-xl leading-relaxed">
          Whether you're seeking a bespoke ensemble or wish to learn more about our traditional resham craftsmanship, we are here to guide you.
        </p>
      </header>

      {/* Asymmetric Layout Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 space-y-12">
          <section>
            <h3 className="font-jakarta text-xs uppercase tracking-[0.3em] text-primary font-semibold mb-8">Direct Connections</h3>
            <div className="space-y-6">
              {/* WhatsApp Card */}
              <a 
                href="https://wa.me/905014950010" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(139,74,55,0.08)] transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 flex items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500">
                    <ChatBubble />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-noto-serif text-2xl mb-1">WhatsApp</h4>
                    <p className="text-primary font-medium text-lg mb-3">+90 501 495 0010</p>
                    <p className="font-jakarta text-sm text-on-surface-variant leading-snug italic">
                      The fastest way for bespoke consultations and immediate inquiries.
                    </p>
                  </div>
                </div>
              </a>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/5 hover:border-outline-variant/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest">
                      <Envelope className="text-primary" />
                    </div>
                    <h4 className="font-noto-serif text-xl">Email</h4>
                  </div>
                  <p className="text-on-surface-variant font-medium text-lg break-all">support@mehrbyem.com</p>
                </div>

                <div className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/5 hover:border-outline-variant/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-highest">
                      <Phone className="text-primary" />
                    </div>
                    <h4 className="font-noto-serif text-xl">Phone</h4>
                  </div>
                  <p className="text-on-surface-variant font-medium text-lg">+90 501 495 0010</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-10 md:p-16 rounded-2xl border border-outline-variant/10 shadow-[0_40px_80px_rgba(139,74,55,0.03)]">
          <h3 className="font-noto-serif text-3xl mb-10 italic">Send an Inquiry</h3>
          <form className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative group">
                <label className="block font-jakarta text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-2 ml-1">Full Name</label>
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-1 py-3 font-jakarta text-on-surface placeholder:text-outline/30 transition-all" 
                  placeholder="Your name" 
                  type="text"
                />
              </div>
              <div className="relative group">
                <label className="block font-jakarta text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-2 ml-1">Email Address</label>
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-1 py-3 font-jakarta text-on-surface placeholder:text-outline/30 transition-all" 
                  placeholder="example@domain.com" 
                  type="email"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block font-jakarta text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-2 ml-1">Your Message</label>
              <textarea 
                className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 px-1 py-3 font-jakarta text-on-surface placeholder:text-outline/30 transition-all resize-none min-h-[120px]" 
                placeholder="How can we assist you with your Mehr journey?" 
                rows={4}
              ></textarea>
            </div>

            <button 
              className="group w-full py-5 bg-on-surface text-surface font-jakarta font-semibold tracking-[0.3em] uppercase text-[10px] rounded-sm hover:bg-primary transition-all duration-300 shadow-xl shadow-on-surface/5 flex items-center justify-center gap-4" 
              type="submit"
            >
              Submit Inquiry
              <ArrowRightMini className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
