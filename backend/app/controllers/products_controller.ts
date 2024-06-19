import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { ProductRepository } from '../repositories/product_repository.js'
import { ProductPresenter } from '../presenters/product_presenter.js'

@inject()
export default class ProductsController {
  constructor(
    private productRepository: ProductRepository,
    private productPresenter: ProductPresenter
  ) {}

  async getProducts({ request }: HttpContext) {
    const { search } = request.qs()

    if (!search || typeof search !== 'string' || search.length <= 0) {
      const products = await this.productRepository.getAll()
      return this.productPresenter.toPaginatedJSON(products)
    }

    const products = await this.productRepository.searchProducts(search)

    return this.productPresenter.toPaginatedJSON(products)
  }

  async getProduct({ params }: HttpContext) {
    const product = await this.productRepository.getById(params.id)

    return this.productPresenter.toJSON(product)
  }
}
