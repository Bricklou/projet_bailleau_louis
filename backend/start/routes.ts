/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const ProductsController = () => import('#controllers/products_controller')

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => 'It works!')

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/', [AuthController, 'login'])
    router.post('/refresh', [AuthController, 'refresh'])

    router
      .group(() => {
        router.get('/', [AuthController, 'me'])
        router.put('/', [UsersController, 'update'])
        router.delete('/', [AuthController, 'logout'])
      })
      .middleware([middleware.jwt(), middleware.auth()])
  })
  .prefix('auth')

router
  .group(() => {
    router.get('/products', [ProductsController, 'getProducts'])
  })
  .middleware(middleware.jwt())
