import type { HttpContext } from '@adonisjs/core/http'

import { JwtService } from '#services/jwt_service'
import { registerUserValidator } from '#validators/user'

import crypto from 'node:crypto'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(private jwtService: JwtService) {}

  async update({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)

    const user = { id: crypto.randomUUID(), username: data.login }

    const jwt = this.jwtService.generateAccessToken(user)

    return response.header('Authorization', jwt).json(user)
  }
}
