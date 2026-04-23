import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260418154858 extends Migration {
  override async up(): Promise<void> {
    // 1. Remove the relationship from 'product'
    this.addSql(
      `alter table if exists "product" drop constraint if exists "product_size_graph_uuid_foreign";`
    )
    this.addSql(`drop index if exists "IDX_product_size_graph_uuid";`)
    this.addSql(
      `alter table if exists "product" drop column if exists "size_graph_uuid";`
    )

    // 2. Modify 'size_graph' table: remove uuid (we will use id)
    this.addSql(`drop index if exists "IDX_size_graph_uuid_unique";`)
    this.addSql(`alter table if exists "size_graph" drop column if exists "uuid";`)

    // 3. Add relationship to 'product_variant'
    this.addSql(
      `alter table if exists "product_variant" add column if not exists "size_graph_id" text null;`
    )
    this.addSql(
      `create index if not exists "IDX_product_variant_size_graph_id" on "product_variant" ("size_graph_id") where deleted_at is null;`
    )

    this.addSql(`
      do $$
      begin
        if not exists (
          select 1
          from pg_constraint
          where conname = 'product_variant_size_graph_id_foreign'
        ) then
          alter table "product_variant"
          add constraint "product_variant_size_graph_id_foreign"
          foreign key ("size_graph_id")
          references "size_graph" ("id")
          on update cascade
          on delete set null;
        end if;
      end
      $$;
    `)
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "product_variant" drop constraint if exists "product_variant_size_graph_id_foreign";`
    )
    this.addSql(`drop index if exists "IDX_product_variant_size_graph_id";`)
    this.addSql(
      `alter table if exists "product_variant" drop column if exists "size_graph_id";`
    )

    this.addSql(
      `alter table if exists "size_graph" add column if not exists "uuid" text null;`
    )
    this.addSql(
      `create unique index if not exists "IDX_size_graph_uuid_unique" on "size_graph" ("uuid") where deleted_at is null;`
    )

    this.addSql(
      `alter table if exists "product" add column if not exists "size_graph_uuid" text null;`
    )
    this.addSql(
      `create index if not exists "IDX_product_size_graph_uuid" on "product" ("size_graph_uuid") where deleted_at is null;`
    )
  }
}
