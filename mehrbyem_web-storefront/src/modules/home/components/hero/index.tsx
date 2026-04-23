import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = () => {
  return (
    <section className="relative px-6 md:px-12 pb-24 overflow-hidden pt-32 bg-surface">
      <div className="grid grid-cols-12 gap-8 items-center max-w-[1920px] mx-auto">
        
        {/* LEFT CONTENT COLUMN */}
        <div className="col-span-12 lg:col-span-5 z-30">
          <span className="font-jakarta text-xs uppercase tracking-[0.3em] text-primary mb-6 block font-bold animate-fade-in-top">
            The Atelier Series
          </span>
          
          {/* HEADING CARD - Secondary Background for high contrast */}
          <div className="relative z-40 lg:-mr-32 xl:-mr-48 mb-10">
            <div className="bg-secondary p-[15px] shadow-[0px_40px_80px_rgba(0,0,0,0.25)] rounded-lg border border-white/5 rotate-1 hover:rotate-0 transition-transform duration-700 inline-block">
              <h1 className="font-noto-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white tracking-tighter">
                Handcrafted <br /> <span className="italic text-primary">Heritage</span>
              </h1>
            </div>
          </div>

          <div className="max-w-md space-y-10">
            <p className="font-jakarta text-lg text-on-surface-variant leading-relaxed font-medium">
              Bespoke elegance tailored to your body type. Experience modern silhouettes woven with the weight of tradition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LocalizedClientLink 
                href="/store"
                className="bg-primary text-on-primary px-10 py-4 rounded-md font-jakarta font-bold tracking-widest uppercase text-xs shadow-lg hover:brightness-105 transition-all text-center"
              >
                Shop The Collection
              </LocalizedClientLink>
              <LocalizedClientLink 
                href="/lookbook"
                className="border border-primary/30 text-primary px-10 py-4 rounded-md font-jakarta font-bold tracking-widest uppercase text-xs hover:bg-primary/5 transition-all text-center"
              >
                The Lookbook
              </LocalizedClientLink>
            </div>
          </div>
        </div>

        {/* IMAGE SECTION BOX */}
        <div className="col-span-12 lg:col-span-7 relative h-[500px] md:h-[600px] lg:h-[800px]">

          {/* MAIN MODEL IMAGE */}
          <div className="absolute right-0 top-0 w-full h-[95%] lg:w-[85%] lg:h-[90%] rounded-lg overflow-hidden shadow-2xl z-10">
            <img 
              alt="Mehr by EM - Handcrafted Heritage" 
              className="w-full h-full object-cover" 
              src="/images/home/hero_img_1.PNG"
            />
          </div>

          {/* EMBROIDERY DETAIL IMAGE - No white border, rounded corners */}
          <div className="absolute left-0 bottom-12 w-1/2 h-1/5 rounded-lg overflow-hidden shadow-2xl z-20 hidden lg:block hover:scale-105 transition-transform duration-700">
            <img 
              alt="Artisanal Embroidery Detail" 
              className="w-full h-full object-cover" 
              src="/images/home/hero_img_2.png"
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
