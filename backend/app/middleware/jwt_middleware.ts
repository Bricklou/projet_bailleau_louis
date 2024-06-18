import { AccessToken } from '#models/data-structures/token'
import { inject } from '@adonisjs/core'
import { type HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

@inject()
export default class JwtMiddleware {
  constructor() {}

  async handle({ request, response }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    let token = request.header('authorization')

    try {
      if (!token) throw new Error('Empty token')

      token = token.replace('Bearer ', '')
      request.jwt = AccessToken.validate(token)
    } catch (error) {
      request.jwt = undefined
      return response.unauthorized({ message: 'Missing or invalid token' })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
