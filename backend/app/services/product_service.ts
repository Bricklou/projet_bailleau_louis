import Product from '#models/database/product'
import { inject } from '@adonisjs/core'

@inject()
export class ProductService {
  searchProducts(query: string): Promise<Product[]> {
    return Product.query().whereILike('name', `%${query}%`).exec()
  }

  getAll(): Promise<Product[]> {
    return Product.all()
  }
}
