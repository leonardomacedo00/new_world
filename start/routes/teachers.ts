import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.post("teachers", "teachersController.create");
  Route.get("teachers/my-data", "teachersController.findMyData").middleware("teacherAuth");
  Route.put("teachers/:id", "teachersController.update").middleware("teacherAuth");
  Route.delete("teachers/:id", "teachersController.delete").middleware("teacherAuth");
});