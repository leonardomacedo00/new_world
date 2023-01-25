import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Teacher from "App/Models/Teacher";
import CreateTeacherValidator from "App/Validators/Teacher/CreateTeacherValidator";

export default class TeachersController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateTeacherValidator);

    const teacher = await Teacher.create(payload);

    return ctx.response.created(teacher);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const payload = await ctx.request.validate(CreateTeacherValidator);

    const teacher = await Teacher.query().where("id", id).firstOrFail();

    teacher.merge(payload).save();

    return ctx.response.ok(teacher);
  }

  public async findAll(ctx: HttpContextContract) {
    const teacher = await Teacher.query();

    return ctx.response.ok(teacher);
  }

  public async findOne(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const teacher = await Teacher.query().where("id", id).firstOrFail();

    return ctx.response.ok(teacher);
  }

  public async delete(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const teacher = await Teacher.findOrFail(id);

    teacher.delete();

    return ctx.response.noContent();
  }
}
