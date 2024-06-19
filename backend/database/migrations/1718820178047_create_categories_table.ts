import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
    })

    this.schema.alterTable('products', (table) => {
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable('products', (table) => {
      table.dropForeign(['category_id'])
      table.dropColumn('category_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
