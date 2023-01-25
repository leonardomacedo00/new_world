import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "classrooms";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid("id").notNullable().primary();
      table
        .uuid("teacher_id")
        .references("teachers.id")
        .onDelete("CASCADE")
        .notNullable();
      table.integer("number").notNullable();
      table.integer("capacity").notNullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
