import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateTeacherValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.alpha({
        allow: ["space"],
      }),
      rules.trim(),
    ]),
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: "users", column: "email" }),
      rules.normalizeEmail({
        allLowercase: true,
      }),
      rules.trim(),
    ]),
    password: schema.string({}, [
      rules.confirmed(),
      rules.minLength(6),
      rules.maxLength(24),
      rules.trim(),
    ]),
    registration: schema.string({}, [
      rules.unique({ table: "users", column: "registration" }),
    ]),
    birthDate: schema.date({ format: "yyyy-MM-dd" }, [
      rules.after(-100, "years"),
      rules.before("today"),
    ]),
  });

  public messages: CustomMessages = {};
}
