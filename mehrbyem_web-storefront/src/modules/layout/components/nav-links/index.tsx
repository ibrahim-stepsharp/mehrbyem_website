"use client"

import { usePathname } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

const NavLinks = () => {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Home" },
    { href: "/store", label: "Shop", isShop: true },
    { href: "/about", label: "About" },
    { href: "/lookbook", label: "Lookbook" },
    { href: "/faq", label: "FAQs" },
    { href: "/contact-us", label: "Contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/" && pathname !== "/") {
        // Only return true for root if exactly root
        // Since we are in [countryCode] usually, we need to handle that
        // But LocalizedClientLink handles localization, pathname will have country code
        return false
    }
    return pathname.includes(href) && href !== "/" || pathname === href
  }

  // Helper to check active state more accurately for localized routes
  const getIsActive = (href: string) => {
    const segments = pathname.split('/').filter(Boolean)
    // segments[0] is usually country code
    const pathWithoutCountry = '/' + segments.slice(1).join('/')
    
    if (href === "/") return pathWithoutCountry === "/"
    return pathWithoutCountry.startsWith(href)
  }

  return (
    <div className="hidden md:flex items-center space-x-12 font-noto-serif text-sm tracking-[0.1em] uppercase h-full">
      {links.map((link) => {
        const active = getIsActive(link.href)
        
        return (
          <LocalizedClientLink 
            key={link.href}
            href={link.href} 
            className={clx(
              "hover:text-primary transition-all h-full flex items-center",
              active ? "text-primary font-bold" : "text-on-surface/80"
            )}
          >
            {link.label}
          </LocalizedClientLink>
        )
      })}
    </div>
  )
}

export default NavLinks
