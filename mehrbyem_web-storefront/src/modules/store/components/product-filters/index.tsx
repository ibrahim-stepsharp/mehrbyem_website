"use client"

import { Input, Popover, Text, clx } from "@medusajs/ui"
import { MagnifyingGlassMini, ChevronDownMini, Funnel, BarsThree, ListBullet } from "@medusajs/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { HttpTypes } from "@medusajs/types"

export type SortOptions = "price_asc" | "price_desc" | "created_at"

const sortOptions = [
  { value: "created_at", label: "Latest Arrivals" },
  { value: "price_asc", label: "Price: Low -> High" },
  { value: "price_desc", label: "Price: High -> Low" },
]

type ProductFiltersProps = {
  sortBy: SortOptions
  q?: string
  categoryId?: string
  collectionId?: string
  categories?: HttpTypes.StoreProductCategory[]
  collections?: HttpTypes.StoreCollection[]
}

const ProductFilters = ({
  sortBy,
  q,
  categoryId,
  collectionId,
  categories,
  collections,
}: ProductFiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = useState(q || "")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      params.delete("page")
      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Only search if empty (to clear) or if 2 or more characters
      if (searchValue === "" || searchValue.length >= 2) {
        if (searchValue !== (q || "")) {
          setQueryParams("q", searchValue)
        }
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [searchValue, q, setQueryParams])

  return (
    <div className="flex flex-col small:flex-row small:items-center justify-between w-full gap-4 mb-8">
      <div className="flex items-center gap-x-4">
        <h1 className="text-2xl-semi" data-testid="store-page-title">All products</h1>
      </div>

      <div className="flex flex-wrap items-center gap-4 w-full small:w-auto">
        {/* Search */}
        <div className="relative w-full small:w-64">
          <MagnifyingGlassMini className="absolute left-3 top-1/2 -translate-y-1/2 text-ui-fg-muted" />
          <Input
            className="pl-10"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
          />
        </div>

        <div className="flex items-center gap-x-2 w-full small:w-auto justify-end">
          {/* Categories */}
          {categories && categories.length > 0 && (
            <Popover>
              <Popover.Trigger asChild>
                <button className="relative flex items-center justify-center w-10 h-10 bg-ui-bg-subtle border border-ui-border-base rounded-md hover:bg-ui-bg-subtle-hover transition-colors">
                  <ListBullet />
                  {categoryId && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-ui-fg-base rounded-full border border-ui-bg-subtle" />
                  )}
                </button>
              </Popover.Trigger>
              <Popover.Content className="p-2 min-w-[200px]">
                <div className="flex flex-col gap-y-1">
                  <Text className="px-2 py-1.5 txt-compact-small-plus text-ui-fg-muted uppercase">Categories</Text>
                  <button
                    onClick={() => setQueryParams("category_id", "")}
                    className={clx("text-left px-2 py-1.5 rounded-md txt-compact-small hover:bg-ui-bg-base-hover", {
                      "bg-ui-bg-base-hover font-semibold": !categoryId
                    })}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setQueryParams("category_id", c.id)}
                      className={clx("text-left px-2 py-1.5 rounded-md txt-compact-small hover:bg-ui-bg-base-hover", {
                        "bg-ui-bg-base-hover font-semibold": categoryId === c.id
                      })}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </Popover.Content>
            </Popover>
          )}

          {/* Collections */}
          {collections && collections.length > 0 && (
            <Popover>
              <Popover.Trigger asChild>
                <button className="relative flex items-center justify-center w-10 h-10 bg-ui-bg-subtle border border-ui-border-base rounded-md hover:bg-ui-bg-subtle-hover transition-colors">
                  <BarsThree />
                  {collectionId && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-ui-fg-base rounded-full border border-ui-bg-subtle" />
                  )}
                </button>
              </Popover.Trigger>
              <Popover.Content className="p-2 min-w-[200px]">
                <div className="flex flex-col gap-y-1">
                  <Text className="px-2 py-1.5 txt-compact-small-plus text-ui-fg-muted uppercase">Collections</Text>
                  <button
                    onClick={() => setQueryParams("collection_id", "")}
                    className={clx("text-left px-2 py-1.5 rounded-md txt-compact-small hover:bg-ui-bg-base-hover", {
                      "bg-ui-bg-base-hover font-semibold": !collectionId
                    })}
                  >
                    All Collections
                  </button>
                  {collections.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setQueryParams("collection_id", c.id)}
                      className={clx("text-left px-2 py-1.5 rounded-md txt-compact-small hover:bg-ui-bg-base-hover", {
                        "bg-ui-bg-base-hover font-semibold": collectionId === c.id
                      })}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </Popover.Content>
            </Popover>
          )}

          {/* Sort */}
          <Popover>
            <Popover.Trigger asChild>
              <button className="relative flex items-center justify-center w-10 h-10 bg-ui-bg-subtle border border-ui-border-base rounded-md hover:bg-ui-bg-subtle-hover transition-colors">
                <Funnel />
                {sortBy !== "created_at" && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-ui-fg-base rounded-full border border-ui-bg-subtle" />
                )}
              </button>
            </Popover.Trigger>
            <Popover.Content className="p-2 min-w-[200px]">
              <div className="flex flex-col gap-y-1">
                <Text className="px-2 py-1.5 txt-compact-small-plus text-ui-fg-muted uppercase">Sort by</Text>
                {sortOptions.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setQueryParams("sortBy", s.value)}
                    className={clx("text-left px-2 py-1.5 rounded-md txt-compact-small hover:bg-ui-bg-base-hover", {
                      "bg-ui-bg-base-hover font-semibold": sortBy === s.value
                    })}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </Popover.Content>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default ProductFilters
