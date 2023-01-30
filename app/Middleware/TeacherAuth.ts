import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class TeacherAuth {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    try {
      const user = await auth.use("api").authenticate();

      if (user.isTeacher !== true) {
        return response
          .status(401)
          .json({ message: "Este recurso é apenas para Professores." });
      }
    } catch (error) {
      return response
        .status(401)
        .json({ message: "É obrigatório o envio de um token válido." });
    }
    await next();
  }
}
