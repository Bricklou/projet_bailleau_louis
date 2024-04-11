import { ProductService } from '#services/product_service'

export default class ProductsController {
  constructor(private productService: ProductService) {}

  getProducts() {
    return this.productService.getProducts()
  }
}
