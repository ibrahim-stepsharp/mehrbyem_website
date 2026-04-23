import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import NavLinks from "@modules/layout/components/nav-links"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/85 backdrop-blur-[12px] transition-colors duration-300 h-16 md:h-24">
      <div className="flex justify-between items-center px-6 md:px-12 py-0 max-w-[1920px] mx-auto h-full">
        <div className="flex items-center gap-x-4 h-full">
          <div className="md:hidden">
            <SideMenu />
          </div>
          <LocalizedClientLink
            href="/"
            className="font-noto-serif text-xl md:text-2xl font-bold text-primary tracking-tighter hidden md:block"
            data-testid="nav-store-link"
          >
            Mehr by EM
          </LocalizedClientLink>
        </div>

        <NavLinks />

        <div className="flex items-center space-x-4 md:space-x-6 text-on-surface h-full">
          <LocalizedClientLink
            className="scale-95 duration-200 ease-in-out hover:text-primary transition-all flex items-center h-full"
            href="/account"
            data-testid="nav-account-link"
          >
            <span className="material-symbols-outlined">person</span>
          </LocalizedClientLink>
          <Suspense
            fallback={
              <LocalizedClientLink
                className="scale-95 duration-200 ease-in-out hover:text-primary transition-all flex items-center h-full"
                href="/cart"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
              </LocalizedClientLink>
            }
          >
            <CartButton />
          </Suspense>
        </div>
      </div>
    </nav>
  )
}
