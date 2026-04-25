# Product API Reference (Custom Extensions)

Specialized endpoints for managing products and their relationship to size charts.

## Storefront Endpoints

### Get Product Size Graph
Fetches the size chart image linked to a specific product.

- **URL:** `/store/products/:id/size-graph`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "product_id": "prod_...",
    "variant_id": "variant_...",
    "size_graph_id": "sg_...",
    "size_graph": {
      "id": "sg_...",
      "name": "Size Chart Name",
      "image": "https://...",
      "description": "..."
    }
  }
  ```

---

## Admin Endpoints

### Get Product Size Graph Linking
Checks which size graph is currently linked to a product.

- **URL:** `/admin/custom/products/:id/size-graph`
- **Method:** `GET`

### Link Size Graph to Product
Updates a product's primary variant to use a specific size graph.

- **URL:** `/admin/custom/products/:id/size-graph`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "size_graph_id": "sg_... (or null to unlink)"
  }
  ```

### Create Product with Size Graph
A specialized creation endpoint used by custom admin widgets to create a product and its default variant, then link it to a size graph in one request.

- **URL:** `/admin/custom/products-with-size`
- **Method:** `POST`
- **Body:** Accepts standard Medusa product fields + `size_graph_id` and `inventory_quantity`.
