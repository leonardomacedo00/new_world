import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateStudentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    email: schema.string.optional({}, [
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string.optional({}, [
      rules.minLength(6),
      rules.maxLength(24),
    ]),
    registration: schema.string.optional(),
    birthDate: schema.date.optional({ format: "yyyy-MM-dd" }),
  });

  public messages: CustomMessages = {};
}
