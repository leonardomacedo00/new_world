import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.post("students", "studentsController.create");
  Route.get("students/my-data", "studentsController.findMyData").middleware("auth");
  Route.put("students/:id", "studentsController.update").middleware("auth");
  Route.delete("students/:id", "studentsController.delete").middleware("auth");
});
