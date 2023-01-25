import { schema, CustomMessages } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UpdateTeacherValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    email: schema.string.optional(),
    registration: schema.string.optional(),
    birthDate: schema.date.optional({ format: "yyyy-MM-dd" }),
  });

  public messages: CustomMessages = {};
}