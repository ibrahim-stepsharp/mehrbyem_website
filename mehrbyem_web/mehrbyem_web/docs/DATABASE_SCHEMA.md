# Database Schema

This document details the custom tables and modifications made to the database schema for the Mehr by EM project.

## Custom Tables

### 1. `faq`
Used by the FAQ module to store frequently asked questions.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `text` | Primary Key (Pre-fixed with `faq_`) |
| `question` | `text` | The question text |
| `answer` | `text` | The answer text |
| `created_at` | `timestamptz` | Creation timestamp |
| `updated_at` | `timestamptz` | Last update timestamp |
| `deleted_at` | `timestamptz` | Soft delete timestamp |

### 2. `size_graph`
Stores the library of reusable size charts.

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `text` | Primary Key (Pre-fixed with `sg_`) |
| `name` | `text` | Internal name of the size chart |
| `image` | `text` | URL to the hosted image |
| `description` | `text` | Optional description or notes |
| `created_at` | `timestamptz` | Creation timestamp |
| `updated_at` | `timestamptz` | Last update timestamp |
| `deleted_at` | `timestamptz` | Soft delete timestamp |

## Modified Tables

### 1. `product_variant` (Core Medusa)
A custom foreign key has been added to link variants to size charts.

| Column | Type | Description |
| :--- | :--- | :--- |
| `size_graph_id` | `text` | Foreign key referencing `size_graph(id)` |

**Relationship:**
- A `product_variant` belongs to a `size_graph`.
- When a `size_graph` is deleted, the `size_graph_id` in `product_variant` is set to `NULL` (On Delete Set Null).

---

## Migration History
- `Migration20260409072424`: Created `faq` table.
- `Migration20260413161000`: Created `size_graph` table.
- `Migration20260418154858`: Added `size_graph_id` to `product_variant` and established the foreign key relationship.
