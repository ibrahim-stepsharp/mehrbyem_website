import LocalizedClientLink from "@modules/common/components/localized-client-link"

const FounderStory = () => {
  return (
    <section className="bg-surface-container-low py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-surface rounded-lg overflow-hidden">
            <img 
              alt="Founders story" 
              className="w-full h-full object-cover grayscale opacity-80" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Vk5gQXkso9DnPU5NNq5j1wuEGW7oFvbSho9h4rjPhK9w5ak1VC9dIG0vljiUSnEzJOqJKevejTq3T8831HHr38m4eqVVeBYeN8fjxT7FvSUfMhh8DCMuMzKqYiH7Rq40EynqE9adMH3MlYkwAIdS9IfP3M4zwXOuDiHrRYsDcKHsADiAfjHM8Vlcs93pw8JHnM0b2IZQD_yUiSK2e0T2cWV2g-MWh5BHx5w0yfT8MKyhERZ7_LCufBkHrDM8EFfKK-RXCARsgs8s"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-full flex items-center justify-center p-8 text-center hidden md:flex">
            <span className="text-on-primary font-headline italic text-lg leading-tight">Since our first late-night conversation</span>
          </div>
        </div>
        <div>
          <h2 className="font-headline text-4xl text-on-surface mb-8">What started as a sleepover...</h2>
          <p className="font-body text-on-surface-variant leading-relaxed mb-6">
            What started as a late-night conversation quickly turned into something real. Mehr by EM is more than a brand; it is a celebration of heritage and modernity, born from the bond of two best friends.
          </p>
          <p className="font-body text-on-surface-variant leading-relaxed mb-10">
            Our collections honor traditional craftsmanship—delicate <span className="text-primary font-medium">ari work</span>, vibrant <span className="text-primary font-medium">resham embroidery</span>, and the timeless textures of <span className="text-primary font-medium">dori</span> and <span className="text-primary font-medium">marori techniques</span>. Every stitch tells a story of friendship and artisanal excellence.
          </p>
          <LocalizedClientLink 
            className="text-primary font-medium uppercase tracking-widest text-xs border-b border-primary/30 pb-2 hover:border-primary transition-all" 
            href="/about"
          >
            The Full Story
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default FounderStory
