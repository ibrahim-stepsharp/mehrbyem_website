import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260413161000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table if not exists "size_graph" ("id" text not null, "name" text not null, "uuid" text not null unique, "image" text not null, "description" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "size_graph_pkey" primary key ("id"));`
    )
    this.addSql(
      `create unique index if not exists "IDX_size_graph_uuid_unique" on "size_graph" ("uuid") where deleted_at is null;`
    )
    this.addSql(
      `create index if not exists "IDX_size_graph_deleted_at" on "size_graph" ("deleted_at") where deleted_at is null;`
    )

    this.addSql(
      `alter table if exists "product" add column if not exists "size_graph_uuid" text null;`
    )
    this.addSql(
      `create index if not exists "IDX_product_size_graph_uuid" on "product" ("size_graph_uuid") where deleted_at is null;`
    )
    this.addSql(`
      do $$
      begin
        if not exists (
          select 1
          from pg_constraint
          where conname = 'product_size_graph_uuid_foreign'
        ) then
          alter table "product"
          add constraint "product_size_graph_uuid_foreign"
          foreign key ("size_graph_uuid")
          references "size_graph" ("uuid")
          on update cascade
          on delete set null;
        end if;
      end
      $$;
    `)
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "product" drop constraint if exists "product_size_graph_uuid_foreign";`
    )
    this.addSql(`drop index if exists "IDX_product_size_graph_uuid";`)
    this.addSql(
      `alter table if exists "product" drop column if exists "size_graph_uuid";`
    )

    this.addSql(`drop index if exists "IDX_size_graph_deleted_at";`)
    this.addSql(`drop index if exists "IDX_size_graph_uuid_unique";`)
    this.addSql(`drop table if exists "size_graph" cascade;`)
  }
}
