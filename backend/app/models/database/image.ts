import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string

  @column()
  declare productId: number
}
