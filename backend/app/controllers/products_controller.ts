import { ProductService } from '#services/product_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class ProductsController {
  constructor(private productService: ProductService) {}

  getProducts({ request }: HttpContext) {
    const { search } = request.qs()

    if (!search || typeof search !== 'string' || search.length <= 0) {
      return this.productService.getAll()
    }

    return this.productService.searchProducts(search)
  }
}
