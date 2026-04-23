"use client"

import React, { useTransition } from "react"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"
import { clx } from "@medusajs/ui"

type AddToCartButtonProps = {
  variantId: string
  className?: string
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ variantId, className }) => {
  const [isPending, startTransition] = useTransition()
  const params = useParams()
  const countryCode = params.countryCode as string

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    startTransition(async () => {
      await addToCart({
        variantId,
        quantity: 1,
        countryCode,
      })
    })
  }

  return (
    <button 
      onClick={handleAddToCart}
      disabled={isPending}
      className={clx(
        "bg-primary/5 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-container text-primary group-hover:text-on-primary p-2.5 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:scale-105 active:scale-95",
        className
      )}
      aria-label="Add to cart"
    >
      {isPending ? (
        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" />
        </svg>
      ) : (
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14"/>
        </svg>
      )}
    </button>
  )
}

export default AddToCartButton
