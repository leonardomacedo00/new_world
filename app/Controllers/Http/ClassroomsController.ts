import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Classroom from "App/Models/Classroom";
import AttachStudentValidator from "App/Validators/ClassRooms/AttachStudentValidator";
import AddStudentValidator from "App/Validators/ClassRooms/AttachStudentValidator";
import CreateClassroomValidator from "App/Validators/ClassRooms/CreatsClassroomValidator";
import UpdateClassRoomValidator from "App/Validators/ClassRooms/UpdateClassRoomValidator";

export default class ClassroomsController {
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateClassroomValidator);

    const user = ctx.auth.user!;

    const classroom = await Classroom.create({
      number: payload.number,
      capacity: payload.capacity,
      teacherId: user.id,
    });

    return ctx.response.created(classroom);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const user = ctx.auth.user!;
    const classroom = await Classroom.query().where("id", id).firstOrFail();

    if (user.id !== classroom.teacherId) {
      return ctx.response.badRequest(
        "O professor não é o administrador da sala"
      );
    }

    const payload = await ctx.request.validate(UpdateClassRoomValidator);

    classroom.merge(payload).save();

    return ctx.response.ok(classroom);
  }

  public async findOne(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const user = ctx.auth.user!;

    const classroom = await Classroom.query()
      .where("id", id)
      .preload("teacher", (query) => {
        query.select("id", "name", "email", "registration");
      })
      .preload("students", (query) => {
        query.select("id", "name", "email", "registration");
      })
      .firstOrFail();

    if (user.id !== classroom.teacherId) {
      return ctx.response.badRequest(
        "O professor não é o administrador da sala"
      );
    }

    return ctx.response.ok(classroom);
  }

  public async delete(ctx: HttpContextContract) {
    const { id } = ctx.params;

    const user = ctx.auth.user!;
    const classroom = await Classroom.query().where("id", id).firstOrFail();

    if (user.id !== classroom.teacherId) {
      return ctx.response.badRequest(
        "O professor não é o administrador da sala"
      );
    }

    classroom.delete();

    return ctx.response.noContent();
  }

  public async attachStudent(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(AttachStudentValidator);

    const user = ctx.auth.user!;

    const classroom = await Classroom.query()
      .where("id", payload.classroomId)
      .firstOrFail();

    if (user.id !== classroom.teacherId) {
      return ctx.response.badRequest(
        "O professor não é o administrador da sala"
      );
    }

    const studentExistInClassroom = await Classroom.query()
      .where("id", payload.classroomId)
      .andWhereHas("students", (query) => query.where("id", payload.studentId))
      .first();

    if (studentExistInClassroom) {
      return ctx.response.badRequest("O Aluno já está matriculado nessa sala");
    }

    classroom.related("students").attach([payload.studentId]);

    return ctx.response.ok(classroom);
  }

  public async detachStudent(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(AttachStudentValidator);

    const user = ctx.auth.user!;

    const classroom = await Classroom.query()
      .where("id", payload.classroomId)
      .firstOrFail();

    if (user.id !== classroom.teacherId) {
      return ctx.response.badRequest(
        "O professor não é o administrador da sala"
      );
    }

    const studentExistInClassroom = await Classroom.query()
      .where("id", payload.classroomId)
      .andWhereHas("students", (query) => query.where("id", payload.studentId))
      .first();

    if (!studentExistInClassroom) {
      return ctx.response.badRequest("O Aluno não está matriculado nessa sala");
    }

    classroom.related("students").detach([payload.studentId]);

    return ctx.response.ok(classroom);
  }
}
