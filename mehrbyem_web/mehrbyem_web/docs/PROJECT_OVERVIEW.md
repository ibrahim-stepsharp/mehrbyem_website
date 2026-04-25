# Project Overview: Mehr by EM (Backend)

This document provides a high-level summary of the architecture and custom enhancements made to the Medusa v2 backend for the **Mehr by EM** project.

## Core Architecture
The backend is built using **Medusa v2**, leveraging its modular architecture to extend core commerce functionality. It is designed to support a bespoke fashion storefront, requiring specialized features like artisanal FAQs and product-specific size charts.

## Custom Modules

### 1. FAQ Module
*   **Purpose:** Manages frequently asked questions specifically about the artisanal process, shipping, and bespoke services.
*   **Location:** `src/modules/faq`
*   **Key Files:**
    *   `models/faq.ts`: Defines the `faq` data model (id, question, answer).
    *   `service.ts`: Handles data persistence and retrieval logic.
    *   `index.ts`: Registers the module with Medusa.

### 2. Size Graph Module
*   **Purpose:** Manages a library of size charts (name, image, description) that can be shared across multiple products.
*   **Location:** `src/modules/size-graph`
*   **Key Files:**
    *   `models/size-graph.ts`: Defines the `size_graph` data model.
    *   `service.ts`: Handles CRUD operations for size charts.
    *   `index.ts`: Registers the module.

## Database Extensions
While the core commerce logic remains in standard Medusa tables, the following extensions have been applied:
*   **Product-Variant Linking:** The `product_variant` table has been modified to include a `size_graph_id`, allowing each specific variant (or a product's primary variant) to be linked to a size chart image.

## Key Integrations

### Admin UI
*   **Size Graphs Management:** A dedicated "Size Graphs" page in the admin sidebar for managing the chart library.
*   **Product Widget:** A custom widget on the Product Details page that allows admins to link a size graph to the product's primary variant.
*   **Custom Product Creation:** A specialized endpoint (`/admin/custom/products-with-size`) that allows creating a product and linking a size graph in a single step.

### Storefront API
*   **FAQ Exposure:** Custom `/store/faq` endpoint for the help center.
*   **Product Size Graph:** Custom `/store/products/[id]/size-graph` endpoint that returns the specific image and details for a product, used in the storefront's "Size Chart" tab.
