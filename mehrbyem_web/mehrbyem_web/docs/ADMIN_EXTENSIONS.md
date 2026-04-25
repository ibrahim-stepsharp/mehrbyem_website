# Admin UI Extensions

This document explains how the custom modules are integrated into the Medusa Admin dashboard.

## Custom Routes

### Size Graphs Management
- **Path:** `/admin/size-graphs`
- **Source:** `src/admin/routes/size-graphs/page.tsx`
- **Features:**
    - Table view of all existing size charts.
    - Image preview in the table.
    - Modal for creating/editing size charts (supports direct image upload to `/admin/uploads`).
    - Ability to delete charts.

---

## Custom Widgets

### Product Size Graph Widget
- **Target Zone:** `product.details.side.after` (Appears on the right sidebar of a product detail page).
- **Source:** `src/admin/widgets/product-size-graph-widget.tsx`
- **Features:**
    - Displays a dropdown of all available size graphs.
    - Shows a live preview of the selected image.
    - Saves the link by calling the `/admin/custom/products/:id/size-graph` endpoint.

### Custom Inventory Widget
- **Target Zone:** `product.details.side.before`
- **Source:** `src/admin/widgets/custom-inventory-widget.tsx`
- **Purpose:** Provides custom inventory management controls for product variants.

### FAQ Widget
- **Target Zone:** `product.details.after`
- **Source:** `src/admin/widgets/faq-widget.tsx`
- **Purpose:** Allows quick viewing/management of FAQs directly from product views (if applicable).
