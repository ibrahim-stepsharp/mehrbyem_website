# Size Graph API Reference

Endpoints for managing the library of size charts.

## Admin Endpoints

### List Size Graphs
- **URL:** `/admin/size-graphs`
- **Method:** `GET`
- **Query Params:** `limit`, `offset`
- **Response:**
  ```json
  {
    "size_graphs": [
      {
        "id": "sg_01J...",
        "name": "Standard Dress Chart",
        "image": "https://...",
        "description": "Used for all A-line dresses"
      }
    ],
    "count": 1
  }
  ```

### Create Size Graph
- **URL:** `/admin/size-graphs`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "string",
    "image": "string (URL)",
    "description": "string (optional)"
  }
  ```

### Retrieve Size Graph
- **URL:** `/admin/size-graphs/:id`
- **Method:** `GET`

### Update Size Graph
- **URL:** `/admin/size-graphs/:id`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "name": "string",
    "image": "string",
    "description": "string"
  }
  ```

### Delete Size Graph
- **URL:** `/admin/size-graphs/:id`
- **Method:** `DELETE`
