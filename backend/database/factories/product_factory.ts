import factory from '@adonisjs/lucid/factories'
import Product from '#models/product'

export const ProductFactory = factory
  .define(Product, async ({ faker }) => {
    const price = faker.number.float({ min: 1, fractionDigits: 2, max: 10000 })
    return {
      name: faker.commerce.productName(),
      price,
    }
  })
  .build()
