import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasMany } from '@adonisjs/lucid/orm'
import hash from '@adonisjs/core/services/hash'
import Token from './token.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Token)
  declare tokens: HasMany<typeof Token>

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await hash.verify(this.password, password)
  }
}
