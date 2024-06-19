import Product from '#models/database/product'
import { inject } from '@adonisjs/core'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

@inject()
export class ProductRepository {
  searchProducts(query: string): Promise<ModelPaginatorContract<Product>> {
    return Product.query()
      .preload('images')
      .preload('thumbnail')
      .whereILike('title', `%${query}%`)
      .paginate(1, 10)
  }

  getAll(): Promise<ModelPaginatorContract<Product>> {
    return Product.query().preload('images').preload('thumbnail').paginate(1, 10)
  }

  getById(id: number): Promise<Product> {
    return Product.query()
      .preload('images')
      .preload('category')
      .preload('thumbnail')
      .where('id', id)
      .firstOrFail()
  }
}
