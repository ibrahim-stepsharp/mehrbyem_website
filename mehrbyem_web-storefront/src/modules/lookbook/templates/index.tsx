import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

const LookbookTemplate = () => {
  return (
    <main className="relative bg-surface selection:bg-primary/20 selection:text-primary overflow-x-hidden font-jakarta">
      {/* Editorial Hero: Pink Soft Background */}
      <section className="px-6 md:px-12 py-32 md:py-56 bg-primary-container relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] -mr-64 -mt-64"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[150px] -ml-64 -mb-64"></div>
        </div>
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto relative z-10">
          <span className="font-jakarta uppercase tracking-[0.5em] text-primary mb-10 block text-xs md:text-sm font-bold opacity-80">
            Digital Atelier Series
          </span>
          <h1 className="font-noto-serif text-7xl md:text-[11rem] text-on-surface mb-12 tracking-tighter italic leading-[0.75] drop-shadow-sm">
            The <br/> <span className="text-primary not-italic">Lookbook</span>
          </h1>
          <p className="font-jakarta text-lg md:text-2xl text-on-surface-variant leading-relaxed max-w-3xl font-medium opacity-90 px-4">
            A cinematic journey through the essence of craftsmanship, celebrating the iconic muses who embody the soul of Mehr.
          </p>
        </div>
      </section>

      {/* Part I: Nida Yasir - LIGHT CARD */}
      <section className="py-32 md:py-64 px-6 md:px-12 bg-surface">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
            <div className="md:col-span-8 relative group">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-lg shadow-2xl">
                <img 
                  className="w-full h-full object-cover object-[center_10%] transition-transform duration-[3000ms] group-hover:scale-105" 
                  alt="Nida Yasir"
                  src="/images/lookbook/NIDA YASIR.jpg"
                />
              </div>
            </div>
            {/* Overlap Box - Light */}
            <div className="md:col-span-5 md:absolute md:-right-12 md:bottom-12 z-20 mt-8 md:mt-0 max-w-md rotate-1 hover:rotate-0 transition-transform duration-700">
              <div className="bg-surface p-10 md:p-14 shadow-[0px_30px_70px_rgba(0,0,0,0.12)] rounded-lg border border-outline-variant/10">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-noto-serif text-5xl text-on-surface italic leading-none font-medium">Nida Yasir</h2>
                    <h3 className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-primary font-bold mt-4">The Hazelnut Set</h3>
                  </div>
                  <div className="w-12 h-px bg-primary/40"></div>
                  <p className="font-jakarta text-base text-on-surface-variant leading-relaxed font-medium">
                    Beige tissue silk, intricately adorned with fine tilla work and delicate aari embroidery. Paired with fluid, wide-leg izaar for a refined silhouette.
                  </p>
                  <p className="font-jakarta text-xs text-primary font-bold tracking-widest uppercase italic pt-4">
                    "A timeless expression of quiet elegance."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part II: Dr. Zainab - DARK CARD */}
      <section className="bg-surface-container-low py-32 md:py-64 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-8 md:col-start-5 relative group">
              <div className="aspect-[4/5] bg-surface rounded-lg overflow-hidden shadow-2xl">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" 
                  alt="Dr. Zainab"
                  src="/images/lookbook/ZAINAB.jpg"
                />
              </div>
            </div>
            {/* Overlapping Box - Dark */}
            <div className="md:col-span-5 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 z-20 mt-8 md:mt-0 max-w-md -rotate-1 hover:rotate-0 transition-transform duration-700">
              <div className="bg-on-surface text-surface p-10 md:p-14 shadow-[0px_40px_100px_rgba(0,0,0,0.3)] rounded-lg md:-ml-8 lg:-ml-12">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-noto-serif text-5xl text-surface italic leading-none font-medium">Dr. Zainab</h2>
                    <h3 className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-primary font-bold mt-4">Periwinkle Blue Set</h3>
                  </div>
                  <div className="w-12 h-px bg-primary"></div>
                  <p className="font-jakarta text-base text-surface/80 leading-relaxed font-medium">
                    Pure tissue silk kaftan silhouette with an effortless drape. Intricate floral embroidery in soft pink and blue for a refined finish.
                  </p>
                  <p className="font-jakarta text-xs text-primary font-bold tracking-widest uppercase italic pt-4">
                    "Relaxed, luminous, and quietly elevated."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part III: Asma Zahid - LIGHT CARD */}
      <section className="py-32 md:py-64 px-6 md:px-12 bg-surface">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 items-center">
            <div className="md:col-span-8 relative group">
              <div className="aspect-[4/5] bg-surface-container-low overflow-hidden rounded-lg shadow-2xl">
                <img 
                  className="w-full h-full object-cover object-[center_5%] transition-transform duration-[3000ms]" 
                  alt="Asma Zahid"
                  src="/images/lookbook/ASMA.jpg"
                />
              </div>
            </div>
            {/* Overlap Box - Light */}
            <div className="md:col-span-5 md:absolute md:-right-12 md:top-1/3 z-20 mt-8 md:mt-0 max-w-md rotate-1 hover:rotate-0 transition-transform duration-700">
              <div className="bg-surface p-10 md:p-14 shadow-[0px_30px_70px_rgba(0,0,0,0.12)] rounded-lg border border-outline-variant/10 md:-mr-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-noto-serif text-5xl text-on-surface italic leading-none font-medium">Asma Zahid</h2>
                    <h3 className="font-jakarta text-[10px] uppercase tracking-[0.4em] text-primary font-bold mt-4">Rosy Apricot Set</h3>
                  </div>
                  <div className="w-12 h-px bg-primary/40"></div>
                  <p className="font-jakarta text-base text-on-surface-variant leading-relaxed font-medium">
                    Pure tissue silk kaftan with floral reham embroidery, bringing soft depth to its warm apricot hue. A statement of refinement.
                  </p>
                  <p className="font-jakarta text-xs text-primary font-bold italic pt-4">
                    "Light, refined, and statement-making."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part IV: Emaan - DARK CARD (Creative Director Section) */}
      <section className="bg-surface-container-low py-32 md:py-64 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            {/* Image on Right */}
            <div className="md:col-span-8 md:col-start-5 relative group">
              <div className="aspect-[4/5] bg-surface rounded-lg overflow-hidden shadow-2xl">
                <img 
                  className="w-full h-full object-cover object-top transition-transform duration-[3000ms]" 
                  alt="Emaan"
                  src="/images/lookbook/Emaan.jpeg"
                />
              </div>
            </div>
            {/* Overlapping Box - Dark */}
            <div className="md:col-span-6 md:absolute md:left-0 md:bottom-12 z-20 mt-8 md:mt-0 max-w-xl -rotate-1 hover:rotate-0 transition-transform duration-700">
              <div className="bg-on-surface text-surface p-10 md:p-16 shadow-[0px_40px_100px_rgba(0,0,0,0.3)] rounded-lg md:-ml-8 lg:-ml-12">
                <div className="space-y-6">
                  <div>
                    <h2 className="font-noto-serif text-5xl md:text-6xl text-surface italic leading-none font-medium">Emaan</h2>
                    <h3 className="font-jakarta text-[10px] uppercase tracking-[0.5em] text-primary font-bold mt-4">Creative Director</h3>
                  </div>
                  <div className="w-16 h-px bg-primary"></div>
                  <p className="font-jakarta text-base md:text-lg text-surface/80 leading-relaxed font-medium">
                    Timeless navy tissue silk adorned with intricate aari embroidery and subtle emerald accents that catch the light with every movement. Paired with a fluid medium silk dupatta for an effortlessly graceful silhouette.
                  </p>
                  <p className="font-jakarta text-xs text-primary font-bold tracking-widest uppercase italic pt-4">
                    "An ode to the warmth and elegance of old Pakistan."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part V: Dr. Aymen Shuja Zuberi - LIGHT CARD Grand Finale (3-Panel Comic Asymmetric) */}
      <section className="py-32 md:py-64 px-6 md:px-12 bg-surface">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-32 space-y-4 px-4">
            <h2 className="font-noto-serif text-6xl md:text-[8rem] text-on-surface leading-tight italic font-medium">Dr. Aymen Shuja Zuberi</h2>
            <h3 className="font-jakarta text-[10px] uppercase tracking-[0.6em] text-primary font-bold mt-2">Cotton Candy Set</h3>
            <div className="w-48 h-px bg-primary/40 mt-8"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 relative items-center">
            {/* Side Panel 1 */}
            <div className="lg:col-span-4 z-20 lg:-mr-16 lg:-rotate-2 transition-transform hover:rotate-0 duration-700 order-2 lg:order-1">
              <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-2xl border-[12px] border-surface group">
                <img 
                  alt="Detail 1" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src="/images/lookbook/Dr Aymen Shuja Zuberi 1.jpeg"
                />
              </div>
            </div>

            {/* Main Hero Panel - Object Top fixed */}
            <div className="lg:col-span-5 z-10 order-1 lg:order-2">
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-lg shadow-[0px_40px_120px_rgba(0,0,0,0.2)] group relative">
                <img 
                  alt="Main Portrait" 
                  className="w-full h-full object-cover object-top transition-transform duration-[4000ms] group-hover:scale-105" 
                  src="/images/lookbook/Dr Aymen Shuja Zuberi.jpeg"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-lg"></div>
              </div>
            </div>

            {/* Side Panel 2 + Content - Light Card finale */}
            <div className="lg:col-span-3 z-20 lg:-ml-16 lg:rotate-2 transition-transform hover:rotate-0 duration-700 flex flex-col gap-12 order-3">
              <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-2xl border-[12px] border-surface group">
                <img 
                  alt="Detail 2" 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  src="/images/lookbook/Dr Aymen Shuja Zuberi 2.jpeg"
                />
              </div>
              <div className="bg-surface-container p-10 rounded-lg shadow-2xl border border-outline-variant/10 -mt-6">
                <p className="font-jakarta text-sm text-on-surface-variant leading-relaxed font-medium">
                  Eggshell white tissue silk, softened with tonal dye in butter yellow and mint green. Flared pants create a weightless, luminous silhouette.
                </p>
                <p className="font-jakarta text-xs text-primary font-bold tracking-widest uppercase italic mt-6">
                  "Light, airy, and quietly luminous."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pt-48 pb-0 bg-on-surface text-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="/images/lookbook/Dr Aymen Shuja Zuberi.jpeg" className="w-full h-full object-cover blur-3xl scale-150" alt="bg blur" />
        </div>
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-10 pb-24">
          <h2 className="font-noto-serif text-6xl md:text-[10rem] mb-12 leading-tight tracking-tighter drop-shadow-lg">Wear a <span className="italic text-primary">Story</span></h2>
          <p className="font-jakarta text-surface-variant mb-16 max-w-xl text-lg md:text-2xl opacity-80 leading-relaxed font-medium">
            Every piece from our atelier is a tribute to the bond of friendship and the timeless beauty of hand-crafted art.
          </p>
          <LocalizedClientLink 
            href="/store"
            className="bg-primary text-on-primary px-24 py-7 rounded-md font-jakarta uppercase tracking-[0.3em] text-[10px] hover:brightness-110 transition-all shadow-[0px_20px_60px_rgba(216,182,184,0.35)] hover:scale-105 active:scale-95 font-bold"
          >
            Explore the Collection
          </LocalizedClientLink>
        </div>
      </section>
    </main>
  )
}

export default LookbookTemplate
