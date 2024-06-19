import Category from '#models/database/category'
import Image from '#models/database/image'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @column()
  declare categoryId: number

  @column()
  declare price: number

  @hasMany(() => Image)
  declare images: HasMany<typeof Image>

  @hasOne(() => Image)
  declare thumbnail: HasOne<typeof Image>
}
