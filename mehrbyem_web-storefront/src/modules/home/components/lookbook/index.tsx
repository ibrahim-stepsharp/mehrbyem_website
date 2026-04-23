import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Lookbook = () => {
  return (
    <section className="py-32 px-6 md:px-12 max-w-[1920px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <span className="font-jakarta text-xs uppercase tracking-[0.3em] text-primary mb-4 block font-bold">Visual Narratives</span>
          <h2 className="font-noto-serif text-5xl text-on-surface italic">The Lookbook</h2>
        </div>
        <p className="font-jakarta text-on-surface-variant max-w-xs text-sm leading-relaxed font-medium">
          Captured moments featuring the muses of Mehr—Nida Yasir, Asma Zahid, and Dr. Aymen—wearing our latest artisanal silhouettes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 auto-rows-[300px] md:auto-rows-[400px]">
        {/* Item 1: Nida Yasir */}
        <div className="md:col-span-8 group relative overflow-hidden rounded-lg shadow-xl">
          {/* 
            ADJUST NIDA YASIR POSITION HERE:
            Mobile: object-[center_X%] -> Change X to shift image (e.g., 0% is top, 20% moves it down)
            Desktop (md): md:object-[center_Y%] -> Change Y for desktop view
          */}
          <img
            alt="Nida Yasir"
            className="w-full h-full object-cover object-[center_30%] md:object-[center_30%] transition-transform duration-[2000ms] group-hover:scale-105"
            src="/images/lookbook/NIDA YASIR.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a3e3f]/80 via-transparent to-transparent flex flex-col justify-end p-10">
            <span className="font-jakarta text-white/70 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">The Hazelnut Set</span>
            <h3 className="font-noto-serif text-4xl text-white italic">Nida Yasir</h3>
          </div>
        </div>
        {/* Item 2: Asma Zahid */}
        <div className="md:col-span-4 group relative overflow-hidden rounded-lg shadow-xl">
          {/* 
            ADJUST ASMA ZAHID POSITION HERE:
            Mobile: object-[center_X%]
            Desktop (md): md:object-[center_Y%]
          */}
          <img
            alt="Asma Zahid"
            className="w-full h-full object-cover object-[center_30%] md:object-[center_20%] transition-transform duration-[2000ms] group-hover:scale-105"
            src="/images/lookbook/ASMA.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a3e3f]/80 via-transparent to-transparent flex flex-col justify-end p-10">
            <span className="font-jakarta text-white/70 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Rosy Apricot</span>
            <h3 className="font-noto-serif text-3xl text-white italic">Asma Zahid</h3>
          </div>
        </div>
        {/* Item 3: Dr. Aymen Shuja Zuberi */}
        <div className="md:col-span-4 group relative overflow-hidden rounded-lg shadow-xl">
          <img
            alt="Dr. Aymen Shuja Zuberi"
            className="w-full h-full object-cover object-center transition-transform duration-[2000ms] group-hover:scale-105"
            src="/images/lookbook/Dr Aymen Shuja Zuberi 2.jpeg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a3e3f]/80 via-transparent to-transparent flex flex-col justify-end p-10">
            <span className="font-jakarta text-white/70 text-[10px] uppercase tracking-[0.3em] mb-2 font-bold">Cotton Candy Set</span>
            <h3 className="font-noto-serif text-3xl text-white italic">Dr. Aymen</h3>
          </div>
        </div>
        {/* Item 4: Detail Callout */}
        <div className="md:col-span-8 bg-surface-container flex flex-col justify-center items-center p-12 text-center rounded-lg border border-primary/5 shadow-inner">
          <span className="material-symbols-outlined text-primary text-6xl mb-8 animate-pulse">auto_awesome</span>
          <h3 className="font-noto-serif text-4xl text-on-surface mb-6 italic tracking-tight">Crafted for the Spotlight</h3>
          <p className="font-jakarta text-on-surface-variant max-lg mx-auto text-lg leading-relaxed font-medium">
            Each look is a testament to the skill of our master karigars, designed to ensure you feel like the muse of your own artisanal narrative.
          </p>
          <LocalizedClientLink 
            href="/lookbook"
            className="mt-10 bg-primary text-on-primary px-12 py-4 rounded-md font-jakarta font-bold uppercase tracking-widest text-[10px] hover:brightness-105 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Explore Full Lookbook
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default Lookbook
