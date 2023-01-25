import Teacher from "App/Models/Teacher";
import { DateTime } from "luxon";
import { BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import BaseUUID from "./BaseUUID";

export default class Classroom extends BaseUUID {
  @column()
  public number: number;

  @column()
  public capacity: number;

  @column()
  public teacherId: string;

  @belongsTo(() => Teacher, { foreignKey: "teacherId" })
  public teacher: BelongsTo<typeof Teacher>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}