# Custom Database Schema

This document outlines the SQL definitions for the custom tables and modifications in the `mehrbyem_web` project.

## 1. FAQ Module
**Table:** `faq`
**Migration:** `Migration20260409072424`

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

-- Indexes
CREATE INDEX IF NOT EXISTS "IDX_faq_deleted_at" 
ON "faq" ("deleted_at") 
WHERE deleted_at IS NULL;
```

---

## 2. Size Graph Module
**Table:** `size_graph`
**Migration:** `Migration20260413161000`

```sql
CREATE TABLE IF NOT EXISTS "size_graph" (
  "id" text NOT NULL,
  "name" text NOT NULL,
  "uuid" text NOT NULL,
  "image" text NOT NULL,
  "description" text NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz NULL,
  CONSTRAINT "size_graph_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE UNIQUE INDEX IF NOT EXISTS "IDX_size_graph_uuid_unique" 
ON "size_graph" ("uuid") 
WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS "IDX_size_graph_deleted_at" 
ON "size_graph" ("deleted_at") 
WHERE deleted_at IS NULL;
```

---

## 3. Product Table Modifications
**Table:** `product` (Core Medusa table)
**Modification Migration:** `Migration20260413161000`

```sql
-- Add custom column to link products to size graphs
ALTER TABLE IF EXISTS "product" 
ADD COLUMN IF NOT EXISTS "size_graph_uuid" text NULL;

-- Index for lookup performance
CREATE INDEX IF NOT EXISTS "IDX_product_size_graph_uuid" 
ON "product" ("size_graph_uuid") 
WHERE deleted_at IS NULL;

-- Foreign key constraint
-- Links product.size_graph_uuid to size_graph.uuid
ALTER TABLE "product"
ADD CONSTRAINT "product_size_graph_uuid_foreign"
FOREIGN KEY ("size_graph_uuid")
REFERENCES "size_graph" ("uuid")
ON UPDATE CASCADE
ON DELETE SET NULL;
```

---

## Notes on Core Medusa Tables
The tables above interact with the core Medusa v2 schema. Standard tables such as `product`, `product_variant`, `order`, etc., are managed by the `@medusajs/medusa` core and are not explicitly defined here unless modified.
