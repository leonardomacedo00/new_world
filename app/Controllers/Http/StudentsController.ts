import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import CreateStudentValidator from "App/Validators/Students/CreateStudentValidator";
import UpdateStudentValidator from "App/Validators/Students/UpdateStudantValidator";

export default class StudentsController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateStudentValidator);

    const student = await User.create({
      name: payload.name,
      email: payload.email,
      password: payload.password,
      registration: payload.registration,
      birthDate: payload.birthDate,
      isStudent: true,
    });

    return ctx.response.created(student);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const user = ctx.auth.user!;
    const student = await User.query().where("id", id).firstOrFail();

    if (user.id !== student.id) {
      return ctx.response.badRequest("O usuário não tem permissão");
    }

    const payload = await ctx.request.validate(UpdateStudentValidator);

    student
      .merge({
        name: payload.name,
        password: payload.password,
        registration: payload.registration,
        birthDate: payload.birthDate,
        isStudent: true,
      })
      .save();

    return ctx.response.ok(student);
  }

  public async findMyData(ctx: HttpContextContract) {
    const user = ctx.auth.user!;

    const student = await User.query()
      .where("id", user.id)
      .preload("classroom", (query) =>
        query
          .select("id", "number", "teacher_id")
          .preload("teacher", (query) => query.select("id", "name"))
      )
      .firstOrFail();

    return ctx.response.ok(student);
  }

  public async delete(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const user = ctx.auth.user!;
    const student = await User.query().where("id", id).firstOrFail();

    if (user.id !== student.id) {
      return ctx.response.badRequest("O usuário não tem permissão");
    }

    student.delete();

    return ctx.response.noContent();
  }
}
