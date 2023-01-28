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

    const payload = await ctx.request.validate(UpdateStudentValidator);

    const student = await User.query().where("id", id).firstOrFail();

    student
      .merge({
        name: payload.name,
        email: payload.email,
        password: payload.password,
        registration: payload.registration,
        birthDate: payload.birthDate,
        isStudent: true,
      })
      .save();

    return ctx.response.ok(student);
  }

  public async findAll(ctx: HttpContextContract) {
    const students = await User.query();

    return ctx.response.ok(students);
  }

  public async findOne(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const student = await User.query().where("id", id).firstOrFail();

    return ctx.response.ok(student);
  }

  public async delete(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const student = await User.findOrFail(id);

    student.delete();

    return ctx.response.noContent();
  }
}
