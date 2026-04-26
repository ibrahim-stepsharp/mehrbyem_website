"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button, Text, Input, Label, Textarea, clx } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"
import { ProductSizeGraph } from "types/global"
import { ExclamationCircleSolid, SquaresPlus } from "@medusajs/icons"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
  sizeGraph?: ProductSizeGraph | null
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
  sizeGraph,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [measurements, setMeasurements] = useState<Record<string, any>>({})
  const [customNote, setCustomNote] = useState("")
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    if (product.variants.length === 1) {
      return product.variants[0]
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const setMeasurementValue = (name: string, value: any) => {
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const isMeasurementsValid = useMemo(() => {
    if (!sizeGraph?.parameters || sizeGraph.parameters.length === 0) {
      return true
    }

    return sizeGraph.parameters.every((p: any) => {
      if (p.optional) return true
      return measurements[p.name] !== undefined && measurements[p.name] !== ""
    })
  }, [sizeGraph, measurements])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    const metadata = {
      ...measurements,
      custom_note: customNote,
    }

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
      metadata,
    })

    setIsAdding(false)
  }

  const handleViewSizeChart = () => {
    window.dispatchEvent(new CustomEvent("view-size-chart"))
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        {sizeGraph?.parameters && sizeGraph.parameters.length > 0 && (
          <div className="flex flex-col gap-y-4 mb-4">
            <Text className="text-ui-fg-base text-small-semi uppercase">
              Custom Measurements
            </Text>
            {sizeGraph.parameters.map((param: any) => (
              <div key={param.name} className="flex flex-col gap-y-2">
                <Label className="text-ui-fg-subtle text-xsmall-regular">
                  {param.name} {param.optional ? "(Optional)" : "*"}
                </Label>
                
                {param.type === "buttons" && (
                  <div className="flex flex-wrap gap-2">
                    {param.options.map((option: any) => (
                      <button
                        key={option}
                        onClick={() => setMeasurementValue(param.name, option)}
                        className={clx(
                          "flex-1 min-w-[50px] h-10 border rounded-md text-small-regular transition-all",
                          measurements[param.name] === option
                            ? "bg-ui-bg-base border-ui-border-interactive text-ui-fg-base"
                            : "bg-ui-bg-subtle border-ui-border-base text-ui-fg-subtle hover:border-ui-border-strong"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {param.type === "slider" && (
                  <div className="flex flex-col gap-y-2">
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step || 1}
                      value={measurements[param.name] || param.min}
                      onChange={(e) => setMeasurementValue(param.name, e.target.value)}
                      className="w-full h-1.5 bg-ui-bg-subtle rounded-lg appearance-none cursor-pointer accent-ui-fg-interactive"
                    />
                    <div className="flex justify-between text-xsmall-regular text-ui-fg-muted">
                      <span>{param.min}</span>
                      <span className="text-ui-fg-base font-medium">{measurements[param.name] || param.min}</span>
                      <span>{param.max}</span>
                    </div>
                  </div>
                )}

                {param.type === "input" && (
                  <Input
                    placeholder={`Enter ${param.name.toLowerCase()}...`}
                    value={measurements[param.name] || ""}
                    onChange={(e) => setMeasurementValue(param.name, e.target.value)}
                  />
                )}
              </div>
            ))}
            <Divider />
          </div>
        )}

        <div className="flex flex-col gap-y-2 mb-4">
          <Label className="text-ui-fg-subtle text-xsmall-regular">
            Additional Note (Optional)
          </Label>
          <Textarea
            placeholder="Any specific requests or additional dimensions..."
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant ||
            !isMeasurementsValid
          }
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant && !options
            ? "Select variant"
            : !inStock || !isValidVariant
            ? "Out of stock"
            : !isMeasurementsValid
            ? "Complete measurements"
            : "Add to cart"}
        </Button>

        {sizeGraph && (
          <div className="flex flex-col gap-y-4 mt-4">
            <button
              onClick={handleViewSizeChart}
              className="flex items-center gap-x-2 text-ui-fg-subtle hover:text-ui-fg-base transition-colors text-small-regular"
            >
              <SquaresPlus />
              <span>View Size Guide</span>
            </button>
            
            <div className="flex items-start gap-x-3 p-4 bg-ui-bg-subtle rounded-lg border border-ui-border-base">
              <ExclamationCircleSolid className="text-ui-fg-subtle mt-0.5" />
              <Text className="text-ui-fg-subtle text-xsmall-regular">
                Note: This dress is made-to-order based on your body dimensions. 
                Please refer to the size chart and confirm your selected size.
              </Text>
            </div>
          </div>
        )}

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
