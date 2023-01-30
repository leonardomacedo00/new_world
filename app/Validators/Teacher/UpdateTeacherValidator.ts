import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateTeacherValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional({}, [
      rules.alpha({
        allow: ["space"],
      }),
      rules.trim(),
    ]),
    password: schema.string.optional({}, [
      rules.confirmed(),
      rules.minLength(6),
      rules.maxLength(24),
      rules.trim(),
    ]),
    registration: schema.string.optional(),
    birthDate: schema.date.optional({ format: "yyyy-MM-dd" }, [
      rules.after(-100, "years"),
      rules.before("today"),
    ]),
  });

  public messages: CustomMessages = {};
}
