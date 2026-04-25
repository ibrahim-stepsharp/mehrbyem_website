# FAQ API Reference

Endpoints for managing and retrieving Frequently Asked Questions.

## Storefront Endpoints

### Get All FAQs
Returns a list of all active FAQs for display on the storefront.

- **URL:** `/store/faq`
- **Method:** `GET`
- **Response:**
  ```json
  {
    "faqs": [
      {
        "id": "faq_01J...",
        "question": "How do I care for my silk dress?",
        "answer": "Dry clean only is recommended..."
      }
    ],
    "count": 1,
    "offset": 0,
    "limit": 100
  }
  ```

---

## Admin Endpoints

### List FAQs
- **URL:** `/admin/faq`
- **Method:** `GET`
- **Response:** Paginated list of FAQs.

### Create FAQ
- **URL:** `/admin/faq`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "question": "string",
    "answer": "string"
  }
  ```

### Retrieve FAQ
- **URL:** `/admin/faq/:id`
- **Method:** `GET`

### Update FAQ
- **URL:** `/admin/faq/:id`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "question": "string",
    "answer": "string"
  }
  ```

### Delete FAQ
- **URL:** `/admin/faq/:id`
- **Method:** `DELETE`
