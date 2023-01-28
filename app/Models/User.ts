import { DateTime } from "luxon";
import {
  beforeSave,
  column,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import BaseUUID from "./BaseUUID";
import Hash from "@ioc:Adonis/Core/Hash";
import Classroom from "./Classroom";

export default class User extends BaseUUID {
  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public registration: string;

  @column.date()
  public birthDate: DateTime;

  @column()
  public isStudent: boolean;

  @column()
  public isTeacher: boolean;

  @manyToMany(() => Classroom, { pivotTable: "classroom_students" })
  public classroom: ManyToMany<typeof Classroom>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
