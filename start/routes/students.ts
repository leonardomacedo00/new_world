import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.post("students", "studentsController.create");
  Route.get("students", "studentsController.findAll");
  Route.get("students/:id", "studentsController.findOne");
  Route.put("students/:id", "studentsController.update")
  Route.delete("students/:id", "studentsController.delete");
});
