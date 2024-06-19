import Product from '#models/database/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Category from '#models/database/category'

interface DummyJsonProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  images: string[]
  thumbnail: string
}

interface DummyJsonResponse {
  products: DummyJsonProduct[]
}

export default class extends BaseSeeder {
  async run() {
    // This seeder will create data from dummyjson.com
    const jsonData = await fetch('https://dummyjson.com/products?limit=0').then(
      (res) => res.json() as Promise<DummyJsonResponse>
    )

    for (const data of jsonData.products) {
      const category = await Category.firstOrCreate(
        { name: data.category },
        { name: data.category }
      )

      const product = new Product()
      product.title = data.title
      product.description = data.description
      product.price = data.price
      await product.related('category').associate(category)
      await product.save()

      await product.related('images').updateOrCreateMany(
        data.images.map((image) => ({
          url: image,
        })),
        'url'
      )

      await product
        .related('thumbnail')
        .updateOrCreate({ url: data.thumbnail }, { url: data.thumbnail })
    }
  }
}
