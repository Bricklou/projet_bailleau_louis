import { ProductService } from '#services/product_service'
import { inject } from '@adonisjs/core'

@inject()
export default class ProductsController {
  constructor(private productService: ProductService) {}

  getProducts() {
    return this.productService.getProducts()
  }
}
