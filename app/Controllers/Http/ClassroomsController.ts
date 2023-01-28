import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Classroom from "App/Models/Classroom";
import AddStudentValidator from "App/Validators/ClassRooms/AddStudentValidator";
import CreateClassroomValidator from "App/Validators/ClassRooms/CreatsClassroomValidator";
import UpdateClassRoomValidator from "App/Validators/ClassRooms/UpdateClassRoomValidator";

export default class ClassroomsController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateClassroomValidator);

    const classroom = await Classroom.create(payload);

    return ctx.response.created(classroom);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const payload = await ctx.request.validate(UpdateClassRoomValidator);

    const classroom = await Classroom.query().where("id", id).firstOrFail();

    classroom.merge(payload).save();

    return ctx.response.ok(classroom);
  }

  public async findOne(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const classroom = await Classroom.query()
      .where("id", id)
      .preload("teacher")
      .preload("students")
      .firstOrFail();

    return ctx.response.ok(classroom);
  }

  public async findAll(ctx: HttpContextContract) {
    const classroom = await Classroom.query();

    return ctx.response.ok(classroom);
  }

  public async delete(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const classroom = await Classroom.findOrFail(id);

    classroom.delete();

    return ctx.response.noContent();
  }
  public async addOne(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(AddStudentValidator);

    const classroom = await Classroom.query()
      .where("id", payload.classroomId)
      .firstOrFail();

    classroom.related("students").attach([payload.studentId]);

    return ctx.response.ok(classroom);
  }
}
