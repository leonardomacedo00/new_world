import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hash from "@ioc:Adonis/Core/Hash";
import LoginValidator from "App/Validators/Auth/LoginValidator";
import User from "App/Models/User";

export default class AuthController {
  public async login(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(LoginValidator);

    const user = await User.query().where("email", payload.email).firstOrFail();

    if (!(await Hash.verify(user.password, payload.password))) {
      return ctx.response.forbidden("Invalid credentials");
    }

    const token = await ctx.auth.use("api").generate(user);

    return ctx.response.created({ user: ctx.auth.user, token });
  }

  public async logout(ctx: HttpContextContract) {
    await ctx.auth.logout();
    return ctx.response.noContent();
  }
}
