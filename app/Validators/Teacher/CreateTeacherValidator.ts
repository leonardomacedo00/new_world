import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateTeacherValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [
      rules.unique({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [
      rules.minLength(6),
      rules.maxLength(24),
    ]),
    registration: schema.string(),
    birthDate: schema.date({ format: "yyyy-MM-dd" }),
  });

  public messages: CustomMessages = {};
}
