import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.text('description').notNullable()
      table.decimal('price', 10, 2).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
