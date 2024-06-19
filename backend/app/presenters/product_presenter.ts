import Product from '#models/database/product'
import { Paginated } from '#models/interfaces/paginated'
import { AbstractProduct, AbstractProductListItem } from '#models/interfaces/product'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export class ProductPresenter {
  toJSON(product: Product): AbstractProduct {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category.name,
      price: product.price,
      thumbnail: product.thumbnail.url,
      images: product.images.map((image) => image.url),
    }
  }

  toJSONListItem(product: Product): AbstractProductListItem {
    return {
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail.url,
      price: product.price,
    }
  }

  toPaginatedJSON(
    paginatorContract: ModelPaginatorContract<Product>
  ): Paginated<AbstractProductListItem> {
    return {
      meta: paginatorContract.getMeta(),
      data: paginatorContract.all().map((data) => this.toJSONListItem(data)),
    }
  }
}
