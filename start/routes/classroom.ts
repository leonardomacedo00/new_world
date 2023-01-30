import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.post("classrooms", "ClassroomsController.create").middleware("teacherAuth");
  Route.put("classrooms/:id", "ClassroomsController.update").middleware("teacherAuth");
  Route.delete("classrooms/:id", "ClassroomsController.delete").middleware("teacherAuth");
  Route.get("classrooms/:id", "ClassroomsController.findOne").middleware("teacherAuth");
  Route.post("classrooms/student/attach", "ClassroomsController.attachStudent").middleware("teacherAuth");
  Route.delete("classrooms/student/detach", "ClassroomsController.detachStudent").middleware("teacherAuth");
});
