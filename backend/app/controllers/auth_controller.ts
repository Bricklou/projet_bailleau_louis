import { AccessToken, RefreshToken } from '#models/data-structures/token'
import { AuthService } from '#services/auth_service'
import { loginUserValidator, registerUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRepository } from '../repositories/user_repository.js'

@inject()
export default class AuthController {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository
  ) {}

  async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(loginUserValidator)

    const user = await this.authService.login(data.email, data.password)

    const refreshToken = new RefreshToken(user)
    const accessToken = new AccessToken(user)

    return response
      .cookie('token', refreshToken.toJWT())
      .header('Authorization', `Bearer ${accessToken.toJWT()}`)
      .json(user)
  }

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)

    const user = await this.userRepository.registerUser(data)

    const refreshToken = new RefreshToken(user)
    const accessToken = new AccessToken(user)

    return response
      .cookie('token', refreshToken.toJWT())
      .header('Authorization', `Bearer ${accessToken.toJWT()}`)
      .json(user)
  }
}
