import Product from '#models/database/product'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class ProductRepository {
  searchProducts(query: string): Promise<ModelPaginatorContract<Product>> {
    return Product.query()
      .preload('images')
      .preload('thumbnail')
      .whereILike('name', `%${query}%`)
      .paginate(1, 10)
  }

  getAll(): Promise<ModelPaginatorContract<Product>> {
    return Product.query().preload('images').preload('thumbnail').paginate(1, 10)
  }
}
