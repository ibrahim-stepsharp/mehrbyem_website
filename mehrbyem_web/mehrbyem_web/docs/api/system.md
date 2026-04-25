# System & Utility API Reference

These endpoints are used for health checks, debugging, and system verification.

## Storefront Endpoints

### Health Check
A simple endpoint to verify the custom store API is responding.
- **URL:** `/store/custom`
- **Method:** `GET`
- **Response:** `200 OK`

### Container Debug
Returns all registered keys in the Medusa dependency injection container. Useful for verifying that modules (like `faq` or `size_graph`) are correctly loaded.
- **URL:** `/store/custom/debug`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "keys": [
      "pgConnection",
      "faqModuleService",
      "sizeGraphModuleService",
      ...
    ]
  }
  ```

---

## Admin Endpoints

### Admin Health Check
Verifies the custom admin API is responding.
- **URL:** `/admin/custom`
- **Method:** `GET`
- **Response:** `200 OK`
