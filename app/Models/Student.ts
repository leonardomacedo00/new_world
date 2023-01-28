import Classroom from 'App/Models/Classroom';
import { DateTime } from "luxon";
import { column, ManyToMany, manyToMany } from "@ioc:Adonis/Lucid/Orm";
import BaseUUID from "./BaseUUID";

export default class Student extends BaseUUID {
  @column()
  public name: string;
  
  @column()
  public email: string;

  @column()
  public registration: string;

  @column.date()
  public birthDate: DateTime;

  @manyToMany(() => Classroom,{ pivotTable:"classroom_students"})
  public classroom: ManyToMany <typeof Classroom>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
