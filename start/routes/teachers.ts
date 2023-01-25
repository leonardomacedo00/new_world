import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.post("teachers", "teachersController.create");
  Route.get("teachers", "teachersController.findAll");
  Route.get("teachers/:id", "teachersController.findOne");
  Route.put("teachers/:id", "teachersController.update")
  Route.delete("teachers/:id", "teachersController.delete");
});