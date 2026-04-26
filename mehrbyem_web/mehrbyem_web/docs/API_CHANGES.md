# API Changes (Mehr by EM)

This document tracks changes to the Medusa API and storefront data fetching logic.

## Backend Changes

### 1. Size Graph Module
- **Model:** `SizeGraph`
    - Added `parameters: model.json().default([])`
    - This field stores the "rules" for storefront customization inputs.
    - Expected format:
      ```json
      [
        { "name": "Bust", "type": "buttons", "options": [32, 34, 36] },
        { "name": "Length", "type": "slider", "min": 12, "max": 16, "step": 0.5 }
      ]
      ```

## Storefront Changes

### 1. Cart Actions (`addToCart`)
- Updated `addToCart` to accept an optional `metadata` object.
- Metadata is passed to the Medusa `createLineItem` endpoint to persist custom measurements and notes.

### 2. Product Actions Component
- Implemented dynamic rendering based on `sizeGraph.parameters`.
- Added a global `Additional Note` input for each product.
- Implemented validation ensuring all required parameters from the Size Graph are filled before the "Add to Cart" button is enabled.
