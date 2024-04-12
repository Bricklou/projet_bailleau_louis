import type { HttpContext } from '@adonisjs/core/http'

import { JwtService } from '#services/jwt_service'
import { loginUserValidator, registerUserValidator } from '#validators/user'

import crypto from 'node:crypto'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(private jwtService: JwtService) {}

  async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(loginUserValidator)

    if (data.username !== 'toto' || data.password !== 'titi_tata') {
      return response.unauthorized('Invalid credentials')
    }

    const user = { id: crypto.randomUUID(), username: data.username }

    const jwt = this.jwtService.generateAccessToken(user)

    return response.header('Authorization', jwt).json(user)
  }

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)

    return response.noContent()
  }

  async update({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)

    const user = { id: crypto.randomUUID(), username: data.login }

    const jwt = this.jwtService.generateAccessToken(user)

    return response.header('Authorization', jwt).json(user)
  }
}
