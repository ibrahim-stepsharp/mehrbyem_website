"use client"

import { Popover, PopoverPanel, Transition, Portal } from "@headlessui/react"
import { Fragment, useState, useEffect } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SideMenuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/store" },
  { name: "About", href: "/about" },
  { name: "Lookbook", href: "/lookbook" },
  { name: "FAQs", href: "/faq" },
  { name: "Contact", href: "/contact-us" },
]

const SideMenu = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none text-on-surface hover:text-primary"
                >
                  <span className="material-symbols-outlined text-3xl">menu</span>
                </Popover.Button>
              </div>

              {mounted && (
                <Portal>
                  {open && (
                    <div
                      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm pointer-events-auto"
                      onClick={close}
                      data-testid="side-menu-backdrop"
                    />
                  )}

                  <Transition
                    show={open}
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 -translate-x-full"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 -translate-x-full"
                  >
                    <PopoverPanel
                      static
                      className="flex flex-col fixed inset-y-0 left-0 w-[280px] sm:w-[400px] h-full z-[101] bg-surface text-on-surface p-8 shadow-2xl overflow-y-auto"
                    >
                      <div className="flex justify-between items-center mb-12">
                        <div className="font-noto-serif text-xl font-bold text-primary tracking-tighter">Mehr by EM</div>
                        <button data-testid="close-menu-button" onClick={close} className="text-primary">
                          <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                      </div>

                      <nav className="flex flex-col gap-y-8">
                        {SideMenuItems.map((item) => (
                          <LocalizedClientLink
                            key={item.name}
                            href={item.href}
                            className="font-headline text-3xl text-on-surface hover:text-primary transition-colors"
                            onClick={close}
                          >
                            {item.name}
                          </LocalizedClientLink>
                        ))}
                      </nav>

                      <div className="mt-auto pt-12 border-t border-primary/10">
                        <div className="flex flex-col gap-y-4 font-body text-xs uppercase tracking-widest text-on-surface/60">
                          <LocalizedClientLink className="hover:text-primary" href="/categories/occasion-wear" onClick={close}>Occasion wear</LocalizedClientLink>
                          <LocalizedClientLink className="hover:text-primary" href="/categories/core-classics" onClick={close}>Core classics</LocalizedClientLink>
                          <LocalizedClientLink className="hover:text-primary" href="/categories/kaftans" onClick={close}>Kaftans</LocalizedClientLink>
                        </div>
                      </div>
                    </PopoverPanel>
                  </Transition>
                </Portal>
              )}
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
