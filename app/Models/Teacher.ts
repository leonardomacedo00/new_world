import { DateTime } from "luxon";
import { column } from "@ioc:Adonis/Lucid/Orm";
import BaseUUID from "./BaseUUID";

export default class Teacher extends BaseUUID {
  @column()
  public name: string;
  
  @column()
  public email: string;

  @column()
  public registration: string;

  @column.date()
  public birthDate: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}