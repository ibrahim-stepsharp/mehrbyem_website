import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260426101053 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop index if exists "IDX_size_graph_uuid_unique";`);
    this.addSql(`alter table if exists "size_graph" drop column if exists "uuid";`);

    this.addSql(`alter table if exists "size_graph" add column if not exists "parameters" jsonb not null default '[]';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "size_graph" drop column if exists "parameters";`);

    this.addSql(`alter table if exists "size_graph" add column if not exists "uuid" text not null;`);
    this.addSql(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_size_graph_uuid_unique" ON "size_graph" ("uuid") WHERE deleted_at IS NULL;`);
  }

}
