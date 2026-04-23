# Complete Database Schema (SQL) - Updated

This document provides the CURRENT SQL definitions for the custom and modified tables in the `mehrbyem_web` project.

---

## 1. Custom Tables (Project-Specific)

### FAQ Module
**Table:** `faq`
```sql
CREATE TABLE IF NOT EXISTS "faq" (
  "id" text NOT NULL,
  "question" text NOT NULL,
  "answer" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz NULL,
  CONSTRAINT "faq_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "IDX_faq_deleted_at" ON "faq" ("deleted_at") WHERE deleted_at IS NULL;
```

### Size Graph Module
**Table:** `size_graph`
```sql
CREATE TABLE IF NOT EXISTS "size_graph" (
  "id" text NOT NULL,
  "name" text NOT NULL,
  "image" text NOT NULL,
  "description" text NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz NULL,
  CONSTRAINT "size_graph_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "IDX_size_graph_deleted_at" ON "size_graph" ("deleted_at") WHERE deleted_at IS NULL;
```

---

## 2. Core Medusa v2 Tables (Modified)

### Products & Variants
**Table:** `product` (Default state)
```sql
CREATE TABLE IF NOT EXISTS "product" (
  "id" text NOT NULL,
  "title" text NOT NULL,
  "handle" text NOT NULL,
  -- ... standard fields ...
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz NULL,
  CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
```

**Table:** `product_variant` (Modified)
```sql
CREATE TABLE IF NOT EXISTS "product_variant" (
  "id" text NOT NULL,
  "title" text NOT NULL,
  "product_id" text NULL,
  -- ... standard fields ...
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz NULL,
  
  -- Custom Column added via Migration20260418154858
  "size_graph_id" text NULL,
  
  CONSTRAINT "product_variant_pkey" PRIMARY KEY ("id"),
  
  -- Custom Foreign Key
  CONSTRAINT "product_variant_size_graph_id_foreign" 
    FOREIGN KEY ("size_graph_id") 
    REFERENCES "size_graph" ("id") 
    ON UPDATE CASCADE 
    ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS "IDX_product_variant_size_graph_id" 
ON "product_variant" ("size_graph_id") 
WHERE deleted_at IS NULL;
```

---

## 3. Implementation Logic
- **Linking:** Size graphs are linked at the **Variant** level.
- **Storefront:** Fetching `/store/products/[id]/size-graph` joins the product's primary variant with the `size_graph` table to retrieve details.
- **Admin:** The `ProductSizeGraphWidget` allows selecting a size graph for a product, which internally updates its primary variant's `size_graph_id`.
