import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AttachStudentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    studentId: schema.string({}, [
      rules.exists({ table: "users", column: "id" }),
    ]),
    classroomId: schema.string({}, [
      rules.exists({ table: "classrooms", column: "id" }),
    ]),
  });

  public messages: CustomMessages = {};
}
