import LocalizedClientLink from "@modules/common/components/localized-client-link"

const AboutTemplate = () => {
  return (
    <main className="relative overflow-x-hidden">
      {/* Hero Section - Editorial Lookbook Style */}
      <section className="px-6 md:px-12 py-32 md:py-56 bg-primary-container relative flex items-center justify-center overflow-hidden">
        {/* Floating Blurred Spheres */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] -mr-64 -mt-64"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full blur-[150px] -ml-64 -mb-64"></div>
        </div>
        
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto relative z-10">
          <span className="font-jakarta uppercase tracking-[0.5em] text-primary mb-10 block text-xs md:text-sm font-bold opacity-80">
            Digital Atelier Series
          </span>
          <h1 className="font-noto-serif text-7xl md:text-[11rem] text-on-surface mb-12 tracking-tighter italic leading-[0.75] drop-shadow-sm">
            Our <br/> <span className="text-primary not-italic">Story</span>
          </h1>
          <p className="font-jakarta text-lg md:text-2xl text-on-surface-variant leading-relaxed max-w-3xl font-medium opacity-90 px-4">
            Mehr began in the simplest way possible — two best friends, a sleepover, and a spontaneous decision: <span className="italic font-noto-serif text-primary">"Let’s just do it."</span>
          </p>
        </div>
      </section>

      {/* The Journey Narrative - Editorial Overlap */}
      <section className="py-24 md:py-48 px-4 md:px-12 bg-surface overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Narrative Content */}
            <div className="lg:col-span-7 space-y-16 relative z-10 w-full">
              <div className="space-y-8 max-w-2xl px-2">
                <h2 className="font-noto-serif text-5xl md:text-6xl text-on-surface leading-tight tracking-tighter">
                  What started as a <br />
                  <span className="text-primary italic">sleepover...</span>
                </h2>
                <div className="w-24 h-px bg-primary/30"></div>
                <div className="space-y-6 font-jakarta text-lg text-on-surface-variant leading-loose font-medium">
                  <p>
                    What started as a late-night conversation quickly turned into something real. Mehr by EM is more than a brand; it is a celebration of heritage and modernity, born from the bond of two best friends.
                  </p>
                  <p>
                    We built this from scratch—no big investors, just a shared love for clothes and a vision for something more intentional. Our early days were defined by trial and error, long nights fueled by coffee and dreams.
                  </p>
                </div>
              </div>
              
              {/* Overlapping Image Composition */}
              <div className="relative h-[400px] md:h-[700px] w-full mt-12 md:mt-24">
                <div className="absolute left-0 top-0 w-3/4 h-full rounded-lg overflow-hidden shadow-2xl lg:rotate-1 group">
                  <img 
                    alt="Atelier detail" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms]" 
                    src="/images/about/atelier_detail.png"
                  />
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-3/5 rounded-lg overflow-hidden shadow-2xl lg:-rotate-2 border-[8px] md:border-[12px] border-surface z-20 group">
                  <img 
                    alt="Fabric detail" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" 
                    src="/images/about/fabric_texture.png"
                  />
                </div>
              </div>
            </div>
            
            {/* The Floating Founders Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 mt-12 lg:mt-0 px-2 sm:px-4 w-full">
              <div className="bg-surface-container-low p-8 md:p-16 relative rounded-lg border border-outline-variant/10 shadow-[0px_40px_100px_rgba(0,0,0,0.08)] lg:rotate-1 lg:hover:rotate-0 transition-transform duration-700 w-full">
                <div className="absolute top-0 right-0 p-6 md:p-8">
                  <span className="font-noto-serif text-6xl md:text-8xl text-secondary/10 select-none">“</span>
                </div>
                <div className="space-y-8 md:space-y-10 relative z-10">
                  <h3 className="font-noto-serif text-3xl md:text-4xl text-primary italic leading-tight">The Heart <br/> of Mehr</h3>
                  <p className="font-jakarta text-on-surface-variant italic leading-relaxed text-lg md:text-xl font-medium">
                    "At its core, Mehr is about two friends creating clothes they truly love. It's about pieces that feel like home but look like art."
                  </p>
                  <div className="pt-8 md:pt-12 border-t border-outline-variant/20">
                    <p className="font-jakarta text-xs uppercase tracking-[0.4em] text-on-surface font-bold mb-2">Esha & Maria</p>
                    <p className="font-jakarta text-[10px] uppercase tracking-widest text-primary font-bold">Founders & Visionaries</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Philosophy - Asymmetric Typographic Layout */}
      <section className="py-32 md:py-56 bg-surface-container relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-2xl">
              <span className="font-jakarta text-xs uppercase tracking-[0.5em] text-primary mb-6 block font-bold">The Artisanal Ethos</span>
              <h2 className="font-noto-serif text-6xl md:text-8xl text-on-surface tracking-tighter leading-none">
                Our <span className="text-primary italic">Philosophy</span>
              </h2>
            </div>
            <p className="font-jakarta text-xl text-on-surface-variant leading-relaxed max-w-md font-medium">
              We bring traditional craftsmanship into modern silhouettes, ensuring every piece is a tribute to the timeless beauty of hand-crafted art.
            </p>
          </div>
          
          {/* Techniques - Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Technique 01 */}
            <div className="lg:col-span-4 group">
              <div className="bg-surface p-12 h-full flex flex-col justify-between rounded-lg border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div>
                  <span className="font-noto-serif text-6xl text-secondary/20 block mb-8 group-hover:text-primary transition-colors italic">01</span>
                  <h4 className="font-noto-serif text-3xl mb-6 group-hover:text-primary transition-colors">Ari Work</h4>
                  <p className="font-jakarta text-base text-on-surface-variant leading-loose font-medium">
                    A specialized needlework technique using a hooked needle to create intricate, chain-stitch patterns that dance across the fabric.
                  </p>
                </div>
                <div className="mt-12 pt-6 border-t border-outline-variant/10">
                  <span className="font-jakarta text-[10px] text-primary uppercase tracking-[0.3em] font-bold">Detail-Oriented Precision</span>
                </div>
              </div>
            </div>
            
            {/* Technique 02 - Offset */}
            <div className="lg:col-span-4 lg:mt-24 group">
              <div className="bg-surface p-12 h-full flex flex-col justify-between rounded-lg border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div>
                  <span className="font-noto-serif text-6xl text-secondary/20 block mb-8 group-hover:text-primary transition-colors italic">02</span>
                  <h4 className="font-noto-serif text-3xl mb-6 group-hover:text-primary transition-colors">Resham Embroidery</h4>
                  <p className="font-jakarta text-base text-on-surface-variant leading-loose font-medium">
                    Utilizing fine silk threads to create vibrant, smooth textures that provide a lustrous depth to every garment silhouette.
                  </p>
                </div>
                <div className="mt-12 pt-6 border-t border-outline-variant/10">
                  <span className="font-jakarta text-[10px] text-primary uppercase tracking-[0.3em] font-bold">Silk Thread Heritage</span>
                </div>
              </div>
            </div>
            
            {/* Technique 03 */}
            <div className="lg:col-span-4 group">
              <div className="bg-surface p-12 h-full flex flex-col justify-between rounded-lg border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div>
                  <span className="font-noto-serif text-6xl text-secondary/20 block mb-8 group-hover:text-primary transition-colors italic">03</span>
                  <h4 className="font-noto-serif text-3xl mb-6 group-hover:text-primary transition-colors">Dori & Marori</h4>
                  <p className="font-jakarta text-base text-on-surface-variant leading-loose font-medium">
                    Intricate cord-work and twisted thread techniques that add tactile dimension and structural elegance to contemporary cuts.
                  </p>
                </div>
                <div className="mt-12 pt-6 border-t border-outline-variant/10">
                  <span className="font-jakarta text-[10px] text-primary uppercase tracking-[0.3em] font-bold">Structural Dimension</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Made to Measure Section */}
      <section className="py-24 px-6 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto rounded-xl overflow-hidden relative shadow-sm border border-primary/10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-surface-container-lowest">
              <h2 className="font-noto-serif text-4xl text-on-surface mb-8">The <span className="text-primary italic">Perfect Fit</span></h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-jakarta text-sm shadow-md">1</div>
                  <div>
                    <h4 className="font-noto-serif text-lg mb-2 text-on-surface">Personalized Stitching</h4>
                    <p className="font-jakarta text-on-surface-variant text-sm leading-relaxed">Every garment is stitched according to your specific body measurements, ensuring a silhouette that celebrates you.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-jakarta text-sm shadow-md">2</div>
                  <div>
                    <h4 className="font-noto-serif text-lg mb-2 text-on-surface">Artisanal Consultation</h4>
                    <p className="font-jakarta text-on-surface-variant text-sm leading-relaxed">Work with our design team to choose the right length, sleeve type, and neckline for your bespoke piece.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold font-jakarta text-sm shadow-md">3</div>
                  <div>
                    <h4 className="font-noto-serif text-lg mb-2 text-on-surface">Heritage Delivered</h4>
                    <p className="font-jakarta text-on-surface-variant text-sm leading-relaxed">After meticulous crafting and quality checks, your custom-fitted heirloom is delivered to your doorstep.</p>
                  </div>
                </div>
              </div>
              <button className="mt-12 w-full md:w-fit bg-primary text-on-primary px-10 py-4 rounded-md font-jakarta font-bold tracking-widest uppercase text-[10px] hover:brightness-105 transition-all shadow-md hover:scale-105 active:scale-95">
                Book a Fitting
              </button>
            </div>
            <div className="h-[400px] lg:h-auto relative">
              <img 
                alt="Measuring tape and fabric" 
                className="w-full h-full object-cover" 
                src="/images/about/perfect_fit.png"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 px-6 md:px-12 bg-surface">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-noto-serif text-4xl text-on-surface mb-8">Wear a <span className="text-primary italic">Story</span></h2>
          <p className="font-jakarta text-lg text-on-surface-variant mb-12">
            Every piece from our atelier is a tribute to the bond of friendship and the timeless beauty of hand-crafted art.
          </p>
          <LocalizedClientLink 
            className="inline-block px-10 py-4 bg-primary text-on-primary font-jakarta uppercase tracking-widest text-xs rounded-md shadow-lg transition-transform hover:scale-105 active:scale-95 font-bold" 
            href="/store"
          >
            Explore the Collection
          </LocalizedClientLink>
        </div>
      </section>
    </main>
  )
}

export default AboutTemplate
