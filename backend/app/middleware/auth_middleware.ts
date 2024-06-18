import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { UserRepository } from '../repositories/user_repository.js'
import { isValidPayload } from '../utils/assertion/jwt_payload.js'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthMiddleware {
  constructor(private userRepository: UserRepository) {}

  async handle({ request, response }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    if (!request.jwt || !isValidPayload(request.jwt.payload)) {
      return response.unauthorized()
    }
    const payload = request.jwt.payload

    const user = await this.userRepository.findByEmail(payload.email)
    if (!user) {
      return response.unauthorized()
    }
    request.user = user

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
