"use client"

import { useToggleState } from "@medusajs/ui"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { HttpTypes } from "@medusajs/types"
import { Locale } from "@lib/data/locales"

type RegionLocaleSelectorProps = {
  regions: HttpTypes.StoreRegion[]
  locales: Locale[]
  currentLocale: string | null
}

const RegionLocaleSelector = ({
  regions,
  locales,
  currentLocale,
}: RegionLocaleSelectorProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-8 md:gap-y-0 text-on-surface/60">
      <div 
        onMouseEnter={countryToggleState.open} 
        onMouseLeave={countryToggleState.close}
        className="relative"
      >
        <CountrySelect regions={regions} toggleState={countryToggleState} />
      </div>
      {locales && locales.length > 0 && (
        <div 
          onMouseEnter={languageToggleState.open} 
          onMouseLeave={languageToggleState.close}
          className="relative"
        >
          <LanguageSelect 
            locales={locales} 
            currentLocale={currentLocale} 
            toggleState={languageToggleState} 
          />
        </div>
      )}
    </div>
  )
}

export default RegionLocaleSelector
