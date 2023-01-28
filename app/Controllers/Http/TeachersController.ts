import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import CreateTeacherValidator from "App/Validators/Teacher/CreateTeacherValidator";

export default class TeachersController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateTeacherValidator);

    const teacher = await User.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      registration: payload.registration,
      birthDate: payload.birthDate,
      isTeacher: true,
    });

    return ctx.response.created(teacher);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const payload = await ctx.request.validate(CreateTeacherValidator);

    const teacher = await User.query().where("id", id).firstOrFail();

    teacher
      .merge({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        registration: payload.registration,
        birthDate: payload.birthDate,
        isTeacher: true,
      })
      .save();

    return ctx.response.ok(teacher);
  }

  public async findAll(ctx: HttpContextContract) {
    const teacher = await User.query();

    return ctx.response.ok(teacher);
  }

  public async findOne(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const teacher = await User.query().where("id", id).firstOrFail();

    return ctx.response.ok(teacher);
  }

  public async delete(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const teacher = await User.findOrFail(id);

    teacher.delete();

    return ctx.response.noContent();
  }
}
