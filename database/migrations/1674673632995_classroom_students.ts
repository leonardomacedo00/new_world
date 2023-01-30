import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "classroom_students";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.primary(["classroom_id", "user_id"]);
      table
        .uuid("classroom_id")
        .references("classrooms.id")
        .onDelete("CASCADE")
        .notNullable();
      table
        .uuid("user_id")
        .references("users.id")
        .onDelete("CASCADE")
        .notNullable();
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
