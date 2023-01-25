import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Student from "App/Models/Student";
import CreateStudentValidator from "App/Validators/Students/CreateStudentValidator";
import UpdateStudentValidator from "App/Validators/Students/UpdateStudantValidator";

export default class StudentsController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateStudentValidator);

    const student = await Student.create(payload);

    return ctx.response.created(student);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const payload = await ctx.request.validate(UpdateStudentValidator);

    const student = await Student.query().where("id", id).firstOrFail();

    student.merge(payload).save();

    return ctx.response.ok(student);
  }

  public async findAll(ctx: HttpContextContract) {
    const students = await Student.query();

    return ctx.response.ok(students);
  }

  public async findOne(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const student = await Student.query().where("id", id).firstOrFail();

    return ctx.response.ok(student);
  }

  public async delete(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const student = await Student.findOrFail(id);

    student.delete();

    return ctx.response.noContent();
  }
}
