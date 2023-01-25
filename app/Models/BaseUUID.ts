import { v4 as uuid } from 'uuid'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export default class BaseUUID extends BaseModel {
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @beforeCreate()
  public static assignUuid(model: BaseUUID) {
    model.id = uuid()
  }
}