import { DateTime } from "luxon";
import {
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import BaseUUID from "./BaseUUID";
import User from "./User";

export default class Classroom extends BaseUUID {
  @column()
  public number: number;

  @column()
  public capacity: number;

  @column()
  public teacherId: string;

  @belongsTo(() => User, { foreignKey: "teacherId" })
  public teacher: BelongsTo<typeof User>;

  @manyToMany(() => User, { pivotTable: "classroom_students" })
  public students: ManyToMany<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
