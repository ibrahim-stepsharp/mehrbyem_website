const MadeToMeasure = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-surface">
      <div className="max-w-[1400px] mx-auto rounded-xl overflow-hidden relative shadow-sm border border-outline-variant/5">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-surface-container-lowest">
            <h2 className="font-headline text-4xl text-on-surface mb-8">The Perfect Fit</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">1</div>
                <div>
                  <h4 className="font-headline text-lg mb-2">Personalized Stitching</h4>
                  <p className="text-on-surface-variant text-sm">Every garment is stitched according to your specific body measurements, ensuring a silhouette that celebrates you.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">2</div>
                <div>
                  <h4 className="font-headline text-lg mb-2">Artisanal Consultation</h4>
                  <p className="text-on-surface-variant text-sm">Work with our design team to choose the right length, sleeve type, and neckline for your bespoke piece.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">3</div>
                <div>
                  <h4 className="font-headline text-lg mb-2">Heritage Delivered</h4>
                  <p className="text-on-surface-variant text-sm">After meticulous crafting and quality checks, your custom-fitted heirloom is delivered to your doorstep.</p>
                </div>
              </div>
            </div>
            <button className="mt-12 w-full md:w-fit bg-on-surface text-surface-container-lowest px-12 py-5 rounded-md font-medium tracking-widest uppercase text-xs hover:bg-primary transition-all">
              Book a Fitting
            </button>
          </div>
          <div className="h-[400px] lg:h-auto relative">
            <img 
              alt="Measuring tape and fabric" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA61bKwTmM1W0r7iAlQYd0GsW198ax5ybvXOKAEMm-C35eIvVbkJjTwoTTRytY-6Bb0u_gNuFWElI1XxblemJIhKD9ZoYareRXCks6xElDPKDfDtDJWQEQnRu8uk50lV0Fkf-CBnmryOEY1Ssvg52MqqxspoKHaMhhOUNndGZflUDFF9GbJEuWyYZaQIaj9pdzkp5y2apn_5ALiS7H-40mjpBfjQMd8Q51v6EDAvdgmJjJQktI6zahr75P6XjBYDVFGr5tr7D8CW-5N"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MadeToMeasure
