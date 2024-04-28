import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name', 200).notNullable()
      table.decimal('price', 4).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
