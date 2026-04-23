import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Instagram from "@modules/common/icons/instagram"
import RegionLocaleSelector from "@modules/layout/components/region-locale-selector"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()
  
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions(),
    listLocales(),
    getLocale(),
  ])

  return (
    <footer className="w-full bg-surface-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 py-24 w-full max-w-[1920px] mx-auto">
        <div className="space-y-8">
          <div className="font-noto-serif text-2xl text-primary font-bold tracking-tighter">Mehr by EM</div>
          <p className="font-jakarta text-xs text-on-surface-variant leading-relaxed uppercase tracking-[0.15em] max-w-sm font-medium">
            Handcrafted heritage for the modern woman. Designed in our atelier, stitched for your soul.
          </p>
        </div>
        <div className="space-y-8">
          <h4 className="font-jakarta text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Discover</h4>
          <ul className="space-y-4 font-jakarta text-[10px] uppercase tracking-[0.15em] font-medium">
            <li><LocalizedClientLink className="text-on-surface-variant hover:text-primary transition-colors" href="/about">The Atelier</LocalizedClientLink></li>
            <li><LocalizedClientLink className="text-on-surface-variant hover:text-primary transition-colors" href="/lookbook">The Lookbook</LocalizedClientLink></li>
            <li><LocalizedClientLink className="text-on-surface-variant hover:text-primary transition-colors" href="/privacy-policy">Privacy Policy</LocalizedClientLink></li>
            <li><LocalizedClientLink className="text-on-surface-variant hover:text-primary transition-colors" href="/shipping-and-returns">Shipping & Returns</LocalizedClientLink></li>
            {collections?.slice(0, 3).map((c) => (
              <li key={c.id}>
                <LocalizedClientLink className="text-on-surface-variant hover:text-primary transition-colors" href={`/collections/${c.handle}`}>
                  {c.title}
                </LocalizedClientLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-8">
          <h4 className="font-jakarta text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Customer Care</h4>
          <ul className="space-y-4 font-jakarta text-[10px] uppercase tracking-[0.15em] font-medium">
            <li><LocalizedClientLink className="text-on-surface-variant hover:text-primary transition-colors" href="/contact-us">Contact Us</LocalizedClientLink></li>
            <li><LocalizedClientLink className="text-on-surface-variant hover:text-primary transition-colors" href="/faq">FAQs</LocalizedClientLink></li>
          </ul>
        </div>
        <div className="space-y-8">
          <h4 className="font-jakarta text-[10px] uppercase tracking-[0.2em] text-primary font-bold">Social</h4>
          <ul className="space-y-4 font-jakarta text-[10px] uppercase tracking-[0.15em] font-medium">
            <li>
              <a
                href="https://www.instagram.com/mehrbyem/"
                target="_blank"
                rel="noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-x-3"
              >
                <Instagram className="text-primary" />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-y-6 md:gap-y-0 max-w-[1920px] mx-auto bg-surface-container-low/50">
        {regions && locales && (
          <RegionLocaleSelector 
            regions={regions} 
            locales={locales} 
            currentLocale={currentLocale} 
          />
        )}
        <p className="font-jakarta text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/40 font-bold">
          © {new Date().getFullYear()} Mehr by EM. Handcrafted Heritage.
        </p>
      </div>
    </footer>
  )
}
