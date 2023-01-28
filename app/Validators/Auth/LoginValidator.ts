import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.exists({ table: "users", column: "email" }),
    ]),
    password: schema.string({}, [rules.minLength(6), rules.maxLength(24)]),
  });

  public messages = {
    required: "{{ field }} não pode ser vazio",
  };
}
